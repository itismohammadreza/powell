import {HttpHeaders} from '@angular/common/http';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms';
import {Subject, takeUntil} from "rxjs";
import {NgFilePickerMode, NgFileResultType, NgFixLabelPosition, NgValidation} from '@powell/models';
import {TemplateDirective} from "@powell/directives/template";
import {PrimeFileUpload} from "@powell/primeng";
import {ConfigHandler, UtilsService} from "@powell/api";

@Component({
  selector: 'ng-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilePickerComponent),
      multi: true
    }
  ]
})
export class FilePickerComponent implements OnInit, OnChanges, AfterContentInit, ControlValueAccessor, OnDestroy {
  @Input() value: any = [];
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPos: NgFixLabelPosition;
  @Input() validation: NgValidation;
  @Input() resultType: NgFileResultType = 'file';
  @Input() disableConfigChangeEffect: boolean;
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
  @ViewChild(PrimeFileUpload, {static: true}) fileUploadComponent: PrimeFileUpload;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  destroy$ = new Subject();
  selectedFiles: any[] = [];
  filesToEmit: (string | ArrayBuffer | File)[] | any = [];
  toolbarTemplate: TemplateRef<any>;
  fileTemplate: TemplateRef<any>;
  contentTemplate: TemplateRef<any>;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, private injector: Injector, private utilsService: UtilsService) {
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
      currentControl = this.ngControl.control;
      if (this.controlContainer) {
        parentForm = this.controlContainer.control;
        rootForm = this.controlContainer.formDirective as FormGroupDirective;
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name.toString());
        }
        rootForm.ngSubmit.pipe(takeUntil(this.destroy$)).subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.utilsService.isImage(this.value)) {
      this.init(this.value);
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
        this.filesToEmit.push(await this.utilsService.fileToBase64(file));
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
            result.push(await this.utilsService.fileToBase64(item));
          } else if (wantFile) {
            result.push(item);
          } else {
            result.push(item);
          }
        }
        if (typeof item == 'string') {
          //Array of base64
          if (item.startsWith('src=')) {
            dt.items.add(this.utilsService.base64toFile(item, item.split('/').pop()));
            if (wantBase64) {
              result.push(item);
            } else if (wantFile) {
              result.push(this.utilsService.base64toFile(item, item.split('/').pop()));
            } else {
              result.push(item);
            }
          }
          //Array of url
          else {
            const base64 = await this.utilsService.urlToBase64(item);
            dt.items.add(this.utilsService.base64toFile(base64, item.split('/').pop()));
            if (wantBase64) {
              result.push(base64);
            } else if (wantFile) {
              result.push(this.utilsService.base64toFile(base64, item.split('/').pop()));
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
        this.filesToEmit.push(await this.utilsService.fileToBase64(value));
        this.onModelChange(await this.utilsService.fileToBase64(value));
      } else if (wantFile) {
        this.filesToEmit.push(value);
        this.onModelChange(value);
      }
    } else if (typeof value == 'string') {
      //value is a single  base64
      if (value.startsWith('src=')) {
        dt.items.add(this.utilsService.base64toFile(value, value.split('/').pop()));
        if (wantBase64) {
          this.onModelChange(value);
          this.filesToEmit.push(value);
        } else if (wantFile) {
          this.filesToEmit.push(
            this.utilsService.base64toFile(value, value.split('/').pop())
          );
          this.onModelChange(this.utilsService.base64toFile(value, value.split('/').pop()));
        }
      }
      //value is a single  url
      else {
        const base64 = await this.utilsService.urlToBase64(value);
        dt.items.add(this.utilsService.base64toFile(base64, value.split('/').pop()));
        this.value = dt.files;
        if (wantBase64) {
          this.onModelChange(base64);
          this.filesToEmit.push(base64);
        } else if (wantFile) {
          this.onModelChange(this.utilsService.base64toFile(base64, value.split('/').pop()));
          this.filesToEmit.push(
            this.utilsService.base64toFile(base64, value.split('/').pop())
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
          this.filesToEmit.push(await this.utilsService.fileToBase64(file));
          result.push(await this.utilsService.fileToBase64(file));
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

  writeValue(value: any) {
    if (value && this.utilsService.isImage(value)) {
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

  clear() {
    this.fileUploadComponent.clear();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
