import * as Rx from 'rxjs';
import fetchChampions from './api';
import View from '../view';

export default class HeroService {
  constructor() {
    this.champs = Rx.Observable.fromPromise(
      fetchChampions()
    );
    this.registerEventInput();
    this.registerEventMakeTeam();

    this.champs.subscribe(
      (champions) => this.showChampions(champions)
    );

  }

  registerEventInput() {
    const searchInput = document.getElementById('input-field');
    let queryTerm = '';

    Rx.Observable.fromEvent(searchInput, 'input')
      .debounceTime(500)
      .map(e => e.target.value)
      .switchMap(text => {
        queryTerm = text;
        return this.champs;
      })
      .subscribe((champs) => this.showChampions(champs, queryTerm));
  }

  showChampions(champions, term = '') {
    term = term.toLowerCase();
    View.clearList();

    const newList = champions.filter((champion) => {
      return champion.localized_name.toLowerCase().indexOf(term) > -1;
    });

    View.showView(newList);
  }

  chooseTeam(champions) {
    View.clearList();

    let item1 = champions[Math  .floor(Math.random()*champions.length)];
    let item2 = champions[Math.floor(Math.random()*champions.length)];
    let item3 = champions[Math.floor(Math.random()*champions.length)];
    let item4 = champions[Math.floor(Math.random()*champions.length)];
    let item5 = champions[Math.floor(Math.random()*champions.length)];

    const newList = [item1, item2, item3, item4, item5];
    View.showTeam(newList);

    return newList;
  }

  registerEventMakeTeam() {
    const btnTeam = document.getElementById('make-team');

    Rx.Observable.fromEvent(btnTeam, 'click')
      .debounceTime(500)
      .switchMap(() => {
        return this.champs;
      })
      .subscribe((champs) => this.chooseTeam(champs));
  }
}