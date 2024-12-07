import { Injectable, signal, WritableSignal } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAuthBase } from "./user-auth-base";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public isLoggedIn: WritableSignal<boolean> = signal(false);
  public user: WritableSignal<UserAuthBase | null> = signal(null);

  public userIsLoggedIn(user: UserAuthBase): void {
    this.isLoggedIn.set(true);

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(user.bearerToken);

    user.name = decodedToken['name'];

    this.user.set(user);
  }
}
