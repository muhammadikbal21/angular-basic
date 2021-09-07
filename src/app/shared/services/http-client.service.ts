import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class HttpClientService {
  constructor(private readonly http: HttpClient) {}

  private getEndpointUrl(endpoint: string, params?: Params): string {
    const apiUrl = env.apiUrl;
    const endpoints: { [key: string]: string } = env.apiEndpoints;
    const endpointUrl = endpoints[ endpoint ];

    if (!endpointUrl) throw Error(`Invalid endpoint ${endpoint} code.`);

    let url: string = `${apiUrl}/${endpointUrl}`;

    if (params) {
        /**
         * Men-translate todos/:id menjadi todos/1 (contohnya)
         * - :username => tono
         * - :status => active / inactive
         * { id: 1 }
         */
        Object.keys(params).forEach((param: string) => {
          const pathVariable: string = `:${param}`; // :id
          if (url.includes(pathVariable)) {
            url = url.replace(pathVariable, params[ param ]);
          }
        });
      }
  
      // /api/todos
      // /api/todos/1?status=2
      return url;
  
  }

  private buildHttpParams(queryParams?: Params): HttpParams {
    const httpParams: HttpParams = new HttpParams();

    if (queryParams) {
      Object.keys(queryParams).forEach((param: string) => {
        httpParams.set(param, queryParams[param]);
      });
    }

    return httpParams;
  }

  // get('GET_ALL_TODOS', undefined, { search: 'makan' })
  get(endpoint: string, params?: Params, queryParams?: Params): Observable<any> {
    const url: string = this.getEndpointUrl(endpoint, params);
    const httpParams: HttpParams = this.buildHttpParams(queryParams);
    const options = {
      params: httpParams
    }

    return this.http.get(url, options)
      .pipe(
        retry(3)
      );
  }


  post(endpoint: string, body: any, params?: Params, queryParams?: Params): Observable<any> {
    const url: string = this.getEndpointUrl(endpoint, params);
    const httpParams: HttpParams = this.buildHttpParams(queryParams);
    const option = {
      params: httpParams,
    };

    return this.http.post(url, body, option)
      .pipe(
        retry(3)
      );
  }

  put(endpoint: string, body: any, params?: Params, queryParams?: Params): Observable<any> {
    const url: string = this.getEndpointUrl(endpoint, params);
    const httpParams: HttpParams = this.buildHttpParams(queryParams);
    const options = {
      params: httpParams
    }

    return this.http.put(url, body, options)
      .pipe(
        retry(3)
      );
  }

  delete(endpoint: string, params?: Params, queryParams?: Params): Observable<any> {
    const url: string = this.getEndpointUrl(endpoint, params);
    const httpParams: HttpParams = this.buildHttpParams(queryParams);
    const options = {
      params: httpParams
    }

    return this.http.delete(url, options)
      .pipe(
        retry(3)
      );
  }

}
