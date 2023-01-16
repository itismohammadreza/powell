import {HttpHeaders} from '@angular/common/http';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  FormGroup,
} from '@angular/forms';
import {NgFilePickerMode, NgFixLabelPosition, NgValidation} from '@ng/models/forms';
import {FileUpload} from 'primeng/fileupload';
import {TemplateDirective} from "@ng/directives/template.directive";
import {GlobalConfig} from "@core/global.config";
import {UtilsService} from "@ng/services";

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
  implements OnInit, OnChanges, AfterViewInit, AfterContentInit, ControlValueAccessor {
  @Input() value: any = [];
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = GlobalConfig.rtl;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgFixLabelPosition = GlobalConfig.defaultFixLabelPos;
  @Input() validation: NgValidation;
  @Input() resultType: 'base64' | 'file' | 'none' = 'file';
  // native properties
  @Input() name: string;
  @Input() url: string;
  @Input() method: string = 'post';
  @Input() multiple: boolean = true;
  @Input() accept: string = 'image/*';
  @Input() disabled: boolean;
  @Input() auto: boolean;
  @Input() maxFileSize: number;
  @Input() fileLimit: number;
  @Input() invalidFileSizeMessageSummary: string = '{0} - سایز فایل نامعتبر است.';
  @Input() invalidFileSizeMessageDetail: string = 'حداکثر سایز فایل {0} است.';
  @Input() invalidFileTypeMessageSummary: string = '{0} - نوع فایل نامعتبر است.';
  @Input() invalidFileLimitMessageDetail: string = 'حداکثر مجاز به انتخاب {0} فایل هستید.';
  @Input() invalidFileLimitMessageSummary: string = 'مجاز به انتخاب فایل بیشتری نیستید.';
  @Input() invalidFileTypeMessageDetail: string = 'فرمت مجاز : {0}';
  @Input() style: string;
  @Input() styleClass: string;
  @Input() previewWidth: number = 50;
  @Input() chooseLabel: string = 'انتخاب';
  @Input() uploadLabel: string = 'آپلود';
  @Input() cancelLabel: string = 'انصراف';
  @Input() chooseIcon: string = 'pi pi-plus';
  @Input() uploadIcon: string = 'pi pi-upload';
  @Input() cancelIcon: string = 'pi pi-times';
  @Input() withCredentials: boolean;
  @Input() mode: NgFilePickerMode = 'advanced';
  @Input() customUpload: boolean = true;
  @Input() showUploadButton: boolean = true;
  @Input() showCancelButton: boolean = true;
  @Input() headers: HttpHeaders;
  @Input() uploadStyleClass: string;
  @Input() cancelStyleClass: string;
  @Input() removeStyleClass: string;
  @Input() chooseStyleClass: string;
  @Output() onProgress = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onError = new EventEmitter();
  @Output() onBeforeUpload = new EventEmitter();
  @Output() onUpload = new EventEmitter();
  @Output() onSend = new EventEmitter();
  @Output() uploadHandler = new EventEmitter();
  @ViewChild(FileUpload) fileUploadComponent: FileUpload;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  selectedFiles: any[] = [];
  filesToEmit: (string | ArrayBuffer | File)[] | any = [];
  toolbarTemplate: TemplateRef<any>;
  fileTemplate: TemplateRef<any>;
  contentTemplate: TemplateRef<any>;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private utilsService: UtilsService) {
  }

  ngOnInit() {
    this.inputId = this.getId();
    let parentForm: FormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      {optional: true, host: true, skipSelf: true}
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      // by default we suppose the ngControl is and instance of NgModel.
      currentControl = this.ngControl.control;
      if (this.controlContainer) {
        parentForm = this.controlContainer.control;
        rootForm = this.controlContainer.formDirective as FormGroupDirective;
        // only when we have a formGroup (here is : controlContainer), we also may have formControlName instance.
        // so we check this condition when we have a controlContainer and overwrite currentControl value.
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name.toString());
        }
        rootForm.ngSubmit.subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
  }

  ngOnChanges() {
    if (this.isImage(this.value)) {
      this.init(this.value);
    }
  }

  ngAfterViewInit() {
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      this.cd.detectChanges();
    }
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'toolbar':
          this.toolbarTemplate = item.templateRef;
          break;

        case 'file':
          this.fileTemplate = item.templateRef;
          break;

        case 'content':
          this.contentTemplate = item.templateRef;
          break;
      }
    })
  }

  _onRemove(event) {
    this.filesToEmit.splice(this.selectedFiles.indexOf(event.file), 1);
    this.onModelChange(this.filesToEmit);
    this.onRemove.emit(event);
  }

  async _onSelect(event) {
    this.selectedFiles = event.currentFiles;
    for (let file of event.currentFiles) {
      if (this.resultType == 'base64') {
        this.filesToEmit.push(await this.fileToBase64(file));
      } else if (this.resultType == 'file') {
        this.filesToEmit.push(file);
      } else {
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
          } else {
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
            } else {
              result.push(item);
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
            } else {
              result.push(item);
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

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  getId() {
    return "id" + Math.random().toString(16).slice(2)
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && (control.touched || control.dirty) && control.invalid);
    }
    return false
  }

  hasError(type: string): boolean {
    return this.isInvalid() && this.ngControl.control.hasError(type);
  }

  showHint() {
    let hasError = false;
    for (const errorKey in this.validation) {
      if (this.hasError(errorKey)) {
        hasError = true;
      }
    }
    return !hasError;
  }

  isRequired(): boolean {
    if (this.ngControl) {
      const control = this.ngControl.control;
      if (control.validator) {
        const validator = control.validator({} as AbstractControl);
        if (validator && validator.required) {
          return true;
        }
      }
    }
    return false;
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

  clear() {
    this.fileUploadComponent.clear();
  }
}
