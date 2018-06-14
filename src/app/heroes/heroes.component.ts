import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    //It will wait for the observable to emit the array.Then subscribe passes the emitted array to the callback
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  /**add hero */
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(hero => this.heroes.push(hero));
  }

  /**delete hero */
  delete(hero: Hero) {
    //The filter() method creates a new array with all elements that pass the test 
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
