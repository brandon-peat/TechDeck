import { Injectable, signal, WritableSignal } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from "../services/account.service";
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
    private readonly accountService: AccountService,
    private readonly router: Router) {}

  public tryReloadSession(): void {
    const auth = this.localStorageService.getData('auth');

    if (auth) {
      this.userIsLoggedIn(JSON.parse(auth));
    }
  }

  public userIsLoggedIn(user: UserAuthBase): void {
    const helper = new JwtHelperService();
  
    if (!helper.isTokenExpired(user.bearerToken)) {
      this.isLoggedIn.set(true);
  
      this.localStorageService.saveData('auth', JSON.stringify(user));
  
      this.accountService.getName(user.userId).subscribe(name => {
        user.name = name;
        this.user.set(user);
      });

      this.user.set(user);
    }
  }

  public logOut(): void {
    this.localStorageService.removeData('auth');
    this.isLoggedIn.set(false);
    this.user.set(null);
    this.router.navigateByUrl('/log-in');
  }

  public updateName(name: string): void {
    const user = this.user()!;
    user.name = name;
    this.user.set(user);
  }
}
