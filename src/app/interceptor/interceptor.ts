import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  USER_KEY = 'auth';
  user : any
  constructor() {
  
   }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('my interceptor work');
    this.user = window.sessionStorage.getItem(this.USER_KEY);
    
    const modifiedRequest = request.clone({
      headers: request.headers.set('x-access-token', `${this.user}`)
    });
    return next.handle(modifiedRequest);
  }
}