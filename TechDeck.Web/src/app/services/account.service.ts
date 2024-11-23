import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private readonly http: HttpClient) { }

  public signUp(email: string, firstName: string, lastName: string, password: string): Observable<void> {
    return this.http.post<void>('https://localhost:7101/account/sign-up', {
      email,
      firstName,
      lastName,
      password
    });
  }

  public checkExistingEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>('https://localhost:7101/account/email-is-in-use/' + email);
  }
}
