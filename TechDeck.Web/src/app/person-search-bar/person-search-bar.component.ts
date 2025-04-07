import { Component, Signal } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { PaginatedList } from '../models/paginated-list';
import { SearchPerson } from '../models/search-person';
import { SecurityService } from '../security/security.service';
import { UserAuthBase } from '../security/user-auth-base';
import { AccountService } from '../services/account.service';

const minimumSearchLength = 3;
const firstPage = 1;
const pageSize = 10;

@Component({
  selector: 'person-search-bar',
  templateUrl: './person-search-bar.component.html',
  styleUrl: './person-search-bar.component.scss'
})
export class PersonSearchBarComponent {
  searchedPeople: SearchPerson[] = [];
  public currentPage: PaginatedList<SearchPerson> = PaginatedList.default<SearchPerson>();
  searchSubject = new Subject<string>();

  public isLoggedIn: Signal<boolean>;
  public user: Signal<UserAuthBase | null>;

  constructor(private readonly accountService: AccountService, securityService: SecurityService) {
    securityService.tryReloadSession();

    this.isLoggedIn = securityService.isLoggedIn;
    this.user = securityService.user;

    this.searchSubject.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.search(searchTerm);
    });
  }
    
  public onSearchInput(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.trim();
    if(searchTerm.length < minimumSearchLength) {
      this.searchedPeople = [];
      this.currentPage =  PaginatedList.default<SearchPerson>();
    }
    else this.searchSubject.next(searchTerm);
  }

  public search(searchTerm: string): void {
    if(searchTerm.length < minimumSearchLength) return;
    this.accountService.searchPeoplePaged(firstPage, pageSize, searchTerm).subscribe(people =>{
      this.currentPage = people;
      this.searchedPeople = people.items;
    });
  }

  public searchNextPage(event: Event, searchTerm: string): void {
    event.preventDefault();
    this.accountService.searchPeoplePaged(this.currentPage.pageNumber + 1, pageSize, searchTerm).subscribe(page => {
      this.currentPage = page;
      this.searchedPeople.push(...this.currentPage.items);
    });
  }
}
