import * as Rx from 'rxjs';
import fetchChampions from './api_heroes';
import View from '../view_heroes';

export default class TeamService {
  constructor() {
    this.champs = Rx.Observable.fromPromise(
      fetchChampions()
    );
  }
}