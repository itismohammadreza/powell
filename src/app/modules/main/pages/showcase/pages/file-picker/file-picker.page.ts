import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgFilePickerMode, NgFixLabelPosition} from '@powell/models';
import {ConfigService} from "@powell/api";

@Component({
  selector: 'ng-file-picker-page',
  templateUrl: './file-picker.page.html',
  styleUrls: ['./file-picker.page.scss'],
})
export class FilePickerPage {
  form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  binding;

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.configService.getConfig().rtl;
  showRequiredStar: boolean = this.configService.getConfig().showRequiredStar;
  labelPos: NgFixLabelPosition = this.configService.getConfig().fixLabelPos;
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
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

  constructor(private configService: ConfigService) {
  }
}
