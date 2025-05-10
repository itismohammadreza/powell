import {AfterViewInit, Component, inject} from '@angular/core';
import {ConfigService, OverlayService} from "@powell/api";
import {PreviewOption} from "@modules/main/pages/showcase/components/index";
import {NgAsyncEvent} from "@powell/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ng-preview-base',
  template: '',
})
export abstract class PreviewBase implements AfterViewInit {
  private configService = inject(ConfigService);
  protected overlayService = inject(OverlayService);
  protected previewOptions: PreviewOption[] = [];
  protected cmpRef: any;
  protected config = this.configService.get();
  protected asyncFlag = false;
  protected render = true;
  protected form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
  protected additions = {
    addonStart: false,
    addonEnd: false,
    iconStart: false,
    iconEnd: false,
  }
  protected options: any[] = [
    {label: 'Australia', value: 'AU'},
    {label: 'Brazil', value: 'BR'},
    {label: 'China', value: 'CN'},
    {label: 'Egypt', value: 'EG'},
    {label: 'France', value: 'FR'},
    {label: 'Germany', value: 'DE'},
    {label: 'India', value: 'IN'},
    {label: 'Japan', value: 'JP'},
    {label: 'Spain', value: 'ES'},
    {label: 'United States', value: 'US'}
  ];

  ngAfterViewInit() {
    if (this.cmpRef) {
      this.previewOptions.forEach(item => {
        this.cmpRef[item.field] = item.value
      })
    }
  }

  onChangeAsync({loadingCallback}: NgAsyncEvent<any>) {
    this.asyncFlag = !this.asyncFlag;
    setTimeout(() => {
      loadingCallback(this.asyncFlag)
    }, 3000)
  }

  onOptionChange(event: any) {
    this.form.get('c1').markAsPristine();
    this.form.get('c1').markAsUntouched();
    const {field, value} = event;
    if (field === 'additions') {
      this.additions = {
        addonStart: false,
        addonEnd: false,
        iconStart: false,
        iconEnd: false,
      }
      switch (value) {
        case 'none':
          break;
        case 'addonBoth':
          this.additions = {
            addonStart: true,
            addonEnd: true,
            iconStart: false,
            iconEnd: false,
          }
          break;
        case 'iconBoth':
          this.additions = {
            addonStart: false,
            addonEnd: false,
            iconStart: true,
            iconEnd: true,
          }
          break;
        default:
          this.additions[value] = true
          break;
      }
      this.reRenderComponent();
      return
    }
    if (this.cmpRef) {
      this.cmpRef[field] = value;
    }
    this.previewOptions.find(option => option.field === field).value = value;
  }

  reRenderComponent() {
    this.render = false;
    setTimeout(() => {
      this.render = true;
      setTimeout(() => {
        this.ngAfterViewInit();
      });
    }, 5);
  }

  getOption(key: string) {
    return this.previewOptions.find(option => option.field === key).value;
  }
}
