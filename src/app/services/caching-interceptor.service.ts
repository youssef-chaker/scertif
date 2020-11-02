import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {RequestCacheService} from './request-cache.service';
import {tap} from 'rxjs/operators';

// const CACHEABLE_URL = '';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private requestCache: RequestCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRequestCacheable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.requestCache.get(req);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(e => {
        if (e instanceof HttpResponse) {
          this.requestCache.put(req, e);
        }
      })
    );
  }

  isRequestCacheable(req: HttpRequest<any>): boolean {
    return (req.method === 'GET');
  }
}
