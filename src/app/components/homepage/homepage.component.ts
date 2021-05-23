import { HistoryState } from './../../store/history.state';
import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HistoryModel } from 'src/app/core/models/history.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [DatePipe]
})
export class HomepageComponent implements OnInit {

  historys: HistoryModel[];
  
  subscription: Subscription;
  
  searchTerm: string;
  
  start: number = 0;
  itemsPerPage: number = 9;
  stop: number = 9;
  
  constructor(
    private store: Store<HistoryState>,
    ) { }

  ngOnInit() {
    this.subscription = this.store.select(state => state.history).subscribe(
      (response)=> {
        this.historys = response;
      }
    );
  }

  @HostListener('unloaded')
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
