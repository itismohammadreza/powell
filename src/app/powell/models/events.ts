import {
  audioInputInformation,
  Controllers,
  Core,
  fileInfo,
  imageInputInformation,
  videoInputInformation
} from "suneditor/src/lib/core";
import {Context} from "suneditor/src/lib/context";

export type LoadingCallback = (toggle?: boolean) => any;
export type FilePickerSelectEvent = (string | ArrayBuffer | File) | (string | ArrayBuffer | File)[];
export type FilePickerRemoveEvent = (string | ArrayBuffer | File) | void;

export interface AsyncEvent<T = void> {
  event: T;
  loadingCallback: LoadingCallback;
}

export interface EditorOnResizeEditor {
  height: number;
  prevHeight: number;
  core: Core;
}

export interface MapChangeEvent {
  originalEvent: MouseEvent;
  value: number | number[];
}

export interface EditorOnAudioUploadBefore {
  files: any[];
  info: audioInputInformation;
  core: Core;
  uploadHandler: Fn;
}

export interface EditorOnVideoUploadError {
  errorMessage: string;
  result: any;
  core: Core;
}

export interface EditorOnVideoUploadBefore {
  files: any[];
  info: videoInputInformation;
  core: Core;
  uploadHandler: Fn;
}

export interface EditorOnImageUploadError {
  errorMessage: string;
  result: any;
  core: Core;
}

export interface EditorOnImageUploadBefore {
  files: any[];
  info: imageInputInformation;
  core: Core;
  uploadHandler: Fn;
}

export interface EditorOnAudioUploadError {
  errorMessage: string;
  result: any;
  core: Core;
}

export interface EditorOnDrop {
  e: Event;
  cleanData: string;
  maxCharCount: number;
  core: Core;
}

export interface EditorOnChange {
  content: string;
  core: Core;
}

export interface EditorShowController {
  name: String;
  controllers: Controllers;
  core: Core;
}

export interface EditorToggleFullScreen {
  isFullScreen: boolean;
  core: Core;
}

export interface EditorToggleCodeView {
  isCodeView: boolean;
  core: Core;
}

export interface EditorShowInline {
  toolbar: Element;
  context: Context;
  core: Core;
}

export interface EditorOnAudioUpload {
  targetElement: HTMLAudioElement;
  index: number;
  state: string;
  info: fileInfo;
  remainingFilesCount: number;
  core: Core;
}

export interface EditorOnVideoUpload {
  targetElement: HTMLIFrameElement | HTMLVideoElement;
  index: number;
  state: string;
  info: fileInfo;
  remainingFilesCount: number;
  core: Core;
}

export interface EditorOnImageUpload {
  targetElement: HTMLImageElement;
  index: number;
  state: string;
  info: fileInfo;
  remainingFilesCount: number;
  core: Core;
}

export interface EditorOnCut {
  e: Event;
  clipboardData: any;
  core: Core;
}

export interface EditorOnCopy {
  e: Event;
  clipboardData: any;
  core: Core;
}

export interface EditorEvent {
  e: Event;
  core: Core
}

export interface EditorOnLoadEvent {
  core: Core;
  reload: boolean
}
