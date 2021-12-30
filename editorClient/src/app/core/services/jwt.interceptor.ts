import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if(localStorage.getItem("ltpaToken") && localStorage.getItem("expires") && request.url.indexOf("aksharamukha-plugin.appspot.com") == -1) {
            const cloned = request.clone({
                setHeaders: { 
                    authorization: `MULTISCRIPTEDITOR ${localStorage.getItem("ltpaToken")}`,
                    expiresIn: localStorage.getItem("expires")
                }
            });
            return next.handle(cloned);
        } else {
            return next.handle(request);
        }
    }
}