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
  OnChanges,
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
import {takeUntil} from "rxjs";
import {
  NgCssObject,
  NgFilePickerMethod,
  NgFilePickerMode,
  NgFileResultType,
  NgFixLabelPosition,
  NgValidation
} from '@powell/models';
import {TemplateDirective} from "@powell/directives/template";
import {PrimeFileUpload} from "@powell/primeng";
import {UtilsService} from "@powell/api";
import {DestroyService} from "@core/utils";
import {
  PrimeFileBeforeUploadEvent,
  PrimeFileProgressEvent,
  PrimeFileRemoveEvent,
  PrimeFileSelectEvent,
  PrimeFileSendEvent,
  PrimeFileUploadErrorEvent,
  PrimeFileUploadEvent,
  PrimeFileUploadHandlerEvent,
  PrimeUniqueComponentId
} from "@powell/primeng/api";

@Component({
  selector: 'ng-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilePickerComponent),
      multi: true
    },
    DestroyService
  ]
})
export class FilePickerComponent implements OnInit, OnChanges, AfterContentInit, ControlValueAccessor {
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
  @Input() id: string = PrimeUniqueComponentId();
  // native properties
  @Input() name: string;
  @Input() url: string;
  @Input() method: NgFilePickerMethod = 'post';
  @Input() multiple: boolean = false;
  @Input() accept: string;
  @Input() disabled: boolean;
  @Input() auto: boolean = false;
  @Input() withCredentials: boolean = false;
  @Input() maxFileSize: number;
  @Input() invalidFileSizeMessageSummary: string = '{0} - سایز فایل نامعتبر است.';
  @Input() invalidFileSizeMessageDetail: string = 'حداکثر سایز فایل {0} است.';
  @Input() invalidFileTypeMessageSummary: string = '{0} - نوع فایل نامعتبر است.';
  @Input() invalidFileTypeMessageDetail: string = 'فرمت مجاز : {0}';
  @Input() invalidFileLimitMessageDetail: string = 'حداکثر مجاز به انتخاب {0} فایل هستید.';
  @Input() invalidFileLimitMessageSummary: string = 'مجاز به انتخاب فایل بیشتری نیستید.';
  @Input() style: NgCssObject;
  @Input() styleClass: string;
  @Input() previewWidth: number = 50;
  @Input() chooseLabel: string;
  @Input() uploadLabel: string;
  @Input() cancelLabel: string;
  @Input() chooseIcon: string;
  @Input() uploadIcon: string;
  @Input() cancelIcon: string;
  @Input() showUploadButton: boolean = true;
  @Input() showCancelButton: boolean = true;
  @Input() mode: NgFilePickerMode = 'advanced';
  @Input() headers: HttpHeaders;
  @Input() customUpload: boolean = false;
  @Input() fileLimit: number;
  @Input() uploadStyleClass: string;
  @Input() cancelStyleClass: string;
  @Input() removeStyleClass: string;
  @Input() chooseStyleClass: string;
  @Output() onBeforeUpload = new EventEmitter<PrimeFileBeforeUploadEvent>();
  @Output() onSend = new EventEmitter<PrimeFileSendEvent>();
  @Output() onUpload = new EventEmitter<PrimeFileUploadEvent>();
  @Output() onError = new EventEmitter<PrimeFileUploadErrorEvent>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<PrimeFileRemoveEvent>();
  @Output() onSelect = new EventEmitter<PrimeFileSelectEvent>();
  @Output() onProgress = new EventEmitter<PrimeFileProgressEvent>();
  @Output() uploadHandler = new EventEmitter<PrimeFileUploadHandlerEvent>();
  @Output() onImageError = new EventEmitter<Event>();
  @ViewChild(PrimeFileUpload, {static: true}) fileUploadComponent: PrimeFileUpload;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  ngControl: NgControl;
  templateMap: Record<string, TemplateRef<any>> = {};
  selectedFiles: any[] = [];
  filesToEmit: any[] = [];
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private utilsService: UtilsService,
              private destroy$: DestroyService) {
  }

  ngOnInit() {
    let parentForm: FormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    const controlContainer = this.injector.get(
      ControlContainer,
      null,
      {optional: true, host: true, skipSelf: true}
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      currentControl = this.ngControl.control;
      if (controlContainer) {
        parentForm = controlContainer.control;
        rootForm = controlContainer.formDirective as FormGroupDirective;
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
    this.templates.forEach(item => {
      const name = item.getType();
      this.templateMap[name] = item.templateRef;
    });
  }

  _onRemove(event: PrimeFileRemoveEvent) {
    this.filesToEmit.splice(this.selectedFiles.indexOf(event.file), 1);
    this.onModelChange(this.filesToEmit);
    this.onRemove.emit(event);
  }

  async _onSelect(event: PrimeFileSelectEvent) {
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
    this.onSelect.emit({
      files: this.filesToEmit,
      currentFiles: event.currentFiles,
      originalEvent: event.originalEvent
    });
    this.onModelChange(this.filesToEmit);
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

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && (control.touched || control.dirty) && control.invalid);
    }
    return false
  }

  hasError(type: string) {
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
}
