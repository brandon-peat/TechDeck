import { Injectable, signal, WritableSignal } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from "./local-storage.service";
import { UserAuthBase } from "./user-auth-base";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public isLoggedIn: WritableSignal<boolean> = signal(false);
  public user: WritableSignal<UserAuthBase | null> = signal(null);

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router) {}

  public tryReloadSession(): void {
    const auth = this.localStorageService.getData('auth');

    if (auth) {
      this.userIsLoggedIn(JSON.parse(auth));
    }
  }

  public userIsLoggedIn(user: UserAuthBase): void {
    this.isLoggedIn.set(true);

    this.localStorageService.saveData('auth', JSON.stringify(user));

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(user.bearerToken);

    user.name = decodedToken['name'];

    this.user.set(user);
  }

  public logOut(): void {
    this.localStorageService.removeData('auth');
    this.isLoggedIn.set(false);
    this.user.set(null);
    this.router.navigateByUrl('/log-in');
  }
}
