import { Injectable } from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';

const MAX_AGE_CACHE = 300000;

@Injectable()
export class RequestCacheService {

  cache = new Map();

  constructor() { }

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const cached = this.cache.get(req.urlWithParams);
    if (!cached) {
      return null;
    }
    const isExpired = (Date.now() - cached.entryTime) > MAX_AGE_CACHE;
    return isExpired ? null : cached.res;
  }

  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const entry = { url, res, lastRead: Date.now() };
    this.cache.set(url, entry);

    this.cache.forEach(e => {
      if ((Date.now() - e.lastRead) > MAX_AGE_CACHE) {
        this.cache.delete(e.url);
      }
    });
  }
}
