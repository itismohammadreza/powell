import {HttpRequest, HttpResponseBase} from '@angular/common/http';
import {RequestConfig} from '@core/models';
import {RequestsConfig} from '@core/config';

export const httpUtils = {
  getRequestConfig: (request: HttpRequest<SafeAny>) => {
    const {pathname} = httpUtils.getUrlParts(request.url);
    const requestPathMatch = ({pathTemplate, isCustomApi}: RequestConfig) => {
      const testCase = isCustomApi ? request.urlWithParams : pathname;
      if (pathTemplate instanceof RegExp) {
        return pathTemplate.test(testCase);
      } else if (pathTemplate?.includes('*')) {
        const rep1 = pathTemplate.replace(/\*/g, '.*');
        const rep2 = rep1.replace(/\//g, "\\\/");
        const regex = new RegExp(rep2, 'g');
        return regex.test(testCase);
      } else {
        return pathTemplate == testCase;
      }
    }
    const idx = RequestsConfig.findIndex(config => {
      const requestMethodMatch = config.method === request.method;
      return requestMethodMatch && requestPathMatch(config);
    });
    return RequestsConfig[idx];
  },

  getUrlParts: (url: string) => {
    const linkElement = document.createElement('a');
    const keys: (keyof HTMLAnchorElement)[] = [
      'href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'
    ];
    const res: SafeAny = {};
    linkElement.href = url;
    keys.forEach((k) => {
      res[k] = linkElement[k];
    });
    linkElement.remove();
    return res;
  },

  getRequestProp: (request: HttpRequest<SafeAny>, response: Optional<HttpResponseBase>, prop: keyof RequestConfig) => {
    const requestConfig: SafeAny = httpUtils.getRequestConfig(request);
    if (!requestConfig) {
      return false;
    }
    if (typeof requestConfig[prop] === 'function') {
      return requestConfig[prop](request, response);
    } else {
      return requestConfig[prop];
    }
  }
}
