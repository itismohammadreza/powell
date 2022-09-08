import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GlobalConfig} from "@core/global.config";
import {RequestConfig, RequestsConfig} from "@core/requests.config";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  cache = new Map<string, any>();
  catchEnabledApis = RequestsConfig.filter(r => r.catch);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!GlobalConfig.enableCachingApis || request.method !== 'GET') {
      return next.handle(request);
    }
    const {pathname} = this.getUrlParts(request.url);
    const shouldCatch = this.findRequestByPath(this.catchEnabledApis, pathname);

    const cachedResponse = this.cache.get(request.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (shouldCatch) {
            this.cache.set(request.url, event);
          }
        }
      })
    );
  }

  findRequestByPath(targetArray: RequestConfig[], requestPathname) {
    const foundedIndex = targetArray.findIndex(x => {
      if (x.pathTemplate instanceof RegExp) {
        return x.pathTemplate.test(requestPathname)
      } else {
        return x.pathTemplate == requestPathname
      }
    });
    return foundedIndex >= 0
  }

  getUrlParts(url: string) {
    const linkElement = document.createElement('a');
    const res: { [key: string]: string } = {};
    linkElement.href = url;
    ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'].forEach((k) => {
      res[k] = linkElement[k];
    });
    linkElement.remove();
    return res;
  }
}
