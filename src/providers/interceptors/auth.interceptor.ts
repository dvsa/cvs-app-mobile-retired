import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AUTH} from "../../../config/config.enums";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = AUTH.TOKEN;
    const newRequest = req.clone({
      headers: req.headers.set(AUTH.HEADERS, authToken),
    });
    return next.handle(newRequest);
  }
}
