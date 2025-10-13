import {HttpClient, HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';
import {inject} from "@angular/core";
import {Observable} from 'rxjs';
import {EnvService} from "@core/utils";
import {RequestMethod} from "@core/models";

interface RequestOptions {
  headers?: HttpHeaders | {[header: string]: string | string[]};
  context?: HttpContext;
  observe?: SafeAny;
  params?: HttpParams | {[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;};
  reportProgress?: boolean;
  responseType?: SafeAny;
  withCredentials?: boolean;
}

export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly envService = inject(EnvService);
  private readonly baseUrl = this.envService.apiUrl;

  protected _get<T>(endpoint: string, options: Optional<RequestOptions> = undefined) {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _post<T>(endpoint: string, body: SafeAny, options: Optional<RequestOptions> = undefined) {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _put<T>(endpoint: string, body: SafeAny, options: Optional<RequestOptions> = undefined) {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _patch<T>(endpoint: string, body: SafeAny, options: Optional<RequestOptions> = undefined) {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _delete<T>(endpoint: string, options: Optional<RequestOptions> = undefined) {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _customRequest<T>(url: string, method: RequestMethod, body: SafeAny = undefined, options: Optional<RequestOptions> = undefined): Observable<T> {
    const opts = {
      ...options,
      params: this.getHttpParams(options?.params)
    };

    switch (method.toLowerCase()) {
      case 'get':
        return this.http.get<T>(url, opts);
      case 'delete':
        return this.http.delete<T>(url, opts);
      case 'post':
        return this.http.post<T>(url, body, opts);
      case 'put':
        return this.http.put<T>(url, body, opts);
      case 'patch':
        return this.http.patch<T>(url, body, opts);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  protected _getFormData(obj: SafeAny, excludes: string[] = []) {
    const formData = new FormData();
    for (const key in obj) {
      const value = obj[key];
      if (Array.isArray(value)) {
        // typeof Array
        for (let i = 0; i < value.length; i++) {
          formData.append(key + '[' + i + ']', value[i]);
        }
      } else if (typeof value === 'object' && excludes.indexOf(key) === -1) {
        // typeof Object
        if (value instanceof Date) {
          value.setHours(0, -value.getTimezoneOffset(), 0, 0);
          formData.append(key, (value as Date).toISOString());
        } else {
          for (const subkey in value) {
            formData.append(`${key}[${subkey}]`, value[subkey]);
          }
        }
      } else {
        // typeof Regular
        formData.append(key, value);
      }
    }
    return formData;
  }

  private getHttpParams(params: SafeAny) {
    let httpParams: HttpParams = new HttpParams();
    if (params) {
      Object.keys(params).map((x: string) => {
        httpParams = httpParams.set(x, params[x]);
      });
    }
    return httpParams;
  }
}
