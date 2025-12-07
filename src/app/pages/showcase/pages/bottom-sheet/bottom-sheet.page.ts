import {ChangeDetectorRef, Component, inject, QueryList, ViewChildren} from '@angular/core';
import {BottomSheetComponent, BottomSheetModule} from "@powell/components/bottom-sheet";
import {ButtonModule} from "@powell/components/button";
import {PreviewBase, PreviewComponent, PreviewOption} from "@pages/showcase/components";

@Component({
  selector: 'app-bottom-sheet-page',
  templateUrl: './bottom-sheet.page.html',
  imports: [
    BottomSheetModule,
    ButtonModule,
    PreviewComponent
  ]
})
export class BottomSheetPage extends PreviewBase {
  @ViewChildren(BottomSheetComponent) cmpRefs: QueryList<BottomSheetComponent>;
  private cd = inject(ChangeDetectorRef);
  override previewOptions: PreviewOption[] = [
    {field: 'rtl', value: this.config.rtl},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'blockScroll', value: false},
    {field: 'modal', value: true},
    {field: 'dismissible', value: true},
    {field: 'closeOnEscape', value: true},
    {field: 'fullScreen', value: false},
    {field: 'header', value: 'BottomSheet Header'},
    {field: 'closable', value: true},
  ];

  visible = false;
  visible2 = false;
  visible3 = false;
  visible4 = false;

  override onOptionChange(event: PreviewOption) {
    this.cmpRefs.forEach(cmp => {
      cmp[event.field] = event.value;
    })
  }

  async openDialog() {
    await this.overlayService.showConfirmDialog({message: 'Show another?'})
    this.visible4 = true;
    this.cd.detectChanges();
  }
}
