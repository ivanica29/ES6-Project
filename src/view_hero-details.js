import * as Rx from "rxjs/Rx";

export default class ViewHeroDetails {
  constructor() {
    this.heroes = Rx.Observable.fromPromise(
      fetch('/resources/heroes.json')
        .then(resp => resp.json())
        .then((res) => Object.values(res))
    );

  }

  static clearList() {
    let maindiv = document.getElementById('champ-items');
    maindiv.innerHTML = '';

    let itemsdiv = document.getElementById('items');
    itemsdiv.innerHTML = '';
  }

    showHeroAbilities(abilities, localName, name, descriptions) {
      this.clearList();

      let maindiv = document.getElementById('items');

      let avatar = document.createElement('img');
      avatar.src = '/dota_images/heroes/' + name + '_vert.jpg';
      console.log(avatar.src);
      maindiv.appendChild(avatar);


      let header = document.createElement('h2');
      header.innerHTML = localName;
      maindiv.appendChild(header);

      console.log(name.toLowerCase());


      abilities.forEach((element, index) => {
        let abilityItem = document.createElement('div');
        abilityItem.style.display = 'block';
        abilityItem.style.clear = 'both';

        let abilityName = document.createElement('h4');
        abilityName.innerHTML = element.localizedName;

        let wrapper = document.createElement('div');
        let img = document.createElement('img');
        img.src = 'http://cdn.dota2.com/apps/dota2/images/abilities/' + element.name + "_lg.png";
        img.style.cssFloat = 'left';

        let desc = document.createElement('p');
        desc.innerHTML = descriptions[index];
        desc.style.display = 'inline';
        desc.style.overflow = 'hidden';

        wrapper.appendChild(img);
        wrapper.appendChild(desc);

        abilityItem.appendChild(abilityName);
        abilityName.appendChild(wrapper);

        maindiv.appendChild(abilityItem);

      });
    }
}
