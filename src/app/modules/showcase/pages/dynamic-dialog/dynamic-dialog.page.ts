import {Component, OnInit} from '@angular/core';
import {DynamicDialogService} from '@ng/services/dynamic-dialog.service';
import {DynamicDialogSampleComponent} from '@modules/showcase/components/dynamic-dialog-sample/dynamic-dialog-sample.component';

@Component({
  selector: 'ng-dynamic-dialog-page',
  templateUrl: './dynamic-dialog.page.html',
  styleUrls: ['./dynamic-dialog.page.scss']
})
export class DynamicDialogPage implements OnInit {

  constructor(private dialog: DynamicDialogService) {
  }

  dialogResult: any;

  ngOnInit(): void {
  }


  open() {
    const ref = this.dialog.open(DynamicDialogSampleComponent, {data: {message: 'I am a dynamic component inside of a dialog!'}});

    ref.afterClosed.subscribe(result => {
      this.dialogResult = result;
    });
  }

}
