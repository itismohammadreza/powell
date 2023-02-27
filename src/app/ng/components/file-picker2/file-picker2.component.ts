import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
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
} from '@angular/forms';
import {NgColor} from '@ng/models/color';
import {NgFixLabelPosition, NgValidation} from '@ng/models/forms';
import {NgGlobal} from "@ng/ng-global";
import {UtilsService} from "@ng/services";

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
  host: {
    '[style.display]': "'block'"
  }
})
export class FilePicker2Component
  implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  @Input() value: any = [];
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = NgGlobal.config.rtl;
  @Input() showRequiredStar: boolean = NgGlobal.config.showRequiredStar;
  @Input() labelPos: NgFixLabelPosition = NgGlobal.config.fixLabelPos;
  @Input() validation: NgValidation;
  @Input() disableConfigChangeEffect: boolean;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() multiple: boolean = true;
  @Input() isUnknownImageUrl: boolean = false;
  @Input() accept: string;
  @Input() color: NgColor = 'primary';
  @Input() fileLimit: number = 20000;
  @Input() resultType: 'base64' | 'file' | 'none' = 'base64';
  @Input() chooseLabel: string = 'انتخاب';
  @Output() onSelect = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  filesToShow: { display: string | ArrayBuffer, name: string }[] = [];
  filesToEmit: any[] = [];
  _chooseLabel: string;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(
    private cd: ChangeDetectorRef,
    private injector: Injector,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    //store user defined label for single selection mode
    this._chooseLabel = this.chooseLabel;
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
        rootForm.ngSubmit.subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
  }

  ngOnChanges() {
    this.init(this.value);
  }

  ngAfterViewInit() {
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      this.cd.detectChanges();
    }
  }

  async onSingleSelect(event: any) {
    const file: File = event.target.files[0];
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

  async onMultipleSelect(event: any) {
    const file: File = event.target.files[0];
    if (this.filesToShow.findIndex(f => f.name == file.name) > -1) {
      return
    }
    await this.handleFile(file);
    this.onSelect.emit(this.filesToEmit);
    this.onModelChange(this.filesToEmit);
  }

  onMultipleDelete(event: any, index: number) {
    event.stopPropagation();
    this.onRemove.emit(this.filesToEmit[index]);
    this.filesToShow.splice(index, 1);
    this.filesToEmit.splice(index, 1);
    this.onModelChange(this.filesToEmit);
  }

  async handleFile(item: File) {
    const base64 = await this.utilsService.fileToBase64(item);
    this.filesToShow.push({display: base64, name: item.name});
    this.chooseLabel = item.name;
    if (this.resultType == 'base64') {
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

  getFileType(file: any) {
    let result;
    if (!!file && (this.utilsService.isImage(file) || (this.utilsService.isValidURL(file) && this.isUnknownImageUrl))) {
      result = 'image';
    } else {
      result = 'file';
    }
    return result
  }
}
