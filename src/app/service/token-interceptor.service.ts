import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const accessKey = localStorage.getItem("accessKey");
    console.log(`Intercepted request with key ${accessKey}`)
    if (accessKey) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + accessKey)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
