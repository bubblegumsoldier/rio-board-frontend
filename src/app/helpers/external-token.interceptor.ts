import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExternalAccessService } from '../services/externalAccess.service';


@Injectable()
export class ExternalTokenInterceptor implements HttpInterceptor {
    constructor(private externalAccessService: ExternalAccessService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.externalAccessService.givenProjectSecurityToken);
        if(this.externalAccessService.givenProjectSecurityToken)
        {
            let symbol = request.url.indexOf("?") >= 0 ? "&" : "?";
            let fullAppend = symbol + "PPK=" + encodeURI(this.externalAccessService.givenProjectSecurityToken);
            request = request.clone(
                    {url: request.url + fullAppend}
                );
        }

        return next.handle(request);
    }
}
