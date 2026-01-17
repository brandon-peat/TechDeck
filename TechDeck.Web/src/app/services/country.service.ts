import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DropdownViewModel } from '../models/dropdown';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  public getCountries(): Observable<DropdownViewModel[]> {
    return this.http.get<DropdownViewModel[]>(`${this.apiUrl}/countries`);
  }
}
