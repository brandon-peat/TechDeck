import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginatedList } from '../models/paginated-list';
import { Result } from '../models/result';
import { SearchPerson } from '../models/search-person';
import { UserAuthBase } from '../security/user-auth-base';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  public signUp(email: string, firstName: string, lastName: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/account/sign-up`, {
      email,
      firstName,
      lastName,
      password
    });
  }

  public checkExistingEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/account/email-is-in-use/${email}`);
  }

  public logIn(email: string, password: string): Observable<Result<UserAuthBase>> {
    return this.http.post<Result<UserAuthBase>>(`${this.apiUrl}/account/log-in`, {
      email,
      password
    });
  }

  public uploadProfilePicture(file: File): Observable<void> {
    let fd = new FormData();
    fd.append('file', file);
    return this.http.post<void>(`${this.apiUrl}/account/profile-picture`, fd);
  }

  public uploadBanner(file: File): Observable<void> {
    let fd = new FormData();
    fd.append('file', file);
    return this.http.post<void>(`${this.apiUrl}/account/banner`, fd);
  }

  public updateName(firstName: string, lastName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/account/name`, { firstName, lastName });
  }

  public getName(personId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/account/name/${personId}`, { responseType: 'text' });
  }

  public searchPeoplePaged(pageNumber: number, pageSize: number, searchTerm: string)
    : Observable<PaginatedList<SearchPerson>> {
    return this.http.post<PaginatedList<SearchPerson>>(`${this.apiUrl}/account/search`,
      { pageNumber, pageSize, searchTerm });
  }
}
