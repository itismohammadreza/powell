import { HttpHeaders } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  InjectFlags,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  UntypedFormControl,
  FormControlName,
  UntypedFormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { NgError, NgInputFileMode, NgLabelPosition } from '@ng/models/forms';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'ng-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilePickerComponent),
      multi: true,
    },
  ],
})
export class FilePickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @ViewChild(FileUpload) fileUploadComponent: FileUpload;
  @Input() value: any = [];
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgLabelPosition = 'fix-top';
  @Input() errors: NgError;
  @Input() disabled: boolean = false;
  @Input() name: string;
  @Input() url: string;
  @Input() multiple: boolean = true;
  @Input() withCredentials: boolean = false;
  @Input() customUpload: boolean = true;
  @Input() auto: boolean = false;
  @Input() accept: string;
  @Input() method: string = 'post';
  @Input() maxFileSize: number;
  @Input() previewWidth: number = 50;
  @Input() fileLimit: number;
  @Input() resultType: 'base64' | 'file' = 'file';
  @Input() mode: NgInputFileMode = 'advanced';
  @Input() chooseLabel: string = 'انتخاب';
  @Input() uploadLabel: string = 'آپلود';
  @Input() cancelLabel: string = 'انصراف';
  @Input() headers: HttpHeaders;
  @Input() showUploadButton: boolean = true;
  @Input() showCancelButton: boolean = true;
  @Input() invalidFileSizeMessageSummary: string = '{0} - سایز فایل نامعتبر است.';
  @Input() invalidFileSizeMessageDetail: string = 'حداکثر سایز فایل {0} است.';
  @Input() invalidFileTypeMessageSummary: string = '{0} - نوع فایل نامعتبر است.';
  @Input() invalidFileLimitMessageDetail: string = 'حداکثر مجاز به انتخاب {0} فایل هستید.';
  @Input() invalidFileLimitMessageSummary: string ='مجاز به انتخاب فایل بیشتری نیستید.';
  @Input() invalidFileTypeMessageDetail: string = 'فرمت مجاز : {0}';
  @Output() onProgress = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onError = new EventEmitter();
  @Output() onBeforeUpload = new EventEmitter();
  @Output() onUpload = new EventEmitter();
  @Output() onSend = new EventEmitter();
  @Output() uploadHandler = new EventEmitter();

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  selectedFiles: any[] = [];
  filesToEmit: (string | ArrayBuffer | File)[] | any;

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {}

  onModelChange: any = (_: any) => {};

  onModelTouched: any = () => {};

  ngOnChanges() {
    if (this.isImage(this.value)) {
      this.init(this.value);
    }
  }

  ngOnInit() {
    let parentForm: UntypedFormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.inputId = this.getId();
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      InjectFlags.Optional || InjectFlags.Host || InjectFlags.SkipSelf
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    if (this.controlContainer && this.ngControl) {
      parentForm = this.controlContainer.control;
      rootForm = this.controlContainer.formDirective as FormGroupDirective;
      if (this.ngControl instanceof NgModel) {
        currentControl = this.ngControl.control;
      } else if (this.ngControl instanceof FormControlName) {
        currentControl = parentForm.get(this.ngControl.name.toString());
      }
      rootForm.ngSubmit.subscribe(() => {
        if (!this.disabled) {
          currentControl.markAsTouched();
        }
      });
      if (this.showRequiredStar) {
        if (this.isRequired(currentControl)) {
          if (this.label) {
            this.label += ' *';
          }
        }
      }
    }
  }

  _onRemove(event) {
    this.filesToEmit.splice(this.selectedFiles.indexOf(event.file), 1);
    this.onModelChange(this.filesToEmit);
    this.onRemove.emit(event);
  }

  async _onSelect(event) {
    this.selectedFiles = event.currentFiles;
    this.filesToEmit = [];
    for (let file of event.currentFiles) {
      if (this.resultType == 'base64') {
        this.filesToEmit.push(await this.fileToBase64(file));
      } else if (this.resultType == 'file') {
        this.filesToEmit.push(file);
      }
    }
    if (this.multiple) {
      this.onSelect.emit(this.filesToEmit);
      this.onModelChange(this.filesToEmit);
    } else if (!this.multiple) {
      this.onSelect.emit(this.filesToEmit[0]);
      this.onModelChange(this.filesToEmit[0]);
    }
  }

  async init(value: any) {
    const dt = new DataTransfer();
    const wantBase64 = this.resultType == 'base64';
    const wantFile = this.resultType == 'file';
    // value is Array
    if (Array.isArray(value)) {
      const result = [];
      for (const item of value) {
        //Array of files
        if (item instanceof File) {
          dt.items.add(item);
          if (wantBase64) {
            result.push(await this.fileToBase64(item));
          } else if (wantFile) {
            result.push(item);
          }
        }
        if (typeof item == 'string') {
          //Array of base64
          if (item.startsWith('src=')) {
            dt.items.add(this.base64toFile(item, item.split('/').pop()));
            if (wantBase64) {
              result.push(item);
            } else if (wantFile) {
              result.push(this.base64toFile(item, item.split('/').pop()));
            }
          }
          //Array of url
          else {
            const base64 = await this.urlToBase64(item);
            dt.items.add(this.base64toFile(base64, item.split('/').pop()));
            if (wantBase64) {
              result.push(base64);
            } else if (wantFile) {
              result.push(this.base64toFile(base64, item.split('/').pop()));
            }
          }
        }
      }
      if (dt.files.length) {
        this.value = dt.files;
      }
      this.filesToEmit = [...result];
      // value is a single File
    } else if (value instanceof File) {
      dt.items.add(value);
      this.value = dt.files;
      if (wantBase64) {
        this.filesToEmit.push(await this.fileToBase64(value));
        this.onModelChange(await this.fileToBase64(value));
      } else if (wantFile) {
        this.filesToEmit.push(value);
        this.onModelChange(value);
      }
    } else if (typeof value == 'string') {
      //value is a single  base64
      if (value.startsWith('src=')) {
        dt.items.add(this.base64toFile(value, value.split('/').pop()));
        if (wantBase64) {
          this.onModelChange(value);
          this.filesToEmit.push(value);
        } else if (wantFile) {
          this.filesToEmit.push(
            this.base64toFile(value, value.split('/').pop())
          );
          this.onModelChange(this.base64toFile(value, value.split('/').pop()));
        }
      }
      //value is a single  url
      else {
        const base64 = await this.urlToBase64(value);
        dt.items.add(this.base64toFile(base64, value.split('/').pop()));
        this.value = dt.files;
        if (wantBase64) {
          this.onModelChange(base64);
          this.filesToEmit.push(base64);
        } else if (wantFile) {
          this.onModelChange(this.base64toFile(base64, value.split('/').pop()));
          this.filesToEmit.push(
            this.base64toFile(base64, value.split('/').pop())
          );
        }
      }
      //value is FileList
    } else if (value instanceof FileList) {
      this.value = value;
      const result = [];
      for (let i = 0; i < value.length; i++) {
        const file: File = value.item(i);
        if (wantBase64) {
          this.filesToEmit.push(await this.fileToBase64(file));
          result.push(await this.fileToBase64(file));
        } else if (wantFile) {
          this.filesToEmit.push(file);
          result.push(file);
        }
      }
    }
    this.cd.markForCheck();
  }

  _onClear() {
    this.filesToEmit = [];
    this.onModelChange(null);
    this.onClear.emit();
  }

  _onBeforeUpload(event) {
    this.onBeforeUpload.emit(event);
  }

  _onSend(event) {
    this.onSend.emit(event);
  }

  _onUpload(event) {
    this.onUpload.emit(event);
  }

  _onProgress(event) {
    this.onProgress.emit(event);
  }

  _onError(event) {
    this.onError.emit(event);
  }

  _uploadHandler($event) {
    this.uploadHandler.emit($event);
  }

  getId() {
    return "id" + Math.random().toString(16).slice(2)
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (control.touched || control.dirty) && control.invalid;
    }
  }

  showError(errorType: string): boolean {
    return (
      this.isInvalid() && this.ngControl.control.hasError(errorType.toLowerCase())
    );
  }


  isRequired(control: AbstractControl): boolean {
    let isRequired = false;
    const formControl = new UntypedFormControl();
    for (const key in control) {
      if (Object.prototype.hasOwnProperty.call(control, key)) {
        formControl[key] = control[key];
      }
    }
    formControl.setValue(null);
    if (formControl.errors?.required) {
      isRequired = true;
    }
    return isRequired;
  }

  writeValue(value: any) {
    if (value && this.isImage(value)) {
      this.init(value);
    }
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
    this.cd.markForCheck();
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
    return new File([u8arr], filename, { type: mime });
  }

  isImageUrl(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  isImageFile(file: File) {
    return file && file['type'].split('/')[0] === 'image';
  }

  isImage(value: any) {
    let result = false;
    if (Array.isArray(value)) {
      if (
        value.every((item) => item instanceof File && this.isImageFile(item))
      ) {
        result = true;
      }
      if (
        value.every(
          (item) =>
            typeof item == 'string' &&
            (this.isImageUrl(item) || item.startsWith('src='))
        )
      ) {
        result = true;
      }
    } else if (value instanceof File && this.isImageFile(value)) {
      result = true;
    } else if (
      typeof value == 'string' &&
      (this.isImageUrl(value) || value.startsWith('src='))
    ) {
      result = true;
    } else if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        if (this.isImageFile(value.item(i))) {
          result = true;
          continue;
        } else {
          result = false;
          break;
        }
      }
    }
    return result;
  }

  clear() {
    this.fileUploadComponent.clear();
  }
}
