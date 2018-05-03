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

  appendItems(i1) {
    this.items.subscribe((res) => {
      let filteredItems = {};

      res.filter((item) => {
        return i1.includes(Number.parseInt(item.id));
      }).forEach(item => {
        filteredItems[item.id] = item;
      });

      let pics = i1.map((itemId) => {
        if (!filteredItems[itemId]) {
          return 'abyssal_blade_lg.png';
        }

        return filteredItems[itemId].name.split('item_')[1] + '_lg.png';
      });


      let viewItems = new ViewItems();

      viewItems.showItemsForMatch(pics);
    });

  }

}