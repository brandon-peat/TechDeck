import { Injectable, signal, WritableSignal } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from "./local-storage.service";
import { UserAuthBase } from "./user-auth-base";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public isLoggedIn: WritableSignal<boolean> = signal(false);
  public user: WritableSignal<UserAuthBase | null> = signal(null);

  constructor(private readonly localStorageService: LocalStorageService) {}

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
}
