import * as Rx from "rxjs/Rx";
import ViewHeroDetails from '../view_hero-details';

export default class HeroDetails {

  constructor() {
    this.heroes = Rx.Observable.fromPromise(
      fetch('/resources/heroes.json')
        .then(resp => resp.json())
        .then((res) => Object.values(res))
    );

    this.abilities = Rx.Observable.fromPromise(
      fetch('/resources/abilities.json')
        .then(resp => resp.json())
        .then((res) => Object.values(res))
    );

    this.descript = Rx.Observable.fromPromise(
      fetch('/resources/detail-abilities.json')
        .then(resp => resp.json())
        .then((res) => Object.values(res))
        .then((res) => res[0])
    );
  }

    getAbilitiesForChamp(id) {

    this.abilities.subscribe((abilitiesResponse) => {
      let foundAbilities = abilitiesResponse.filter( (ability) => ability.heroId === id);

      this.heroes.subscribe((heroesResponse) => {

        let champ = heroesResponse.filter((champ) => champ.id === id);
        let foundDescriptions = [];
        let champLocalName = champ[0].localizedName;
        let champName = champ[0].name.split('npc_dota_hero_')[1];

        this.descript.subscribe((descriptionResponse) => {
          foundAbilities.forEach((element) => {
            foundDescriptions.push(descriptionResponse[element.name].desc);

            let service = new ViewHeroDetails();
              service.showHeroAbilities(foundAbilities, champLocalName, champName, foundDescriptions);
          })
        });
      });
    })
  }


}