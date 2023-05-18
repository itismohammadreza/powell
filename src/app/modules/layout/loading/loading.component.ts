import {Component} from '@angular/core';
import {LoaderService} from '@core/utils';

@Component({
  selector: 'ng-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
})
export class LoadingComponent {
  loading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.getLoadingState().subscribe(loading => {
      this.loading = loading;
    });
  }
}
