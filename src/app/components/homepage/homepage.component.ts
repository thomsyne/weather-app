import { HistoryState } from './../../store/history.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HistoryModel } from 'src/app/core/models/history.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  historys: Observable<HistoryModel[]>;
  

  constructor(private store: Store<HistoryState>) {
    this.historys = this.store.select(state => state.history);
   }

   addHistory(payload){
     this.store.dispatch({
       type: 'ADD_HISTORY',
       payload: <HistoryModel> {
        name: payload.name,
        date: payload.date
       }
     });
   }

  ngOnInit() {
  }

}
