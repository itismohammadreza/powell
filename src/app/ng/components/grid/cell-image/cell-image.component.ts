import {Component, ViewContainerRef} from '@angular/core';
import {UtilsService} from '@ng/services';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'ng-cell-image',
  templateUrl: './cell-image.component.html',
  styleUrls: ['./cell-image.component.scss'],
})
export class CellImageComponent implements ICellRendererAngularComp {
  params: any;
  field: string;
  accept: string;
  readonly: boolean;
  multiple: boolean;
  fileLimit: number;
  resultType: 'base64' | 'file';
  label: string;
  filesToShow: any = [];
  filesToEmit: any = [];

  constructor(private utilsService: UtilsService) {
  }

  agInit(params: any): void {
    this.params = params;
    this.field = params.field;
    this.readonly = params.readonly || false;
    this.accept = params.accept || 'image/*';
    this.multiple = params.multiple || false;
    this.fileLimit = params.fileLimit || 2000;
    this.resultType = params.resultType || 'base64';
    this.label = params.label || 'انتخاب';
    this.filesToShow = this.params.node.data[this.field] || [];
    this.init(this.filesToShow);
  }

  refresh(params: any): boolean {
    return true;
  }

  viewFile(item: any) {
    window.open(item, '_blank');
  }

  async onSingleSelect(event) {
    const file: File = event.target.files[0];
    this.filesToShow = [];
    this.filesToEmit = [];
    this.filesToShow.push(await this.fileToBase64(file));
    if (this.resultType == 'base64') {
      this.filesToEmit = await this.fileToBase64(file);
    } else if (this.resultType == 'file') {
      this.filesToEmit = file;
    }
    const params = {
      field: this.field,
      event,
      file: this.filesToEmit,
      rowData: this.params.node.data,
    };
    this.params.onSelect(params);
  }

  onSingleRemove(event: Event) {
    event.stopPropagation();
    this.utilsService
      .showConfirm({header: 'حذف فایل', message: 'تصویر حذف شود؟'})
      .then((res) => {
        if (res) {
          {
            this.filesToShow = [];
            const params = {
              field: this.field,
              removedFile: this.filesToShow[0],
              rowData: this.params.node.data,
            };
            this.params.onRemove(params);
          }
        }
      });
  }

  async onMultipleSelect(event) {
    if (this.filesToEmit.length < this.fileLimit) {
      const file: File = event.target.files[0];
      this.filesToShow.push(await this.fileToBase64(file));
      if (this.resultType == 'base64') {
        this.filesToEmit.push(await this.fileToBase64(file));
      } else if (this.resultType == 'file') {
        this.filesToEmit.push(file);
      }
    }
    const params = {
      field: this.field,
      event,
      file: this.filesToEmit,
      rowData: this.params.node.data,
    };
    this.params.onSelect(params);
  }

  onMultipleRemove(event: Event, file: any, index: number) {
    event.stopPropagation();
    this.utilsService
      .showConfirm({header: 'حذف فایل', message: 'تصویر حذف شود؟'})
      .then((res) => {
        if (res) {
          {
            this.filesToShow.splice(index, 1);
            this.filesToEmit.splice(index, 1);
            const params = {
              field: this.field,
              remainingFiles: this.filesToEmit,
              removedFile: file,
              rowData: this.params.node.data,
            };
            this.params.onRemove(params);
          }
        }
      });
  }

  getId() {
    return "id" + Math.random().toString(16).slice(2)
  }

  async init(value: any) {
    const wantBase64 = this.resultType == 'base64';
    const wantFile = this.resultType == 'file';
    this.filesToShow = [];
    this.filesToEmit = [];
    // value is Array
    if (Array.isArray(value) && this.multiple) {
      const resultToShow = [];
      const resultToEmit = [];
      for (const item of value) {
        //Array of files
        if (item instanceof File) {
          resultToShow.push(await this.fileToBase64(item));
          if (wantBase64) {
            resultToEmit.push(await this.fileToBase64(item));
          } else if (wantFile) {
            resultToEmit.push(item);
          }
        }
        //Array of string
        if (typeof item == 'string') {
          //string is base64
          if (item.startsWith('src=')) {
            resultToShow.push(item);
            if (wantBase64) {
              resultToEmit.push(item);
            } else if (wantFile) {
              resultToEmit.push(this.base64toFile(item, item.split('/').pop()));
            }
            //string is url
          } else {
            resultToShow.push(await this.urlToBase64(item));
            if (wantBase64) {
              resultToEmit.push(await this.urlToBase64(item));
            } else if (wantFile) {
              resultToEmit.push(
                this.base64toFile(
                  await this.urlToBase64(item),
                  item.split('/').pop()
                )
              );
            }
          }
        }
      }
      this.filesToShow = resultToShow;
      // value is a single File
    } else if (value instanceof File) {
      this.filesToShow.push(await this.fileToBase64(value));
      if (wantBase64) {
        this.filesToEmit.push(await this.fileToBase64(value));
      } else if (wantFile) {
        this.filesToEmit.push(value);
      }
    } else if (typeof value == 'string') {
      //value is a single base64
      if (value.startsWith('src=')) {
        this.filesToShow.push(value);
        if (wantBase64) {
          this.filesToEmit.push(value);
        } else if (wantFile) {
          this.filesToEmit.push(
            this.base64toFile(value, value.split('/').pop())
          );
        }
        //value is a single url
      } else {
        this.filesToShow.push(await this.urlToBase64(value));
        if (wantBase64) {
          this.filesToEmit.push(await this.urlToBase64(value));
        } else if (wantFile) {
          this.filesToEmit.push(
            this.base64toFile(
              await this.urlToBase64(value),
              value.split('/').pop()
            )
          );
        }
      }
      //value is FileList
    } else if (value instanceof FileList) {
      const result = [];
      for (let i = 0; i < value.length; i++) {
        const file: File = value.item(i);
        this.filesToShow.push(await this.fileToBase64(file));
        if (wantBase64) {
          result.push(await this.fileToBase64(file));
        } else if (wantFile) {
          result.push(file);
        }
      }
      this.filesToEmit = this.multiple ? result : result[0];
    }
  }

  fileToBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  urlToBase64(url: string): Promise<string | ArrayBuffer> {
    return fetch(url, {
      headers: new Headers({
        Origin: '*',
      }),
    })
      .then((response) => response.blob())
      .then((blob: File) => this.fileToBase64(blob));
  }

  base64toFile(dataurl: any, filename: string): File {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }
}
