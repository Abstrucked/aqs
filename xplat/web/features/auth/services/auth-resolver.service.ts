import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { User } from "@mxh/core/models/user.model";
import { AuthService } from "@mxh/nativescript/features/auth/services";
import { Resolver } from "dns";
import { Observable } from "rxjs";

export class AuthResolverService implements Resolver<User> {
  constructor(private authService: AuthService) { }
  resove(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Promise<User> | User {

    return
  }
}
