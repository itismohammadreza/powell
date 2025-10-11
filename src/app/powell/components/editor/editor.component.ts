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
  NgControl
} from '@angular/forms';
import {takeUntil} from "rxjs";
import type {Core} from 'suneditor/src/lib/core';
import type {SunEditorOptions} from 'suneditor/src/options';
import {
  CssObject,
  EditorEvent,
  EditorOnAudioUpload,
  EditorOnAudioUploadBefore,
  EditorOnAudioUploadError,
  EditorOnChange,
  EditorOnCopy,
  EditorOnCut,
  EditorOnDrop,
  EditorOnImageUpload,
  EditorOnImageUploadBefore,
  EditorOnImageUploadError,
  EditorOnLoadEvent,
  EditorOnResizeEditor,
  EditorOnVideoUpload,
  EditorOnVideoUploadBefore,
  EditorOnVideoUploadError,
  EditorShowController,
  EditorShowInline,
  EditorToggleCodeView,
  EditorToggleFullScreen,
  FixLabelPosition,
  Validation
} from '@powell/models';
import {EditorBaseComponent} from "@powell/components/editor";
import {DestroyService} from "@powell/utils";
import {$uuid} from "@powell/primeng";
import {ConfigService} from "@powell/api";

@Component({
  selector: 'pw-editor',
  templateUrl: './editor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
    DestroyService
  ],
  standalone: false
})
export class EditorComponent implements OnInit, OnChanges, ControlValueAccessor {
  private cd = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private configService = inject(ConfigService);
  private destroy$ = inject(DestroyService);

  @Input() value: Optional<any>;
  @Input() label: Optional<string>;
  @Input() labelWidth: Optional<number>;
  @Input() hint: Optional<string>;
  @Input() rtl: boolean = false;
  @Input() showRequiredStar: boolean = false;
  @Input() labelPosition: Optional<FixLabelPosition>;
  @Input() validation: Optional<Validation>;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() followConfig: boolean = false;
  @Input() inputId: string = $uuid();
  @Input() style: Optional<CssObject>;
  @Input() styleClass: Optional<string>;
  // native properties
  @Input() options: Optional<SunEditorOptions>;
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
  @Input() imageUploadHandler: Optional<(xmlHttp: XMLHttpRequest, info: any, core: Core) => void>;
  @Input() videoUploadHandler: Optional<(xmlHttp: XMLHttpRequest, info: any, core: Core) => void>;
  @Input() audioUploadHandler: Optional<(xmlHttp: XMLHttpRequest, info: any, core: Core) => void>;
  @Input() localStorageConfig = {id: 'ngxSunEditor', autoSave: false, autoLoad: false};
  @Output() created = new EventEmitter<EditorBaseComponent>();
  @Output() onload = new EventEmitter<EditorOnLoadEvent>();
  @Output() onScroll = new EventEmitter<EditorEvent>();
  @Output() onMouseDown = new EventEmitter<EditorEvent>();
  @Output() onClick = new EventEmitter<EditorEvent>();
  @Output() onInput = new EventEmitter<EditorEvent>();
  @Output() onKeyDown = new EventEmitter<EditorEvent>();
  @Output() onKeyUp = new EventEmitter<EditorEvent>();
  @Output() onFocus = new EventEmitter<EditorEvent>();
  @Output() onBlur = new EventEmitter<EditorEvent>();
  @Output() onResizeEditor = new EventEmitter<EditorOnResizeEditor>();
  @Output() onAudioUploadBefore = new EventEmitter<EditorOnAudioUploadBefore>();
  @Output() onVideoUploadError = new EventEmitter<EditorOnVideoUploadError>();
  @Output() onVideoUploadBefore = new EventEmitter<EditorOnVideoUploadBefore>();
  @Output() onImageUploadError = new EventEmitter<EditorOnImageUploadError>();
  @Output() onImageUploadBefore = new EventEmitter<EditorOnImageUploadBefore>();
  @Output() onAudioUploadError = new EventEmitter<EditorOnAudioUploadError>();
  @Output() onDrop = new EventEmitter<EditorOnDrop>();
  @Output() onChange = new EventEmitter<EditorOnChange>();
  @Output() showController = new EventEmitter<EditorShowController>();
  @Output() toggleFullScreen = new EventEmitter<EditorToggleFullScreen>();
  @Output() toggleCodeView = new EventEmitter<EditorToggleCodeView>();
  @Output() showInline = new EventEmitter<EditorShowInline>();
  @Output() onAudioUpload = new EventEmitter<EditorOnAudioUpload>();
  @Output() onVideoUpload = new EventEmitter<EditorOnVideoUpload>();
  @Output() onImageUpload = new EventEmitter<EditorOnImageUpload>();
  @Output() onCut = new EventEmitter<EditorOnCut>();
  @Output() onCopy = new EventEmitter<EditorOnCopy>();

  ngControl: Nullable<NgControl> = null;
  editorInstance: Optional<EditorBaseComponent>;
  onModelChange: Fn = () => {
  };
  onModelTouched: Fn = () => {
  };

  async ngOnInit() {
    const SunEditorPlugins = await import('suneditor/src/plugins');

    if (!this.options) {
      this.options = {
        plugins: SunEditorPlugins.default,
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
    if (!this.editorInstance) {
      return
    }
    if (changes['readonly']) {
      this.editorInstance.readOnly(changes['readonly'].currentValue)
    }
    if (changes['disabled']) {
      if (changes['disabled'].currentValue) {
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

  emitter(key: keyof this, event: SafeAny) {
    (this[key] as EventEmitter<SafeAny>).emit(event);
  }

  _onChange(event: EditorOnChange) {
    this.onChange.emit(event);
    this.onModelChange(this.editorInstance?.getText() ? event.core.getContents(false) : null);
  }

  _onInput(event: EditorEvent) {
    this.onInput.emit(event);
    const result = this.editorInstance?.getText() ? event.core.getContents(false) : null;
    this.onModelChange(result);
  }

  _onKeyDown(event: EditorEvent) {
    this.onKeyDown.emit(event);
    this.onModelChange(this.editorInstance?.getText() ? event.core.getContents(false) : null);
  }

  _onKeyUp(event: EditorEvent) {
    this.onKeyUp.emit(event);
    this.onModelChange(this.editorInstance?.getText() ? event.core.getContents(false) : null);
  }

  _onBlur(event: EditorEvent) {
    this.onBlur.emit(event);
    this.onModelTouched();
  }

  writeValue(value: any) {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: Fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Fn) {
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
