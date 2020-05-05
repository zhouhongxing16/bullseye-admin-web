import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Help} from './Help';
import {environment} from '../environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router, private help: Help) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let url = request.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
      // url = url;
    }
    request = request.clone({
      url: url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );

  }

  private handleData(event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      case 401:
        console.log('not login');
        this.help.showMessage('warning', '未登录，请先登录！');
        this.router.navigate(['/login']);
        return of(event);
        break;

      case 403:
        this.help.showMessage('warning', '未授权，禁止访问！');
        return of(event);
        break;
      case 500:
        this.help.showMessage('error', '服务器错误！');
        return of(event);
        break;
      default:
        console.log(event);
        break;
    }
    return throwError(event);
  }
}
