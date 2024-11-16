import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DropdownViewModel } from '../models/dropdown';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private readonly http: HttpClient) { }

  public getCountries(): Observable<DropdownViewModel[]> {
    return this.http.get<DropdownViewModel[]>('https://localhost:7101/countries');
  }
}
