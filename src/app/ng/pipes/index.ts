import {Type} from '@angular/core';
import {DatePipe} from './date.pipe';
import {DotsPipe} from './dots.pipe';
import {FileNamePipe} from './file-name.pipe';
import {FilterPipe} from './filter.pipe';
import {SafePipe} from './safe.pipe';
import {ToBase64Pipe} from './to-base64.pipe';
import {LabelStarPipe} from "@ng/pipes/label-star.pipe";

export const PIPES: Type<any>[] = [
  DotsPipe,
  SafePipe,
  DatePipe,
  FilterPipe,
  LabelStarPipe,
  FileNamePipe,
  ToBase64Pipe,
];
