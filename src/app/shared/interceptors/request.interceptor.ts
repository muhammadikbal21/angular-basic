import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Intercept ${request.method} request to ${request.url}`);
    
    const newRequest: any = request.clone();
    newRequest.headers = request.headers.set('Authorization', 'auth-token-jwt'); // disini kita akan meng-set authorization seperti jwt token

    return next.handle(newRequest);
  }
}
