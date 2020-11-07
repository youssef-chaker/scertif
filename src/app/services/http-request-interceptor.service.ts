import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    if (token) {
      const headersConfig: {[name: string]: string | string[]; } = {};

      for (const key of req.headers.keys()) {
        headersConfig[key] = req.headers.getAll(key);
      }
      headersConfig.Authorization = 'Bearer ' + token;
      const headers = new HttpHeaders(headersConfig);

      req = req.clone({
        headers
      });
    }

    return next.handle(req);
  }
}
