import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SecurityService } from "./security.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly securityService: SecurityService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let user = this.securityService.user();

    if (user) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + user.bearerToken)
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
    else {
      return next.handle(req);
    }
  }
}
