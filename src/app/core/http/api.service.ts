import {HttpClient, HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';
import {inject} from "@angular/core";
import {Observable} from 'rxjs';
import {EnvService} from "@core/utils";
import {RequestMethod} from "@core/models";

interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  context?: HttpContext;
  observe?: any;
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}

export class ApiService {
  private readonly http: HttpClient;
  private readonly baseUrl: string;

  constructor() {
    const envService = inject(EnvService);
    this.http = inject(HttpClient);
    this.baseUrl = envService.apiUrl;
  }

  protected _get<T>(endpoint: string, options: RequestOptions = null) {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _post<T>(endpoint: string, body: any, options: RequestOptions = null) {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _put<T>(endpoint: string, body: any, options: RequestOptions = null) {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _patch<T>(endpoint: string, body: any, options: RequestOptions = null) {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _delete<T>(endpoint: string, options: RequestOptions = null) {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      ...options,
      params: this.getHttpParams(options?.params)
    })
  }

  protected _customRequest<T>(url: string, method: RequestMethod, body: any = null, options: RequestOptions = null): Observable<T> {
    switch (method.toLowerCase()) {
      case 'get':
      case 'delete':
        return this.http[method.toLowerCase()]<T>(url, {
          ...options,
          params: this.getHttpParams(options?.params)
        })
      case 'post':
      case 'put':
      case 'patch':
        return this.http[method.toLowerCase()]<T>(url, body, {
          ...options,
          params: this.getHttpParams(options?.params)
        })
    }
  }

  protected _getFormData(obj: any, excludes: string[] = []) {
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

  private getHttpParams(params: any) {
    let httpParams: HttpParams = new HttpParams();
    if (params) {
      Object.keys(params).map((x: string) => {
        httpParams = httpParams.set(x, params[x]);
      });
    }
    return httpParams;
  }
}
