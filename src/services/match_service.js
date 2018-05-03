import * as Rx from 'rxjs';
import ViewMatch from '../view_match';
import ItemService from './item_service';

export default class Match {
  constructor() {

    this.matchId = [];
    this.accountId = [];

    this.accounts = [];
    this.matches = [];

    this.item0 = [];
    this.item1 = [];
    this.item2 = [];
    this.item3 = [];
    this.item4 = [];
    this.item5 = [];

    this.kills = [];
    this.assists = [];
    this.deaths = [];

    this.nicknames = [];
  }

  findMatchForChamp(idChamp) {
    Rx.Observable.fromPromise(
      fetch('https://api.opendota.com/api/heroes/' + idChamp + '/matches')
        .then(resp => resp.json())
        .then(res => Object.values(res))
    ).subscribe((res) => {
      let matchesForChamp = res.slice(0, 10);
      this.findMatch(matchesForChamp);
    })
  }

  findMatch(matchesForChamp) {
    matchesForChamp.forEach((match) => {

      this.kills.push(match.kills);
      this.deaths.push(match.deaths);
      this.assists.push(match.assists);

      this.matchId.push(match.match_id);
      this.accountId.push(match.account_id);

    });


    this.accountId.forEach((acc) => {
      Rx.Observable.fromPromise(
        fetch('https://api.opendota.com/api/players/' + acc)
          .then(resp => resp.json())
          .then(res => Object.values(res))
      ).subscribe((res) => {
        this.accounts.push(res);
        if(this.accounts.length === 10) {
          this.getNicknames(this.accounts);
        }
      });
    })
  }

  getNicknames(res) {
    res.forEach((item) => {
      item.forEach((row) => {
        if (row != null) {
          if (row.hasOwnProperty('personaname')) {
            this.nicknames.push(row.personaname);
            if (this.nicknames.length === 10) {
              this.getItems(this.matchId);
            }
          }
        }
      })
    });


  }

  getItems(matchesIds) {
    matchesIds.forEach((matchId) => {
      Rx.Observable.fromPromise(
        fetch('https://api.opendota.com/api/matches/' + matchId)
          .then(resp => resp.json())
          .then(res => Object.values(res))
      ).subscribe((matches) => {
        this.matches.push(matches);

        if(this.matches.length === 10) {
          this.fetchItems(this.matches);
        }
      })
    })
  }

  fetchItems(matches) {
    matches.forEach((item) => {
      if(!Array.isArray(item[38])){
        return;
      }
      item[38].forEach((oneMatch) => {
        if (this.accountId.includes(oneMatch.account_id)) {
          this.item0.push(oneMatch.item_0);
          this.item1.push(oneMatch.item_1);
          this.item2.push(oneMatch.item_2);
          this.item3.push(oneMatch.item_3);
          this.item4.push(oneMatch.item_4);
          this.item5.push(oneMatch.item_5);
        }
      })

    });

    let view = new ViewMatch();
    view.showMatch(this.kills, this.deaths, this.assists, this.nicknames);

    let itemService = new ItemService();
    itemService.appendItems(this.item0);
    itemService.appendItems(this.item1);
    itemService.appendItems(this.item2);
    itemService.appendItems(this.item3);
    itemService.appendItems(this.item4);
    itemService.appendItems(this.item5);
  }
}

