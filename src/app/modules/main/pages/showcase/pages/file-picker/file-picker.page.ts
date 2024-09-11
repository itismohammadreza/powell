import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgFilePickerMode, NgFixLabelPosition} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-file-picker-page',
  templateUrl: './file-picker.page.html',
  styleUrls: ['./file-picker.page.scss'],
})
export class FilePickerPage {
  private configService = inject(ConfigService);

  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.get().rtl;
  showRequiredStar: boolean = this.configService.get().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.get().fixLabelPos;
  followConfig: boolean = this.configService.get().followConfig;
  // native properties
  multiple: boolean = true;
  accept: string = 'image/*';
  disabled: boolean = false;
  auto: boolean = false;
  maxFileSize: number = 1000000;
  fileLimit: number = 0;
  previewWidth: number = 50;
  chooseLabel: string = 'انتخاب';
  uploadLabel: string = 'آپلود';
  cancelLabel: string = 'انصراف';
  chooseIcon: string = 'pi pi-plus';
  uploadIcon: string = 'pi pi-upload';
  cancelIcon: string = 'pi pi-times';
  mode: NgFilePickerMode = 'advanced';
  showUploadButton: boolean = true;
  showCancelButton: boolean = true;
}
