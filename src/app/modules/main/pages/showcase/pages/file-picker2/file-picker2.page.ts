import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgSeverity, NgFixLabelPosition} from '@powell/models';
import {ConfigService} from "@powell/api";
import {FilePicker2Module} from "@powell/components/file-picker2";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-file-picker2-page',
  templateUrl: './file-picker2.page.html',
  styleUrls: ['./file-picker2.page.scss'],
  imports: [
    FilePicker2Module,
    ReactiveFormsModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class FilePicker2Page {
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
  disabled: boolean = false;
  readonly: boolean = false;
  multiple: boolean = true;
  accept: string = '';
  severity: NgSeverity = 'primary';
  fileLimit: number = 20000;
  chooseLabel: string = 'انتخاب';
}
