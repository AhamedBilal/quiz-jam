import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from "../../../environments/environment";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "Authorization";
  private token: any = "";

  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.token = this.auth.getToken();
    request = this.addAuthenticationToken(request);
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          localStorage.clear();
        }
        return throwError(error);
      })
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    if (!this.token) {
      return request;
    }
    if (!request.url.match(environment.baseURI)) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, this.token)
    });
  }

}
