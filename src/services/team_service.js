import * as Rx from 'rxjs';
import fetchChampions from './api';
import View from '../view';

export default class TeamService {
  constructor() {
    this.champs = Rx.Observable.fromPromise(
      fetchChampions()
    );
  }


}