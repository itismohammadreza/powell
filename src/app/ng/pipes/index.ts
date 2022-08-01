import {Type} from '@angular/core';
import {DatePipe} from './date.pipe';
import {DotsPipe} from './dots.pipe';
import {EnToPerNumPipe} from './en-to-per-num.pipe';
import {FileNamePipe} from './file-name.pipe';
import {FilterPipe} from './filter.pipe';
import {IsPerNumPipe} from './is-per-num.pipe';
import {NumtoPerWordPipe} from './num-to-per-word.pipe';
import {PerToEnNumPipe} from './per-to-en-num.pipe';
import {SafePerWordPipe} from './safe-per-word.pipe';
import {SafePipe} from './safe.pipe';
import {ToBase64Pipe} from './to-base64.pipe';
import {MonthTextPipe} from './month-text.pipe';

export const PIPES: Type<any>[] = [
  DotsPipe,
  SafePipe,
  DatePipe,
  FilterPipe,
  FileNamePipe,
  ToBase64Pipe,
  EnToPerNumPipe,
  IsPerNumPipe,
  NumtoPerWordPipe,
  PerToEnNumPipe,
  SafePerWordPipe,
  MonthTextPipe
];
