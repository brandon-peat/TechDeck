import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedList } from '../models/paginated-list';
import { Result } from '../models/result';
import { SearchPerson } from '../models/search-person';
import { UserAuthBase } from '../security/user-auth-base';

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

  public logIn(email: string, password: string): Observable<Result<UserAuthBase>> {
    return this.http.post<Result<UserAuthBase>>('https://localhost:7101/account/log-in', {
      email,
      password
    });
  }

  public uploadProfilePicture(file: File): Observable<void> {
    let fd = new FormData();
    fd.append('file', file);
    return this.http.post<void>('https://localhost:7101/account/profile-picture', fd);
  }

  public uploadBanner(file: File): Observable<void> {
    let fd = new FormData();
    fd.append('file', file);
    return this.http.post<void>('https://localhost:7101/account/banner', fd);
  }

  public updateName(firstName: string, lastName: string): Observable<void> {
    return this.http.post<void>('https://localhost:7101/account/name', {firstName, lastName});
  }

  public getName(userId: number): Observable<string> {
    return this.http.get('https://localhost:7101/account/name/' + userId, { responseType: 'text' });
  }

  public searchPeoplePaged(pageNumber: number, pageSize: number, searchTerm: string)
    : Observable<PaginatedList<SearchPerson>> {
    return this.http.post<PaginatedList<SearchPerson>>('https://localhost:7101/account/search', 
      {pageNumber, pageSize, searchTerm});
  }
}
