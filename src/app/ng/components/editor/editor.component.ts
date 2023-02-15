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
  SimpleChanges,
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
import {Core} from 'suneditor/src/lib/core';
import {SunEditorOptions} from "suneditor/src/options";
import plugins from 'suneditor/src/plugins';
import {NgFixLabelPosition, NgValidation} from '@ng/models/forms';
import {NgConfig} from "@ng/models/config";
import {EditorBaseComponent} from "@ng/components/editor/editor-base/editor-base.component";

@Component({
  selector: 'ng-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class EditorComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean = this.ngConfig.rtl;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgFixLabelPosition = this.ngConfig.fixLabelPos;
  @Input() validation: NgValidation;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() options: SunEditorOptions;
  @Input() onDrop_param: boolean = true;
  @Input() onCopy_param: boolean = true;
  @Input() onCut_param: boolean = true;
  @Input() onAudioUploadError_param: boolean = true;
  @Input() onImageUploadBefore_param: boolean = true;
  @Input() onImageUploadError_param: boolean = true;
  @Input() onVideoUploadBefore_param: boolean = true;
  @Input() onVideoUploadError_param: boolean = true;
  @Input() onAudioUploadBefore_param: boolean = true;
  @Input() onResizeEditor_param: any = {};
  @Input() imageUploadHandler: (xmlHttp: XMLHttpRequest, info: any, core: Core) => void;
  @Input() videoUploadHandler: (xmlHttp: XMLHttpRequest, info: any, core: Core) => void;
  @Input() audioUploadHandler: (xmlHttp: XMLHttpRequest, info: any, core: Core) => void;
  @Input() localStorageConfig = {id: 'ngxSunEditor', autoSave: false, autoLoad: false}
  @Output() created = new EventEmitter()
  @Output() onload = new EventEmitter()
  @Output() onScroll = new EventEmitter()
  @Output() onMouseDown = new EventEmitter()
  @Output() onClick = new EventEmitter()
  @Output() onInput = new EventEmitter()
  @Output() onKeyDown = new EventEmitter()
  @Output() onKeyUp = new EventEmitter()
  @Output() onFocus = new EventEmitter()
  @Output() onBlur = new EventEmitter()
  @Output() onResizeEditor = new EventEmitter()
  @Output() onAudioUploadBefore = new EventEmitter()
  @Output() onVideoUploadError = new EventEmitter()
  @Output() onVideoUploadBefore = new EventEmitter()
  @Output() onImageUploadError = new EventEmitter()
  @Output() onImageUploadBefore = new EventEmitter()
  @Output() onAudioUploadError = new EventEmitter()
  @Output() onDrop = new EventEmitter()
  @Output() onChange = new EventEmitter()
  @Output() showController = new EventEmitter()
  @Output() toggleFullScreen = new EventEmitter()
  @Output() toggleCodeView = new EventEmitter()
  @Output() showInline = new EventEmitter()
  @Output() onAudioUpload = new EventEmitter()
  @Output() onVideoUpload = new EventEmitter()
  @Output() onImageUpload = new EventEmitter()
  @Output() onCut = new EventEmitter()
  @Output() onCopy = new EventEmitter()

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  editorInstance: EditorBaseComponent;

  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  ngOnInit() {
    if (!this.options) {
      this.options = {
        plugins: plugins,
        minWidth: '100%',
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["paragraphStyle", "blockquote"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["removeFormat"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          ["table", "link", "image", "video", "audio"],
          ["fullScreen", "showBlocks", "codeView"],
          ["preview", "print"],
          ["save", "template"],
        ],
      }
    }
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

  ngOnChanges(changes: SimpleChanges) {
    if (!this.editorInstance) {
      return
    }
    if (changes.readonly) {
      this.editorInstance.readOnly(changes.readonly.currentValue)
    }
    if (changes.disabled) {
      if (changes.disabled.currentValue) {
        this.editorInstance.disabled();
      } else {
        this.editorInstance.enabled()
      }
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

  _created(event: EditorBaseComponent) {
    this.editorInstance = event;
    this.created.emit(event)
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onChange(event: any) {
    this.onChange.emit(event);
    this.onModelChange(this.editorInstance.getText() ? event.core.getContents() : null);
  }

  _onInput(event: any) {
    this.onInput.emit(event);
    const result = this.editorInstance.getText() ? event.core.getContents() : null;
    this.onModelChange(result);
  }

  _onKeyDown(event: any) {
    this.onKeyDown.emit(event);
    this.onModelChange(this.editorInstance.getText() ? event.core.getContents() : null);
  }

  _onKeyUp(event: any) {
    this.onKeyUp.emit(event);
    this.onModelChange(this.editorInstance.getText() ? event.core.getContents() : null);
  }

  _onBlur(event: any) {
    this.onBlur.emit(event);
    this.onModelTouched();
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
        hasError = true
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
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (!this.editorInstance) {
      return
    }
    if (isDisabled) {
      this.editorInstance.disabled()
    } else {
      this.editorInstance.enabled()
    }
    this.cd.markForCheck()
  }
}
