import {Component, inject, OnInit} from '@angular/core';
import {LoaderService} from '@core/utils';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {
  private loaderService = inject(LoaderService);

  loading: boolean;

  ngOnInit() {
    this.loaderService.getLoadingState().subscribe(loading => {
      this.loading = loading;
    });
  }
}
