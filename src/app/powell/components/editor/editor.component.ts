import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
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
  NgControl
} from '@angular/forms';
import {takeUntil} from "rxjs";
import {Core} from 'suneditor/src/lib/core';
import {SunEditorOptions} from "suneditor/src/options";
import plugins from 'suneditor/src/plugins';
import {
  NgEditorEvent,
  NgEditorOnAudioUpload,
  NgEditorOnAudioUploadBefore,
  NgEditorOnAudioUploadError,
  NgEditorOnChange,
  NgEditorOnCopy,
  NgEditorOnCut,
  NgEditorOnDrop,
  NgEditorOnImageUpload,
  NgEditorOnImageUploadBefore,
  NgEditorOnImageUploadError,
  NgEditorOnLoadEvent,
  NgEditorOnResizeEditor,
  NgEditorOnVideoUpload,
  NgEditorOnVideoUploadBefore,
  NgEditorOnVideoUploadError,
  NgEditorShowController,
  NgEditorShowInline,
  NgEditorToggleCodeView,
  NgEditorToggleFullScreen,
  NgFixLabelPosition,
  NgValidation
} from '@powell/models';
import {EditorBaseComponent} from "@powell/components/editor";
import {DestroyService} from "@core/utils";
import {PrimeUniqueComponentId} from "@powell/primeng/api";

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
    DestroyService
  ],
})
export class EditorComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPos: NgFixLabelPosition;
  @Input() validation: NgValidation;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() disableConfigChangeEffect: boolean;
  @Input() inputId: string = PrimeUniqueComponentId();
  // native properties
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
  @Input() localStorageConfig = {id: 'ngxSunEditor', autoSave: false, autoLoad: false};
  @Output() created = new EventEmitter<EditorBaseComponent>();
  @Output() onload = new EventEmitter<NgEditorOnLoadEvent>();
  @Output() onScroll = new EventEmitter<NgEditorEvent>();
  @Output() onMouseDown = new EventEmitter<NgEditorEvent>();
  @Output() onClick = new EventEmitter<NgEditorEvent>();
  @Output() onInput = new EventEmitter<NgEditorEvent>();
  @Output() onKeyDown = new EventEmitter<NgEditorEvent>();
  @Output() onKeyUp = new EventEmitter<NgEditorEvent>();
  @Output() onFocus = new EventEmitter<NgEditorEvent>();
  @Output() onBlur = new EventEmitter<NgEditorEvent>();
  @Output() onResizeEditor = new EventEmitter<NgEditorOnResizeEditor>();
  @Output() onAudioUploadBefore = new EventEmitter<NgEditorOnAudioUploadBefore>();
  @Output() onVideoUploadError = new EventEmitter<NgEditorOnVideoUploadError>();
  @Output() onVideoUploadBefore = new EventEmitter<NgEditorOnVideoUploadBefore>();
  @Output() onImageUploadError = new EventEmitter<NgEditorOnImageUploadError>();
  @Output() onImageUploadBefore = new EventEmitter<NgEditorOnImageUploadBefore>();
  @Output() onAudioUploadError = new EventEmitter<NgEditorOnAudioUploadError>();
  @Output() onDrop = new EventEmitter<NgEditorOnDrop>();
  @Output() onChange = new EventEmitter<NgEditorOnChange>();
  @Output() showController = new EventEmitter<NgEditorShowController>();
  @Output() toggleFullScreen = new EventEmitter<NgEditorToggleFullScreen>();
  @Output() toggleCodeView = new EventEmitter<NgEditorToggleCodeView>();
  @Output() showInline = new EventEmitter<NgEditorShowInline>();
  @Output() onAudioUpload = new EventEmitter<NgEditorOnAudioUpload>();
  @Output() onVideoUpload = new EventEmitter<NgEditorOnVideoUpload>();
  @Output() onImageUpload = new EventEmitter<NgEditorOnImageUpload>();
  @Output() onCut = new EventEmitter<NgEditorOnCut>();
  @Output() onCopy = new EventEmitter<NgEditorOnCopy>();

  ngControl: NgControl;
  editorInstance: EditorBaseComponent;
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private destroy$: DestroyService) {
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

  _created(event: EditorBaseComponent) {
    this.editorInstance = event;
    this.created.emit(event)
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  _onChange(event: NgEditorOnChange) {
    this.onChange.emit(event);
    this.onModelChange(this.editorInstance.getText() ? event.core.getContents(false) : null);
  }

  _onInput(event: NgEditorEvent) {
    this.onInput.emit(event);
    const result = this.editorInstance.getText() ? event.core.getContents(false) : null;
    this.onModelChange(result);
  }

  _onKeyDown(event: NgEditorEvent) {
    this.onKeyDown.emit(event);
    this.onModelChange(this.editorInstance.getText() ? event.core.getContents(false) : null);
  }

  _onKeyUp(event: NgEditorEvent) {
    this.onKeyUp.emit(event);
    this.onModelChange(this.editorInstance.getText() ? event.core.getContents(false) : null);
  }

  _onBlur(event: NgEditorEvent) {
    this.onBlur.emit(event);
    this.onModelTouched();
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
        hasError = true
      }
    }
    return !hasError;
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
