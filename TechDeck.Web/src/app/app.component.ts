import { Component, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MenuItem } from 'primeng/api';
import { Observable, of, switchMap } from 'rxjs';
import { DropdownViewModel } from './models/dropdown';
import { SecurityService } from './security/security.service';
import { UserAuthBase } from './security/user-auth-base';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'tech-deck';

  public items: MenuItem[] = [
    { label: 'Log in', icon: 'pi pi-sign-in', route: 'log-in', style: {'margin-left': 'auto'}, isLoggedIn: false },
    { label: 'Sign up', icon: 'pi pi-user-plus', route: 'sign-up', isLoggedIn: false }
  ];
  
  public countries$: Observable<DropdownViewModel[]> = of([]);
  
  public isLoggedIn: Signal<boolean>;
  public user: Signal<UserAuthBase | null>;

  constructor(
    public readonly countryService: CountryService,
    securityService: SecurityService) { 

    securityService.tryReloadSession();
    this.isLoggedIn = securityService.isLoggedIn;
    this.user = securityService.user;

    this.countries$ = toObservable(this.isLoggedIn).pipe(
      switchMap(isLoggedIn => isLoggedIn ? this.countryService.getCountries() : of([]))
    );
  }
}
