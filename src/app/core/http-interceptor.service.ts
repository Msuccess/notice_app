import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from './services/util.service';
import { finalize, map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  loading: HTMLIonLoadingElement;
  constructor(
    private util: UtilService,
    public loadingController: LoadingController
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.util.showLoader$.next(true);

    return next.handle(request).pipe(
      map(async (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.util.showLoader$.next(false);
        } else if (event instanceof HttpErrorResponse) {
          this.util.showLoader$.next(false);
        }
        return event;
      }),
      finalize(async () => this.util.showLoader$.next(false))
    );
  }
}
