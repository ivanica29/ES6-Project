import * as Rx from 'rxjs';
import fetchChampions from './api';
import View from '../view';

export default class HeroService {
  constructor() {
    this.champs = Rx.Observable.fromPromise(
      fetchChampions()
    );
    this.registerEvents();
    this.champs.subscribe(
      (champions) => this.showChampions(champions)
    );
  }

  registerEvents() {
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
}