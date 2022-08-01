import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subscriber} from 'rxjs';
import {LoaderService} from '@core/utils';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) {
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.params.get('loading')?.toLocaleLowerCase() == 'false') {
      this.loaderService.isLoading.next(false);
    } else {
      this.requests.push(req);
      this.loaderService.isLoading.next(true);
    }

    return new Observable(
      (observer: Subscriber<HttpEvent<any>>): (() => void) => {
        const subscription = next.handle(req).subscribe(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          (err: any) => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          }
        );
        return (): void => {
          this.removeRequest(req);
          subscription.unsubscribe();
        };
      }
    );
  }
}
