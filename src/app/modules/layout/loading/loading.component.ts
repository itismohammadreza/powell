import {Component, inject, OnInit} from '@angular/core';
import {LoaderService} from '@core/utils';
import {NgClass} from "@angular/common";

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [
    NgClass
  ]
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
