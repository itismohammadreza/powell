import {Component, Input} from '@angular/core';

@Component({
  selector: 'ng-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent {
  @Input() message: string = 'موردی وجود ندارد.';
}
