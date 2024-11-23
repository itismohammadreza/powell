import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgFixLabelPosition} from "@powell/models";
import {ConfigService} from "@powell/api";
import {IranMapModule} from "@powell/components/iran-map";
import {ExtrasModule} from "@modules/main/pages/showcase/extras.module";
import {
  PreviewOptionsComponent
} from "@modules/main/pages/showcase/components/preview-options/preview-options.component";

@Component({
  selector: 'ng-iran-map-page',
  templateUrl: './iran-map.page.html',
  styleUrls: ['./iran-map.page.scss'],
  imports: [
    IranMapModule,
    ReactiveFormsModule,
    ExtrasModule,
    PreviewOptionsComponent
  ]
})
export class IranMapPage {
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
  disabled: boolean = false;
  followConfig: boolean = this.configService.get().followConfig;
  selectionLimit: number = 31;
  multiple: boolean = false;
  async: boolean = false;

  onChangeAsync({loadingCallback}) {
    setTimeout(() => {
      loadingCallback()
    }, 3000)
  }
}
