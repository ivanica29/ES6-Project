import * as Rx from 'rxjs';
import ViewItems from "../view_items";

export default class ItemService {
  constructor() {

    this.items = Rx.Observable.fromPromise(
      fetch('/resources/items.json')
        .then(resp => resp.json())
        .then((res) => Object.values(res))
    );

    this.registerEventShowItems();

  }

  showItems(items) {
    ViewItems.clearList();

    ViewItems.showItem(items);
  }

  registerEventShowItems() {
    const btnTeam = document.getElementById('show-items');

    Rx.Observable.fromEvent(btnTeam, 'click')
      .debounceTime(500)
      .switchMap(() => {
        return this.items;
      })
      .subscribe((items) => this.showItems(items));
  }
}