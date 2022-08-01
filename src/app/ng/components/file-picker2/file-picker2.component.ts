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
  ViewContainerRef,
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
import {NgColor} from '@ng/models/color';
import {NgError, NgLabelPosition} from '@ng/models/forms';
import {UtilsService} from '@ng/services';

@Component({
  selector: 'ng-file-picker2',
  templateUrl: './file-picker2.component.html',
  styleUrls: ['./file-picker2.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilePicker2Component),
      multi: true,
    },
  ],
})
export class FilePicker2Component
  implements OnInit, OnChanges, ControlValueAccessor {
  @Input() value: any = [];
  @Input() errors: NgError;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = true;
  @Input() showImagePreview: boolean = true;
  @Input() labelPos: NgLabelPosition = 'fix-top';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() multiple: boolean = true;
  @Input() accept: string;
  @Input() color: NgColor = 'primary';
  @Input() fileLimit: number = 20000;
  @Input() resultType: 'base64' | 'file' = 'base64';
  @Input() chooseLabel: string = 'انتخاب';
  @Output() onSelect = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  filesToShow: any = [];
  filesToEmit: any = [];
  _chooseLabel: string;

  constructor(
    private cd: ChangeDetectorRef,
    private injector: Injector,
    private utilsService: UtilsService,
  ) {
  }

  onModelChange: any = (_: any) => {
  };

  onModelTouched: any = () => {
  };

  ngOnInit() {
    let parentForm: UntypedFormGroup;
    let rootForm: FormGroupDirective;
    //store user defined label for single selection mode
    this._chooseLabel = this.chooseLabel;
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

  ngOnChanges() {
    if (this.isImage(this.value)) {
      this.init(this.value);
    }
  }

  async onSingleSelect(event) {
    const file: File = event.target.files[0];
    this.filesToShow.push(await this.fileToBase64(file));
    this.chooseLabel = file.name;
    if (this.resultType == 'base64') {
      this.filesToEmit = await this.fileToBase64(file);
    } else if (this.resultType == 'file') {
      this.filesToEmit = file;
    }
    this.onSelect.emit(this.filesToEmit);
    this.onModelChange(this.filesToEmit);
  }

  onSingleDelete() {
    this.filesToEmit = [];
    this.filesToShow = [];
    this.chooseLabel = this._chooseLabel;
    this.onModelChange(null);
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
      this.onSelect.emit(this.filesToEmit);
      this.onModelChange(this.filesToEmit);
    }
  }

  onMultipleDelete(event, index: number) {
    this.utilsService
      .showConfirm({header: 'حذف فایل', message: 'تصویر حذف شود؟'})
      .then((res) => {
        if (res) {
          {
            event.stopPropagation();
            this.onRemove.emit(this.filesToEmit[index]);
            this.filesToShow.splice(index, 1);
            this.filesToEmit.splice(index, 1);
            this.onModelChange(this.filesToEmit);
          }
        }
      });
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
      this.onModelChange(this.filesToEmit);
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
      this.onModelChange(
        this.multiple ? this.filesToEmit : this.filesToEmit[0]
      );
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
      this.onModelChange(this.filesToEmit);
    }
    this.cd.markForCheck();
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
    return new File([u8arr], filename, {type: mime});
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
}
