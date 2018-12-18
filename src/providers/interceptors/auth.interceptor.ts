import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfig } from "../../../config/app.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = AppConfig.AUTH_TOKEN;
    const newRequest = req.clone({
      headers: req.headers.set(AppConfig.AUTH_HEADERS, authToken),
    });
    return next.handle(newRequest);
  }
}
