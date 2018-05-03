import * as Rx from "rxjs/Rx";

export default class ViewHeroDetails {
  constructor() {
    this.heroes = Rx.Observable.fromPromise(
      fetch('/resources/heroes.json')
        .then(resp => resp.json())
        .then((res) => Object.values(res))
    );

  }

  clearList() {
    let maindiv = document.getElementById('champ-items');
    maindiv.innerHTML = '';

    let itemsdiv = document.getElementById('items');
    itemsdiv.innerHTML = '';

    let details = document.getElementById('champ-detail');
    details.innerHTML = '';
  }

    showHeroAbilities(abilities, localName, name, descriptions) {
      this.clearList();

        let maindiv = document.getElementById('champ-detail');

        let wrapper = document.createElement('div');

      let avatar = document.createElement('img');
      avatar.src = '/dota_images/heroes/' + name + '_vert.jpg';
      wrapper.appendChild(avatar);
      wrapper.className = 'wrapper-champ-detail'


      let header = document.createElement('h2');
      header.innerHTML = localName;
      wrapper.appendChild(header);

      maindiv.appendChild(wrapper);

      abilities.forEach((element, index) => {
        let abilityItem = document.createElement('div');

        abilityItem.className = 'ability-item';
        abilityItem.style.display = 'block';
        abilityItem.style.clear = 'both';

        let abilityName = document.createElement('h4');
        abilityName.innerHTML = element.localizedName;
        abilityName.className = 'ability-name';

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
        abilityItem.appendChild(wrapper);

        maindiv.appendChild(abilityItem);

      });
    }
}
