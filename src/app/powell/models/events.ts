import {
  audioInputInformation,
  Controllers,
  Core,
  fileInfo,
  imageInputInformation,
  videoInputInformation
} from "suneditor/src/lib/core";
import {Context} from "suneditor/src/lib/context";

export type NgLoadingCallback = (ok?: boolean) => any;
export type NgFilePickerSelectEvent = (string | ArrayBuffer | File) | (string | ArrayBuffer | File)[];
export type NgFilePickerRemoveEvent = (string | ArrayBuffer | File) | void;

export interface NgAsyncEvent<T = void> {
  event: T;
  loadingCallback: NgLoadingCallback;
}

export interface NgEditorOnResizeEditor {
  height: number;
  prevHeight: number;
  core: Core;
}

export interface NgMapChangeEvent {
  originalEvent: MouseEvent;
  value: number | number[];
}

export interface NgEditorOnAudioUploadBefore {
  files: any[];
  info: audioInputInformation;
  core: Core;
  uploadHandler: Function;
}

export interface NgEditorOnVideoUploadError {
  errorMessage: string;
  result: any;
  core: Core;
}

export interface NgEditorOnVideoUploadBefore {
  files: any[];
  info: videoInputInformation;
  core: Core;
  uploadHandler: Function;
}

export interface NgEditorOnImageUploadError {
  errorMessage: string;
  result: any;
  core: Core;
}

export interface NgEditorOnImageUploadBefore {
  files: any[];
  info: imageInputInformation;
  core: Core;
  uploadHandler: Function;
}

export interface NgEditorOnAudioUploadError {
  errorMessage: string;
  result: any;
  core: Core;
}

export interface NgEditorOnDrop {
  e: Event;
  cleanData: string;
  maxCharCount: number;
  core: Core;
}

export interface NgEditorOnChange {
  content: string;
  core: Core;
}

export interface NgEditorShowController {
  name: String;
  controllers: Controllers;
  core: Core;
}

export interface NgEditorToggleFullScreen {
  isFullScreen: boolean;
  core: Core;
}

export interface NgEditorToggleCodeView {
  isCodeView: boolean;
  core: Core;
}

export interface NgEditorShowInline {
  toolbar: Element;
  context: Context;
  core: Core;
}

export interface NgEditorOnAudioUpload {
  targetElement: HTMLAudioElement;
  index: number;
  state: string;
  info: fileInfo;
  remainingFilesCount: number;
  core: Core;
}

export interface NgEditorOnVideoUpload {
  targetElement: HTMLIFrameElement | HTMLVideoElement;
  index: number;
  state: string;
  info: fileInfo;
  remainingFilesCount: number;
  core: Core;
}

export interface NgEditorOnImageUpload {
  targetElement: HTMLImageElement;
  index: number;
  state: string;
  info: fileInfo;
  remainingFilesCount: number;
  core: Core;
}

export interface NgEditorOnCut {
  e: Event;
  clipboardData: any;
  core: Core;
}

export interface NgEditorOnCopy {
  e: Event;
  clipboardData: any;
  core: Core;
}

export interface NgEditorEvent {
  e: Event;
  core: Core
}

export interface NgEditorOnLoadEvent {
  core: Core;
  reload: boolean
}
