import {HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {NgInputFileMode, NgLabelPosition} from '@ng/models/forms';

@Component({
  selector: 'ng-file-picker-page',
  templateUrl: './file-picker.page.html',
  styleUrls: ['./file-picker.page.scss'],
})
export class FilePickerPage implements OnInit {
  form = new UntypedFormGroup({
    c1: new UntypedFormControl(null, [Validators.required]),
  });
  binding;

  submit() {
  }

  ngOnInit(): void {
  }

  label: string;
  labelWidth: number;
  hint: string;
  rtl: boolean = false;
  showRequiredStar: boolean = true;
  labelPos: NgLabelPosition = 'fix-top';
  disabled: boolean = false;
  name: string;
  url: string;
  multiple: boolean = true;
  withCredentials: boolean = false;
  customUpload: boolean = true;
  auto: boolean = false;
  accept: string = 'image/*, .pdf';
  method: string = 'post';
  maxFileSize: number;
  previewWidth: number = 50;
  fileLimit: number;
  resultType: 'base64' | 'file' = 'file';
  mode: NgInputFileMode = 'advanced';
  chooseLabel: string = 'انتخاب';
  uploadLabel: string = 'آپلود';
  cancelLabel: string = 'انصراف';
  headers: HttpHeaders;
  showUploadButton: boolean = true;
  showCancelButton: boolean = true;
  invalidFileSizeMessageSummary: string = '{0} - سایز فایل نامعتبر است.';
  invalidFileSizeMessageDetail: string = 'حداکثر سایز فایل {0} است.';
  invalidFileTypeMessageSummary: string = '{0} - نوع فایل نامعتبر است.';
  invalidFileLimitMessageDetail: string = 'حداکثر مجاز به انتخاب {0} فایل هستید.';
  invalidFileLimitMessageSummary: string = 'مجاز به انتخاب فایل بیشتری نیستید.';
  invalidFileTypeMessageDetail: string = 'فرمت مجاز : {0}';
}
