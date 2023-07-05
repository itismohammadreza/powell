import {AfterViewInit, Component, EventEmitter, Input, NgZone, Output} from '@angular/core';
import sunEditor from 'suneditor';
import {SunEditorOptions} from "suneditor/src/options";
import {Context} from 'suneditor/src/lib/context';
import SunEditor, {
  audioInputInformation,
  commands,
  Controllers,
  Core,
  fileInfo,
  imageInputInformation,
  videoInputInformation,
} from 'suneditor/src/lib/core';

@Component({
  selector: 'ng-editor-base',
  templateUrl: './editor-base.component.html',
  styleUrls: ['./editor-base.component.scss']
})
export class EditorBaseComponent implements AfterViewInit {
  // The editor instance that is returned on create
  private editor: SunEditor;

  // the localStorageKey where the Content gets saved
  private localStorageId = 'ngxSunEditor';

  // decides if autoSave to Local Storage is Activated.
  private isAutoSaveToLocalStorage = false;

  // decides if the content should be loaded from teh LocalStorage on start
  private isAutoLoadToLocalStorage = false;

  // disabled state of the SunEditor
  private _disabled: boolean = false;

  // hidden state of the SunEditor
  private _hidden: boolean = false;

  // loading state of the SunEditor
  private _loading: boolean = false;

  // readonly state of the SunEditor
  private _readonly: boolean = false;

  // content buffer to invoke in AfterViewInit
  private _content: string;

  // Fullscreen mode state of SunEditor
  private _fullScreenMode: boolean = false;

  // DisplayBlocks state of SunEditor
  private _displayBlocks: boolean = false;

  // CodeView state of SunEditor
  private _codeView: boolean = false;

  /**
   * Content to show in the Editor. If this value is set the content will be set.
   */
  @Input() set content(content: string) {
    this._content = content;
    if (this.editor) {
      this.setContents(this._content);
    }
  }

  /**
   * HTML DOM id PropertyHTML DOM id Property
   */
  @Input() editorID: string = this.generateID();

  /**
   * SunEditorOptions Object is used once when the editor is created
   */
  @Input() options: SunEditorOptions;

  /**
   * Parameter that is passed to the onDrop event to control the behavior.
   * @default true
   */
  @Input() onDrop_param: boolean = true;

  /**
   * Parameter that is passed to the onCopy event to control the behavior.
   * @default true
   */
  @Input() onCopy_param: boolean = true;

  /**
   * Parameter that is passed to the onCut event to control the behavior.
   * @default true
   */
  @Input() onCut_param: boolean = true;

  /**
   * Parameter that is passed to the onAudioUploadError event to control the behavior.
   * @default true
   */
  @Input() onAudioUploadError_param: boolean | undefined = true;

  /**
   * Parameter that is passed to the onImageUploadBefore event to control the behavior.
   * @default true
   */
  @Input() onImageUploadBefore_param: boolean | undefined = true;

  /**
   * Parameter that is passed to the onImageUploadError event to control the behavior.
   * @default true
   */
  @Input() onImageUploadError_param: boolean | undefined = true;

  /**
   * Parameter that is passed to the onVideoUploadBefore event to control the behavior.
   * @default true
   */
  @Input() onVideoUploadBefore_param: boolean | undefined = true;

  /**
   * Parameter that is passed to the onVideoUploadError event to control the behavior.
   * @default true
   */
  @Input() onVideoUploadError_param: boolean | undefined = true;

  /**
   * Parameter that is passed to the onAudioUploadBefore event to control the behavior.
   * @default true
   */
  @Input() onAudioUploadBefore_param: boolean | undefined = true;

  /**
   * Parameter that is passed to the onResizeEditor event to control the behavior.
   * @default {}
   */
  @Input() onResizeEditor_param: Object | undefined = {};

  // handler buffer to invoke in AfterViewInit
  private _imageUploadHandler: (
    xmlHttp: XMLHttpRequest,
    info: imageInputInformation,
    core: Core
  ) => void;
  /**
   * Callback to replace the default imageUploadHandler function
   */
  @Input() set imageUploadHandler(
    callback: (
      xmlHttp: XMLHttpRequest,
      info: imageInputInformation,
      core: Core
    ) => void
  ) {
    const handlerCallback = (
      xmlHttp: XMLHttpRequest,
      info: imageInputInformation,
      core: Core
    ) => {
      callback(xmlHttp, info, core);
    };
    this._imageUploadHandler = handlerCallback;
    if (this.editor) this.editor.imageUploadHandler = handlerCallback;
  }

  // handler buffer to invoke in AfterViewInit
  private _videoUploadHandler: (
    xmlHttp: XMLHttpRequest,
    info: videoInputInformation,
    core: Core
  ) => void;
  /**
   * Callback to replace the default videoUploadHandler function
   */
  @Input() set videoUploadHandler(
    callback: (
      xmlHttp: XMLHttpRequest,
      info: videoInputInformation,
      core: Core
    ) => void
  ) {
    const handlerCallback = (
      xmlHttp: XMLHttpRequest,
      info: videoInputInformation,
      core: Core
    ) => {
      callback(xmlHttp, info, core);
    };
    this._videoUploadHandler = handlerCallback;
    if (this.editor) this.editor.videoUploadHandler = handlerCallback;
  }

  // handler buffer to invoke in AfterViewInit
  private _audioUploadHandler: (
    xmlHttp: XMLHttpRequest,
    info: audioInputInformation,
    core: Core
  ) => void;
  /**
   * Callback to replace the default audioUploadHandler function
   */
  @Input() set audioUploadHandler(
    callback: (
      xmlHttp: XMLHttpRequest,
      info: audioInputInformation,
      core: Core
    ) => void
  ) {
    const handlerCallback = (
      xmlHttp: XMLHttpRequest,
      info: audioInputInformation,
      core: Core
    ) => {
      callback(xmlHttp, info, core);
    };
    this._audioUploadHandler = handlerCallback;
    if (this.editor) this.editor.audioUploadHandler = handlerCallback;
  }

  /**
   * The localStorageConfig Object {id: string, autoSave: boolean, autoLoad: boolean}
   * id is the localStorageKey where the Content gets saved.
   * autoSave decides if the content should be automaticly saved in the onChange event
   * autoLoad decides if the content should be automaticly loaded on startUp
   * @Default = {id: 'ngxSunEditor', autoSave: false, autoLoad: false}
   */
  @Input() set localStorageConfig(config: {
    id?: string;
    autoSave?: boolean;
    autoLoad?: boolean;
  }) {
    if (config.id) {
      this.localStorageId = config.id;
    }
    if (config.autoSave !== undefined && config.autoSave !== null) {
      this.isAutoSaveToLocalStorage = config.autoSave;
    }
    if (config.autoLoad !== undefined && config.autoLoad !== null) {
      this.isAutoLoadToLocalStorage = config.autoLoad;
    }
  }

  /**
   * Emitted after the editor compontent was created
   */
  @Output() created = new EventEmitter<EditorBaseComponent>();

  /**
   *  When reloaded with the "setOptions" method
   */
  @Output() onload = new EventEmitter<{ core: Core; reload: boolean }>();

  /**
   * Scroll event
   */
  @Output() onScroll = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Mouse down
   */
  @Output() onMouseDown = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * clicked
   */
  @Output() onClick = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Wysiwyg editor area Input event
   */
  @Output() onInput = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * keydown event
   */
  @Output() onKeyDown = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * keyup event
   */
  @Output() onKeyUp = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Focus event
   */
  @Output() onFocus = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Blur event
   */
  @Output() onBlur = new EventEmitter<{ e: Event; core: Core }>();

  /**
   * Called when the editor is resized using the bottom bar
   */
  @Output() onResizeEditor = new EventEmitter<{
    height: number;
    prevHeight: number;
    core: Core;
  }>();

  /**
   * Called before the audio is uploaded
   */
  @Output() onAudioUploadBefore = new EventEmitter<{
    files: any[];
    info: audioInputInformation;
    core: Core;
    uploadHandler: Function;
  }>();

  /**
   * Called on video upload error
   */
  @Output() onVideoUploadError = new EventEmitter<{
    errorMessage: string;
    result: any;
    core: Core;
  }>();

  /**
   * Called before the video is uploaded
   */
  @Output() onVideoUploadBefore = new EventEmitter<{
    files: any[];
    info: videoInputInformation;
    core: Core;
    uploadHandler: Function;
  }>();

  /**
   * Called on image upload error
   */
  @Output() onImageUploadError = new EventEmitter<{
    errorMessage: string;
    result: any;
    core: Core;
  }>();

  /**
   * Called before the image is uploaded
   */
  @Output() onImageUploadBefore = new EventEmitter<{
    files: any[];
    info: imageInputInformation;
    core: Core;
    uploadHandler: Function;
  }>();

  /**
   * Called on audio upload error
   */
  @Output() onAudioUploadError = new EventEmitter<{
    errorMessage: string;
    result: any;
    core: Core;
  }>();

  /**
   * Drop event
   */
  @Output() onDrop = new EventEmitter<{
    e: Event;
    cleanData: string;
    maxCharCount: number;
    core: Core;
  }>();

  /**
   *  Called when the contents changes
   */
  @Output() onChange = new EventEmitter<{
    content: string;
    core: Core;
  }>();

  /**
   * Called just after the controller is positioned and displayed on the screen
   */
  @Output() showController = new EventEmitter<{
    name: String;
    controllers: Controllers;
    core: Core;
  }>();

  /**
   * Called when toggling full screen
   */
  @Output() toggleFullScreen = new EventEmitter<{
    isFullScreen: boolean;
    core: Core;
  }>();

  /**
   * Called when toggling between code view and wysiwyg view
   */
  @Output() toggleCodeView = new EventEmitter<{
    isCodeView: boolean;
    core: Core;
  }>();

  /**
   * Called just before the inline toolbar is positioned and displayed on the screen
   */
  @Output() showInline = new EventEmitter<{
    toolbar: Element;
    context: Context;
    core: Core;
  }>();

  /**
   * Called on audio upload
   */
  @Output() onAudioUpload = new EventEmitter<{
    targetElement: HTMLAudioElement;
    index: number;
    state: string;
    info: fileInfo;
    remainingFilesCount: number;
    core: Core;
  }>();

  /**
   * Called on video upload
   */
  @Output() onVideoUpload = new EventEmitter<{
    targetElement: HTMLIFrameElement | HTMLVideoElement;
    index: number;
    state: string;
    info: fileInfo;
    remainingFilesCount: number;
    core: Core;
  }>();

  /**
   * Called on image upload
   */
  @Output() onImageUpload = new EventEmitter<{
    targetElement: HTMLImageElement;
    index: number;
    state: string;
    info: fileInfo;
    remainingFilesCount: number;
    core: Core;
  }>();

  /**
   * Called when cut to clipboard
   */
  @Output() onCut = new EventEmitter<{
    e: Event;
    clipboardData: any;
    core: Core;
  }>();

  /**
   * Called when copy to clipboard
   */
  @Output() onCopy = new EventEmitter<{
    e: Event;
    clipboardData: any;
    core: Core;
  }>();

  constructor(
    private ngZone: NgZone,
  ) {
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      if (this._content) this.options.value = this._content;
      this.editor = sunEditor.create(
        document.getElementById(this.editorID) || this.editorID,
        this.options
      );
      if (this._imageUploadHandler)
        this.editor.imageUploadHandler = this._imageUploadHandler;
      if (this._videoUploadHandler)
        this.editor.videoUploadHandler = this._videoUploadHandler;
      if (this._audioUploadHandler)
        this.editor.audioUploadHandler = this._audioUploadHandler;
    });
    if (this.isAutoLoadToLocalStorage) {
      this.loadLocalStorageContent();
    }
    this.registerEvents();
    this.created.emit(this);
  }

  /**
   * Returns the HTML id Attribute that is randomly generated on startup on every editor instance.
   */
  public getEditorID() {
    return this.editorID;
  }

  /**
   * Returns the raw editor instance.
   * @returns SunEditor
   */
  public getEditor() {
    return this.editor;
  }

  /**
   * Set the toolbar buttons
   * @param buttonList any[]
   */
  public setToolbarButtons(buttonList: any[]) {
    this.editor.setToolbarButtons(buttonList);
  }

  /**
   * Pass a `SunEditorOptions` object to the editor to change the options after the editor was created
   * @param options SunEditorOptions
   */
  public setOptions(options: SunEditorOptions) {
    this.editor.setOptions(options);
  }

  /**
   * Define the style of the edit area without re render
   * @param style Style string
   */
  public setDefaultStyle(style: string) {
    this.editor.setDefaultStyle(style);
  }

  /**
   * Opens a message in the notice panel (Alert)
   * @param message string
   */
  public noticeOpen(message: string) {
    this.editor.noticeOpen(message);
  }

  /**
   * Closes the notice panel (Alert)
   */
  public noticeClose() {
    this.editor.noticeClose();
  }

  /**
   * Copying the contents of the editor to the original textarea and return the content or the full textarea. When passed true as param it only returns the content.
   * Otherwise the original `HTMLInputElement` is returned
   * @param onlyContent boolean
   * @returns string | HTMLInputElement - content or the full textarea
   */
  public save(onlyContent?: boolean) {
    this.editor.save();
    if (onlyContent) {
      return this._content;
    }
    return document.getElementById(this.editorID) as HTMLInputElement;
  }

  /**
   * Gets the SunEditor's context object. Contains settings, plugins, and cached element objects
   */
  public getContext() {
    return this.editor.getContext();
  }

  /**
   * Gets the contents of the suneditor
   * @param onlyContents boolean - Return only the contents of the body without headers when the "fullPage" option is true
   * @returns string - editor content
   */
  public getContents(onlyContents: boolean) {
    return this.editor.getContents(onlyContents);
  }

  /**
   * Gets only the text of the suneditor contents
   */
  public getText() {
    return this.editor.getText();
  }

  /**
   * Get the editor's number of characters or binary data size. You can use the "charCounterType" option format.
   * @param charCounterType charCounterType
   * options - charCounterType ('char', 'byte', 'byte-html') If argument is no value, the currently set "charCounterType" option is used.
   * @returns number
   */
  public getCharCount(charCounterType?: string | undefined) {
    return this.editor.getCharCount(charCounterType);
  }

  /**
   * Gets uploaded images informations
   * index: data index
   * name: file name
   * size: file size
   * select: select function
   * delete: delete function
   * element: img element
   * src: src attribute of img tag
   * @returns fileInfo[]
   */
  public getImagesInfo() {
    return this.editor.getImagesInfo();
  }

  /**
   * Gets uploaded files(plugin using fileManager) information list. image: [img], video: [video, iframe],
   * audio: [audio] When the argument value is 'image', it is the same function as "getImagesInfo".
   * @param pluginName Plugin name (image, video, audio)
   * @returns fileInfo[]
   */
  public getFilesInfo(pluginName: string) {
    return this.editor.getFilesInfo(pluginName);
  }

  /**
   * Upload images using image plugin
   * @param files FileList
   */
  public insertImage(files: FileList) {
    this.editor.insertImage(files);
  }

  /**
   * Inserts an HTML element or HTML string or plain string at the current cursor position
   * @param html HTML Element or HTML string or plain string
   * @param notCleaningData If true, inserts the HTML string without refining it with core.cleanHTML.
   * @param checkCharCount f true, if "options.maxCharCount" is exceeded when "element" is added, null is returned without addition.
   * @param rangeSelection If true, range select the inserted node.
   */
  public insertHTML(
    html: string | Element,
    notCleaningData?: boolean | undefined,
    checkCharCount?: boolean | undefined,
    rangeSelection?: boolean | undefined
  ) {
    this.editor.insertHTML(
      html,
      notCleaningData,
      checkCharCount,
      rangeSelection
    );
  }

  /**
   * Change the contents of the suneditor
   * @param contents Contents to Input
   */
  public setContents(contents: string) {
    this.editor.setContents(contents);
  }

  /**
   * Add contents to the suneditor
   * @param contents Contents to Input
   */
  public appendContents(contents: string) {
    this.editor.appendContents(contents);
  }

  /**
   * Switch to or off "ReadOnly" mode.
   * @param value "readOnly" boolean value.
   */
  public readOnly(value: boolean) {
    this._readonly = value;
    this.editor.readOnly(value);
  }

  /**
   * Returns the readonly state of the SunEditor
   * @returns boolean
   */
  public isReadOnly() {
    return this._readonly;
  }

  /**
   * Disable the suneditor
   */
  public disabled() {
    this._disabled = true;
    this.editor.disable();
  }

  /**
   * Returns the disabled state of the SunEditor
   * @returns boolean
   */
  public isDisabled() {
    return this._disabled;
  }

  /**
   * Enable the suneditor
   */
  public enabled() {
    this._disabled = false;
    this.editor.enable();
  }

  /**
   * Show the editor
   */
  public show() {
    this._hidden = false;
    this.editor.show();
  }

  /**
   * Hide the editor
   */
  public hide() {
    this._hidden = true;
    this.editor.hide();
  }

  /**
   * Returns the hidden state of the editor
   * @returns boolean
   */
  public isHidden() {
    return this._hidden;
  }

  /**
   * Add or remove the class name of "body" so that the code block is visible
   */
  public toggleDisplayBlocks() {
    this.editor.core.toggleDisplayBlocks();
    this._displayBlocks = !this._displayBlocks;
  }

  /**
   * Returns the displayBlocks state of the editor
   * @returns boolean
   */
  public isDisplayBlocks() {
    return this._displayBlocks;
  }

  /**
   * Changes to code view or wysiwyg view
   */
  public toggleCodeViewMode() {
    this.editor.core.toggleCodeView();
    this._codeView = !this._codeView;
  }

  /**
   * Returns the CodeViewMode state of the editor
   * @returns boolean
   */
  public isCodeViewMode() {
    return this._codeView;
  }

  /**
   * Undo changes
   */
  public undo() {
    this.editor.core.history.undo();
  }

  /**
   * Redo changes
   */
  public redo() {
    this.editor.core.history.redo();
  }

  /**
   * Remove format of the currently selected range
   */
  public removeFormat() {
    this.editor.core.removeFormat();
  }

  /**
   * Prints the current contents of the editor.
   */
  public print() {
    this.editor.core.print();
  }

  /**
   * Open a new tab as preview window.
   */
  public preview() {
    this.editor.core.preview();
  }

  /**
   * Get the actual history Stack
   * @returns any[]
   */
  public getHistory() {
    return this.editor.core.history.stack;
  }

  /**
   * Select all in the editor
   */
  public selectAll() {
    this.commandHandler(null, 'selectAll');
  }

  /**
   * Get window selection obejct
   * @returns Selection
   */
  public getSelection() {
    return this.editor.core.getSelection();
  }

  /**
   * Set the editor in loading mode. Show a loading spinner, disable inputs and grey out
   */
  public showLoading() {
    this._loading = true;
    this.editor.core.showLoading();
  }

  /**
   * Remove the loading mode
   */
  public closeLoading() {
    this._loading = false;
    this.editor.core.closeLoading();
  }

  /**
   * Returns the loading state of the SunEditor
   * @returns boolean
   */
  public isLoading() {
    return this._loading;
  }

  /**
   * Enabled submenu
   * @param element Submenu's button element to call
   */
  public submenuOn(element: Element) {
    this.editor.core.submenuOn(element);
  }

  /**
   * Disable submenu
   */
  public submenuOff() {
    this.editor.core.submenuOff();
  }

  /**
   * Enabled container
   * @param element Container's button element to call
   */
  public containerOn(element: Element) {
    this.editor.core.containerOn(element);
  }

  /**
   * Disable container
   */
  public containerOff() {
    this.editor.core.containerOff();
  }

  /**
   * Append the className value of the argument value element
   * @param element Elements to add class name
   * @param className Class name to be add
   */
  public addClass(element: Element, className: string) {
    this.editor.util.addClass(element, className);
  }

  /**
   * Class name to be add
   * @param element Elements to remove class name
   * @param className Class name to be remove
   */
  public removeClass(element: Element, className: string) {
    this.editor.util.removeClass(element, className);
  }

  /**
   * Set style, if all styles are deleted, the style properties are deleted
   * @param element Element to set style
   * @param styleName Style attribute name (marginLeft, textAlign...)
   * @param value Style value
   */
  public setStyle(
    element: Element,
    styleName: string,
    value: string | number
  ) {
    this.editor.util.setStyle(element, styleName, value);
  }

  /**
   * Add an event to document. When created as an Iframe, the same event is added to the document in the Iframe.
   * @param type event type
   * @param listener listener
   * @param useCapture boolean
   */
  public addDocEvent(
    type: string,
    listener: EventListener,
    useCapture: boolean
  ) {
    this.editor.core.addDocEvent(type, listener, useCapture);
  }

  /**
   * Remove events from document.   * When created as an Iframe, the event of the document inside the Iframe is also removed
   * @param type Event type
   * @param listener Event listener
   */
  public removeDocEvent(type: string, listener: EventListener) {
    this.editor.core.removeDocEvent(type, listener);
  }

  /**
   * Run plugin calls and basic commands.
   * @param command Command string
   * @param display Display type string ('command', 'submenu', 'dialog', 'container')
   * @param target The element of command button
   */
  public actionCall(
    command: string,
    display: 'dialog' | 'command' | 'submenu' | 'container',
    target: Element
  ) {
    this.editor.core.actionCall(command, display, target);
  }

  /**
   * Set indentation separator "indent" or "outdent"
   * @param command 'indent' | 'outdent'
   */
  public indent_outdent(command: 'indent' | 'outdent') {
    this.commandHandler(null, command);
  }

  /**
   * Display blocks in the editor
   */
  public showBlocks() {
    const element = document.querySelector('[data-command="showBlocks"]');
    if (element) {
      this.commandHandler(element, 'showBlocks');
    }
  }

  /**
   * Toggle the editor fullscreen mode
   */
  public toggleFullScreenMode() {
    const element = document.querySelector('[data-command="fullScreen"]');
    if (element) {
      this.commandHandler(element, 'fullScreen');
    }
    this._fullScreenMode = !this._fullScreenMode;
  }

  /**
   * Returns the fullScreenMode state of the editor
   * @returns boolean
   */
  public isFullScreenMode() {
    return this._fullScreenMode;
  }

  /**
   * Execute command of command button(All Buttons except submenu and dialog)
   * (undo, redo, bold, underline, italic, strikethrough, subscript, superscript, removeFormat,
   * indent, outdent, fullscreen, showBlocks, codeview, preview, print, copy, cut, paste)
   * @param element The element of command button
   * @param command Property of command button (data-value)
   */
  public commandHandler(element: Element | null, command: commands) {
    this.editor.core.commandHandler(element, command);
  }

  /**
   * loads the localStorageContent to the Editor
   */
  public loadLocalStorageContent() {
    const localStorageContent = localStorage.getItem(this.localStorageId);
    this.setContents(localStorageContent);
  }

  /**
   * Save Content to LocalStorage
   */
  public saveToLocalStorage() {
    localStorage.setItem(this.localStorageId, this._content);
  }

  /**
   * returns the LocalStorageKey
   */
  public getLocalStorageKey() {
    return this.localStorageId;
  }

  /**
   * returns AutoSaveToLocalStorage
   */
  public getIsAutoSaveToLocalStorage() {
    return this.isAutoSaveToLocalStorage;
  }

  /**
   * returns AutoLoadToLocalStorage
   */
  public getIsAutoLoadToLocalStorage() {
    return this.isAutoSaveToLocalStorage;
  }

  private registerEvents() {
    this.editor.onload = (core, reload) => {
      this.onload.emit({core, reload});
    };
    this.editor.onScroll = (e, core) => {
      this.onScroll.emit({e, core});
    };
    this.editor.onMouseDown = (e, core) => {
      this.onMouseDown.emit({e, core});
    };
    this.editor.onClick = (e, core) => {
      this.onClick.emit({e, core});
    };
    this.editor.onInput = (e, core) => {
      this.onInput.emit({e, core});
    };
    this.editor.onKeyDown = (e, core) => {
      this.onKeyDown.emit({e, core});
    };
    this.editor.onKeyUp = (e, core) => {
      this.onKeyUp.emit({e, core});
    };
    this.editor.onChange = (content, core) => {
      this._content = content;
      this.onChange.emit({content: this._content, core});
      if (this.isAutoSaveToLocalStorage) {
        this.saveToLocalStorage();
      }
    };
    this.editor.onFocus = (e, core) => {
      this.onFocus.emit({e, core});
    };
    this.editor.showController = (name, controllers, core) => {
      this.showController.emit({name, controllers, core});
    };
    this.editor.toggleFullScreen = (isFullScreen, core) => {
      this.toggleFullScreen.emit({isFullScreen, core});
    };
    this.editor.toggleCodeView = (isCodeView, core) => {
      this.toggleCodeView.emit({isCodeView, core});
    };
    this.editor.showInline = (toolbar, context, core) => {
      this.showInline.emit({toolbar, context, core});
    };
    this.editor.onBlur = (e, core) => {
      this.onBlur.emit({e, core});
    };
    this.editor.onAudioUpload = (
      targetElement,
      index,
      state,
      info,
      remainingFilesCount,
      core
    ) => {
      this.onAudioUpload.emit({
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core,
      });
    };
    this.editor.onVideoUpload = (
      targetElement,
      index,
      state,
      info,
      remainingFilesCount,
      core
    ) => {
      this.onVideoUpload.emit({
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core,
      });
    };
    this.editor.onImageUpload = (
      targetElement,
      index,
      state,
      info,
      remainingFilesCount,
      core
    ) => {
      this.onImageUpload.emit({
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core,
      });
    };
    // This functions needs to return a boolean. The type definition is wrong here.
    // https://github.com/JiHong88/SunEditor/pull/810
    this.editor.onCut = (e, clipboardData, core) => {
      this.onCut.emit({e, clipboardData, core});
      return this.onCut_param;
    };
    // This functions needs to return a boolean. The type definition is wrong here.
    // https://github.com/JiHong88/SunEditor/pull/810
    this.editor.onCopy = (e, clipboardData, core) => {
      this.onCopy.emit({e, clipboardData, core});
      return this.onCopy_param;
    };
    this.editor.onDrop = (
      e: Event,
      cleanData: string,
      maxCharCount: number,
      core: Core
    ) => {
      this.onDrop.emit({e, cleanData, maxCharCount, core});
      return this.onDrop_param;
    };
    this.editor.onAudioUploadError = (
      errorMessage: string,
      result: any,
      core: Core
    ) => {
      this.onAudioUploadError.emit({errorMessage, result, core});
      return this.onAudioUploadError_param;
    };
    this.editor.onImageUploadBefore = (
      files: any[],
      info: imageInputInformation,
      core: Core,
      uploadHandler: Function
    ) => {
      this.onImageUploadBefore.emit({files, info, core, uploadHandler});
      return this.onImageUploadBefore_param;
    };
    this.editor.onImageUploadError = (
      errorMessage: string,
      result: any,
      core: Core
    ) => {
      this.onImageUploadError.emit({errorMessage, result, core});
      return this.onImageUploadError_param;
    };
    this.editor.onVideoUploadBefore = (
      files: any[],
      info: videoInputInformation,
      core: Core,
      uploadHandler: Function
    ) => {
      this.onVideoUploadBefore.emit({files, info, core, uploadHandler});
      return this.onVideoUploadBefore_param;
    };
    this.editor.onVideoUploadError = (
      errorMessage: string,
      result: any,
      core: Core
    ) => {
      this.onVideoUploadError.emit({errorMessage, result, core});
      return this.onVideoUploadError_param;
    };
    this.editor.onAudioUploadBefore = (
      files: any[],
      info: audioInputInformation,
      core: Core,
      uploadHandler: Function
    ) => {
      this.onAudioUploadBefore.emit({files, info, core, uploadHandler});
      return this.onAudioUploadBefore_param;
    };
    this.editor.onResizeEditor = (
      height: number,
      prevHeight: number,
      core: Core
    ) => {
      this.onResizeEditor.emit({height, prevHeight, core});
      return this.onResizeEditor_param;
    };
  }

  private generateID() {
    const min = Math.ceil(1);
    const max = Math.floor(100000);
    return `ngxsuneditor_${(
      Math.floor(Math.random() * (max - min)) + min
    ).toString()}`;
  }
}
