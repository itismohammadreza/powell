import {Component} from '@angular/core';
import {LoaderService} from '@core/utils';

@Component({
  selector: 'ng-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  loading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.getLoadingState().subscribe((v) => {
      this.loading = v;
    });
  }
}
