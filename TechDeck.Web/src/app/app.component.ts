import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CountryService } from './services/country.service';
import { DropdownViewModel } from './models/dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'tech-deck';

  public items: MenuItem[] = [
    { label: 'Log in', icon: 'pi pi-home', route: 'log-in' }
  ];
  
  public countries: DropdownViewModel[] = [];

  constructor(private readonly countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }
}
