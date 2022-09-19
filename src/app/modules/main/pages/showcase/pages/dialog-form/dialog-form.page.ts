import {Component, OnInit} from '@angular/core';
import {OverlayService} from "@ng/services";

@Component({
  selector: 'ng-dialog-form-page',
  templateUrl: './dialog-form.page.html',
  styleUrls: ['./dialog-form.page.scss']
})
export class DialogFormPage implements OnInit {

  constructor(private overlayService: OverlayService) {
  }

  ngOnInit(): void {
  }

  flag = false

  showDialogForm() {
    this.overlayService.showDialogForm2().subscribe(res => {
      this.flag = !this.flag;
      setTimeout(() => {
        res.changeDialogVisibilityTo(this.flag)
      }, 2000)
    })
  }
}
