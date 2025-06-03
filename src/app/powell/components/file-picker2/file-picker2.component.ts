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
  CssObject,
  FilePickerRemoveEvent,
  FilePickerSelectEvent,
  FileResultType,
  FixLabelPosition,
  Validation
} from '@powell/models';
import {ConfigService, UtilsService} from "@powell/api";
import {DestroyService} from "@powell/utils";
import {$uuid} from "@powell/primeng";

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
  private utilsService = inject(UtilsService);

  @Input() value: any = [];
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPosition: FixLabelPosition;
  @Input() validation: Validation;
  @Input() followConfig: boolean;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() multiple: boolean = true;
  @Input() isUnknownImageUrl: boolean = false;
  @Input() accept: string;
  @Input() maxFileSize: number;
  @Input() fileLimit: number;
  @Input() resultType: FileResultType = 'file';
  @Input() chooseLabel: string = 'انتخاب';
  @Input() chooseButtonProps: ButtonProps;
  @Input() invalidFileSizeMessage: string = 'سایز فایل نامعتبر است.';
  @Input() invalidFileTypeMessage: string = 'فرمت نامعتبر است.';
  @Input() id: string = $uuid();
  @Input() style: CssObject;
  @Input() styleClass: string;
  @Input() fluid: boolean;
  @Output() onSelect = new EventEmitter<FilePickerSelectEvent>();
  @Output() onRemove = new EventEmitter<FilePickerRemoveEvent>();

  ngControl: NgControl;
  filesToShow: {display: string | ArrayBuffer, name: string}[] = [];
  filesToEmit: (string | ArrayBuffer | File)[] = [];
  _chooseLabel: string;
  _validation: Validation = {};
  invalidFileSize: boolean;
  invalidFileType: boolean;
  typeValidator: ValidatorFn = () => ({invalidType: this.invalidFileTypeMessage});
  sizeValidator: ValidatorFn = () => ({invalidSize: this.invalidFileSizeMessage});
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };

  ngOnInit() {
    if (this.validation) {
      this._validation = {...this.validation}
    }
    // store user defined label for single selection mode
    this._chooseLabel = this.chooseLabel;
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
    this.configService.configureComponent(this, true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.init(this.value);
    }
  }

  _onSelect(event: any) {
    const file: File = event.target.files[0];
    this.clearValidators();
    if (!this.isValidFile(file)) {
      return;
    }
    if (this.multiple) {
      this.onMultipleSelect(file)
    } else if (!this.multiple) {
      this.onSingleSelect(file)
    }
  }

  async onSingleSelect(file: File) {
    this.filesToShow = [];
    this.filesToEmit = [];
    await this.handleFile(file);
    this.onSelect.emit(this.filesToEmit[0]);
    this.onModelChange(this.filesToEmit[0]);
  }

  onSingleDelete() {
    this.filesToEmit = [];
    this.filesToShow = [];
    this.chooseLabel = this._chooseLabel;
    this.onRemove.emit();
    this.onModelChange(null);
  }

  async onMultipleSelect(file: File) {
    if (this.filesToShow.findIndex(f => f.name == file.name) > -1) {
      return
    }
    await this.handleFile(file);
    this.onSelect.emit(this.filesToEmit);
    this.onModelChange(this.filesToEmit);
  }

  onMultipleDelete(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.onRemove.emit(this.filesToEmit[index]);
    this.filesToShow.splice(index, 1);
    this.filesToEmit.splice(index, 1);
    this.onModelChange(this.filesToEmit);
  }

  isValidFile(file: File) {
    if (this.accept && !this.utilsService.isFileTypeValid(file, this.accept)) {
      if (this.ngControl) {
        this.applyValidator(this.typeValidator);
      } else {
        this.invalidFileType = true;
      }
      return false;
    }
    if (this.maxFileSize && file.size > this.maxFileSize) {
      if (this.ngControl) {
        this.applyValidator(this.sizeValidator);
      } else {
        this.invalidFileSize = true;
      }
      return false;
    }
    return true;
  }

  clearValidators() {
    if (this.ngControl) {
      this.ngControl.control.removeValidators(this.typeValidator);
      this.ngControl.control.removeValidators(this.sizeValidator);
      this.ngControl.control.updateValueAndValidity();
      delete this._validation.invalidSize;
      delete this._validation.invalidType;
    } else {
      this.invalidFileType = false;
      this.invalidFileSize = false;
    }
  }

  applyValidator(validator: ValidatorFn) {
    this.ngControl.control.addValidators(validator);
    this.ngControl.control.updateValueAndValidity();
    this.ngControl.control.markAsTouched();
    this._validation = {...this.validation, ...validator(null)}
  }

  async handleFile(item: File) {
    if (this.utilsService.isImage(item)) {
      const blobUrl = window.URL.createObjectURL(new Blob([item], {type: item.type}));
      this.filesToShow.push({display: blobUrl, name: item.name});
    } else {
      this.filesToShow.push({display: null, name: item.name});
    }
    this.chooseLabel = item.name;
    if (this.resultType == 'base64') {
      const base64 = await this.utilsService.fileToBase64(item);
      this.filesToEmit.push(base64);
    } else if (this.resultType == 'file') {
      this.filesToEmit.push(item);
    } else {
      this.filesToEmit.push(item);
    }
  }

  async handleStringValue(item: string) {
    if (item.indexOf('base64') != -1) {
      this.filesToShow.push({display: item, name: '--'});
      if (this.resultType == 'base64') {
        this.filesToEmit.push(item);
      } else if (this.resultType == 'file') {
        const file = this.utilsService.base64toFile(item, item.split('/').pop());
        this.filesToEmit.push(file);
      } else {
        this.filesToEmit.push(item);
      }
    } else {
      this.filesToShow.push({display: item, name: '--'});
      const base64 = await this.utilsService.urlToBase64(item);
      if (this.resultType == 'base64') {
        this.filesToEmit.push(base64);
      } else if (this.resultType == 'file') {
        const file = this.utilsService.base64toFile(base64, item.split('/').pop())
        this.filesToEmit.push(file);
      } else {
        this.filesToEmit.push(item);
      }
    }
  }

  getFileType(file: any) {
    const isImage = !!file && ((typeof file == 'string' && file.includes('blob')) || this.isUnknownImageUrl || this.utilsService.isImage(file));
    if (isImage) {
      return 'image';
    } else {
      return 'file';
    }
  }

  async init(value: any) {
    if (!value) {
      return
    }
    this.filesToShow = [];
    this.filesToEmit = [];
    if (Array.isArray(value) && this.multiple) {
      for (const item of value) {
        if (item instanceof File) {
          await this.handleFile(item);
        }
        if (typeof item == 'string') {
          await this.handleStringValue(item);
        }
      }
      this.onModelChange(this.filesToEmit);
    } else if (value instanceof File) {
      await this.handleFile(value)
      this.onModelChange(this.filesToEmit[0]);
    } else if (typeof value == 'string') {
      await this.handleStringValue(value)
      this.onModelChange(this.filesToEmit[0]);
    }
    this.cd.markForCheck();
  }

  writeValue(value: any) {
    this.init(value);
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
}
