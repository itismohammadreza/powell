import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidatorFn
} from '@angular/forms';
import {takeUntil} from "rxjs";
import {
  ButtonProps,
  FilePickerRemoveEvent,
  FilePickerSelectEvent,
  FileResultType,
  FixLabelPosition,
  Validation
} from '@powell/models';
import {ConfigService} from "@powell/api";
import {DestroyService} from "@powell/utils";
import {$uuid} from "@powell/primeng";
import {helpers} from "@core/utils";

interface FileToShow {
  display?: string | ArrayBuffer;
  name?: string;
  size?: number;
  invalidTypeError?: string;
  invalidSizeError?: string;
}

@Component({
  selector: 'pw-file-picker2',
  templateUrl: './file-picker2.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilePicker2Component),
      multi: true
    },
    DestroyService
  ],
  standalone: false
})
export class FilePicker2Component implements OnInit, OnChanges, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: SafeAny = [];
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: Optional<boolean>;
  @Input() showRequiredStar: Optional<boolean>;
  @Input() labelPosition: Optional<FixLabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() followConfig: Optional<boolean>;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() multiple: boolean = false;
  @Input() isUnknownImageUrl: boolean = false;
  @Input() accept: Optional<string>;
  @Input() maxFileSize: Optional<number>;
  @Input() fileLimit: Optional<number>;
  @Input() previewWidth: number = 50;
  @Input() resultType: FileResultType = 'file';
  @Input() buttonLabel: string = 'انتخاب';
  @Input() buttonProps: Optional<ButtonProps>;
  @Input() invalidFileSizeMessage: string = 'سایز فایل نامعتبر است';
  @Input() invalidFileTypeMessage: string = 'فرمت نامعتبر است';
  @Input() emptyMessage: string = 'فایلی انتخاب نشده است';
  @Input() id: string = $uuid();
  @Input() fluid: boolean = false;
  @Output() onSelect = new EventEmitter<FilePickerSelectEvent>();
  @Output() onRemove = new EventEmitter<FilePickerRemoveEvent>();

  ngControl: Nullable<NgControl> = null;
  filesToShow: FileToShow[] = [];
  filesToEmit: (string | ArrayBuffer | File)[] = [];
  typeValidator: ValidatorFn = () => ({invalidType: ''});
  sizeValidator: ValidatorFn = () => ({invalidSize: ''});
  onModelChange: Fn = () => {
  };
  onModelTouched: Fn = () => {
  };

  ngOnInit() {
    setTimeout(() => {
      if (!this.multiple) {
        this.fileLimit = 1;
      }
    })
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
      currentControl = this.ngControl.control!;
      if (controlContainer) {
        parentForm = controlContainer.control;
        rootForm = controlContainer.formDirective as FormGroupDirective;
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name!.toString())!;
        }
        rootForm.ngSubmit.pipe(takeUntil(this.destroy$)).subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
    this.configService.configureComponent(this, true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.init(this.value);
    }
  }

  async _onSelect(event: SafeAny) {
    const fileList: FileList = event.target.files;
    const files = Array.from(fileList);
    if (!files?.length) {
      return;
    }

    const existingKeys = new Set(this.filesToShow.map(f => `${f.name}-${f.size}`));

    let filteredFiles = files.filter(f => {
      const key = `${f.name}-${f.size}`;
      return !existingKeys.has(key);
    });

    if (this.fileLimit && filteredFiles.length + this.filesToShow.length > this.fileLimit) {
      filteredFiles = filteredFiles.slice(0, this.fileLimit - this.filesToShow.length);
    }

    for (const file of filteredFiles) {
      await this.handleFile(file);
    }

    this.onSelect.emit(this.filesToEmit);
    this.handleModelChange();
  }

  onFileDelete(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.onRemove.emit(this.filesToEmit[index]);
    this.filesToShow.splice(index, 1);
    this.filesToEmit.splice(index, 1);
    this.handleModelChange();
    if (this.ngControl) {
      const control = this.ngControl.control;
      if (this.filesToShow.every(f => !f.invalidSizeError)) {
        control.removeValidators(this.sizeValidator);
        control.updateValueAndValidity();
      }
      if (this.filesToShow.every(f => !f.invalidTypeError)) {
        control.removeValidators(this.typeValidator);
        control.updateValueAndValidity();
      }
    }
  }

  validateFile(file: File) {
    let invalidSize = false;
    let invalidType = false;
    if (this.accept && !helpers.isFileTypeValid(file, this.accept)) {
      invalidType = true;
    }
    if (this.maxFileSize && file.size > this.maxFileSize) {
      invalidSize = true;
    }
    return {invalidSize, invalidType}
  }

  applyValidator(validator: ValidatorFn) {
    if (this.ngControl) {
      const control = this.ngControl.control!;
      control.addValidators(validator);
      control.updateValueAndValidity();
      control.markAsTouched();
    }
  }

  async handleFile(file: File) {
    const fileToShow: FileToShow = {
      name: file.name,
      size: file.size
    };
    if (helpers.isImage(file)) {
      fileToShow.display = window.URL.createObjectURL(new Blob([file], {type: file.type}));
    }
    const {invalidType, invalidSize} = this.validateFile(file);
    if (invalidType) {
      fileToShow.invalidTypeError = this.invalidFileTypeMessage;
      this.applyValidator(this.typeValidator);
    }
    if (invalidSize) {
      fileToShow.invalidSizeError = this.invalidFileSizeMessage;
      this.applyValidator(this.sizeValidator);
    }
    this.filesToShow.push(fileToShow);

    if (this.resultType == 'base64') {
      const base64 = await helpers.fileToBase64(file);
      this.filesToEmit.push(base64);
    } else if (this.resultType == 'file') {
      this.filesToEmit.push(file);
    } else {
      this.filesToEmit.push(file);
    }
  }

  async handleStringValue(item: string) {
    if (item.indexOf('base64') != -1) {
      this.filesToShow.push({display: item, name: undefined});
      if (this.resultType == 'base64') {
        this.filesToEmit.push(item);
      } else if (this.resultType == 'file') {
        const file = helpers.base64toFile(item, item.split('/').pop()!);
        this.filesToEmit.push(file);
      } else {
        this.filesToEmit.push(item);
      }
    } else {
      this.filesToShow.push({display: item, name: undefined});
      const base64 = await helpers.urlToBase64(item);
      if (this.resultType == 'base64') {
        this.filesToEmit.push(base64);
      } else if (this.resultType == 'file') {
        const file = helpers.base64toFile(base64, item.split('/').pop()!)
        this.filesToEmit.push(file);
      } else {
        this.filesToEmit.push(item);
      }
    }
  }

  getFileType(file: SafeAny) {
    const isImage = !!file && ((typeof file == 'string' && file.includes('blob')) || this.isUnknownImageUrl || helpers.isImage(file));
    if (isImage) {
      return 'image';
    } else {
      return 'file';
    }
  }

  formatSize(bytes: number): string {
    if (!bytes) {
      return '';
    }
    if (bytes === 0) return '0 Bytes';
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, index);
    return `${size.toFixed(2)} ${units[index]}`;
  }

  async init(value: SafeAny) {
    if (!value) {
      return
    }
    this.filesToShow = [];
    this.filesToEmit = [];
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item instanceof File) {
          await this.handleFile(item);
        }
        if (typeof item == 'string') {
          await this.handleStringValue(item);
        }
      }
    } else if (value instanceof File) {
      await this.handleFile(value)
    } else if (typeof value == 'string') {
      await this.handleStringValue(value)
    }
    this.handleModelChange();
    this.cd.markForCheck();
  }

  handleModelChange() {
    const value = this.filesToEmit.length ? (this.multiple ? this.filesToEmit : this.filesToEmit[0]) : null;
    this.onModelChange(value);
  }

  writeValue(value: SafeAny) {
    this.init(value);
  }

  registerOnChange(fn: Fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
    this.cd.markForCheck();
  }
}
