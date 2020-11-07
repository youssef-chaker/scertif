import { Injectable } from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class RequestCacheService {

  cache = new Map();

  constructor() { }

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const cached = this.cache.get(req.urlWithParams);
    return cached ? cached.res : null;
  }

  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const entry = { url, res };
    this.cache.set(url, entry);
  }
}
