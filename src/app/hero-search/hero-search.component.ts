import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  //A Subject is both a source of observable values and an Observable itself. 
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  //push a search term into the observable stream
  search(term: string): void {
    //You can also push values into that Observable by calling its next(value) method as the search() method does.
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // preserves the original request order while returning only the observable from the most recent HTTP method call
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
