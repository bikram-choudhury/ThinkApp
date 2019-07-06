import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization-Code': 'fghjklkjhgfd345oiugvc'
            })
        });
        
        return next.handle(request).pipe(
            map((response: HttpEvent<any>) => response),
            catchError((error: HttpErrorResponse) => {
                const status:number = error.status; 
                let message:string = '';
                const data = {status};
                switch(status) {
                    case 0: message = 'Request failed/cancelled'; break;
                    case 400: message = error.error && error.error.message || 'Bad Request'; break;
                    case 401: message = error.error && error.error.message || 'Unauthorized'; break;
                    case 403: message = error.error && error.error.message || 'Forbidden'; break;
                    case 404: message = error.error && error.error.message || 'URL Not Found'; break;
                    case 405: message = error.error && error.error.message || 'Method Not Allowed'; break;
                    case 406: message = error.error && error.error.message || 'DATA Not Acceptable'; break;
                    case 408: message = error.error && error.error.message || 'Request Timeout'; break;
                    case 500: message = error.error && error.error.message || 'Internal Server Error'; break;
                    case 504: message = error.error && error.error.message || 'Gateway Timeout'; break;
                    default: message = error.message;
                }
                data['message'] = message;
                console.error(data);
                return throwError(data);
            })
        );
    }
}