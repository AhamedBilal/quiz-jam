import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        console.log(error);
        let errorMsg = '';
        if (error.error) {
          const errorMsgs = error?.error;
          if (errorMsgs) {
            errorMsg = Object.keys(errorMsgs)
              .reduce((prev: any, current: any) => prev.concat(errorMsgs[current]), [])
              .join('</br>');
          } else {
            errorMsg = error?.name;
          }
        } else {
          errorMsg = error?.name;
        }
        // this.toastr.error(errorMsg.toUpperCase());
        this.spinner.hide();
        return throwError(errorMsg);
      })
    );
  }
}
