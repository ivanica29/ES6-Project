import * as Rx from "rxjs/Rx";
import ServiceHeroDetails from "./services/hero-details_service";

export default class ViewHeroes {
  static clearList() {
    let maindiv = document.getElementById('champ-items');
    maindiv.innerHTML = '';

    let itemsdiv = document.getElementById('items');
    itemsdiv.innerHTML = '';
  }

  static showView(list) {
    let maindiv = document.getElementById('champ-items');

    list.forEach((element) => {
      let champItem = document.createElement('div');
      champItem.className = 'champ-item';
      champItem.className += ' col-md-3';
      champItem.dataset.id = `${element.id}`;

      let listItem = document.createElement('div');
      listItem.className = 'col-md-3';
      listItem.className = 'champ-header';
      let champ = `${element.localized_name}`;
      listItem.innerHTML = champ;
      champItem.appendChild(listItem);

      let string_img = element.name.split('npc_dota_hero_')[1] + '_lg.png';

      let img = document.createElement('img');
      img.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + string_img;
      img.className = 'champ-pic';
      champItem.appendChild(img);

      maindiv.appendChild(champItem);
    });

    ViewHeroes.showDetails();
  }

  static showTeam(list) {
    let maindiv = document.getElementById('champ-items');

    maindiv.className = 'champ-items-team';
    let pic = document.createElement('div');
    pic.className = 'map';
    maindiv.appendChild(pic);

    list.forEach((element, index) => {
      let champItem = document.createElement('div');
      champItem.className = 'champ-item' + index;
      champItem.className += ' col-md-2';

      let listItem = document.createElement('div');
      listItem.className = 'col-md-2';
      listItem.className = 'champ-header';
      let champ = `${element.localized_name}`;
      listItem.innerHTML = champ;
      champItem.appendChild(listItem);

      let string_img = element.name.split('npc_dota_hero_')[1] + '_lg.png';

      let img = document.createElement('img');
      img.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + string_img;
      img.className = 'champ-pic';
      img.className += ' team-champ-pic';
      champItem.appendChild(img);

      maindiv.appendChild(champItem);
    })
  }

  static showDetails() {
    let selectors = document.querySelectorAll('[data-id]');

     Rx.Observable.fromEvent(selectors, 'click')
      .subscribe((item) => {
        let service = new ServiceHeroDetails();
        service.getAbilitiesForChamp(item.target.dataset.id);
        }
      );
  }
}