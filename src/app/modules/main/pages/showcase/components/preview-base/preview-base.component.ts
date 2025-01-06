import {Component, inject, OnInit} from '@angular/core';
import {ConfigService, OverlayService} from "@powell/api";
import {PreviewOption} from "@modules/main/pages/showcase/components";
import {NgAsyncEvent} from "@powell/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ng-preview-base',
  template: '',
})
export abstract class PreviewBase implements OnInit {
  private configService = inject(ConfigService);
  protected overlayService = inject(OverlayService);
  protected previewOptions: PreviewOption[] = [];
  protected cmpRef: any;
  protected config = this.configService.get();
  protected asyncFlag = false;
  protected form = new FormGroup({
    c1: new FormControl(null, [Validators.required]),
  });
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

  ngOnInit() {
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
    if (this.cmpRef) {
      this.cmpRef[event.field] = event.value;
    }
  }
}
