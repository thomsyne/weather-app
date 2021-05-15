import { DatePipe } from '@angular/common';
import { WeatherModel } from './../../core/models/weather.model';
import { WeatherService } from './../../services/weather.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoryState } from 'src/app/store/history.state';
import { Store } from '@ngrx/store';
import { HistoryModel } from 'src/app/core/models/history.model';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.scss'],
  providers: [DatePipe]
})
export class DetailpageComponent implements OnInit, OnDestroy {

  historys: HistoryModel[];
  lat: number;
  lon: number;
  weatherDetails: WeatherModel;
  subscription: Subscription;
  example:string;
  start: number = 0;
  stop: number = 3;

  constructor(
    private store: Store<HistoryState>,
    private readonly weatherService: WeatherService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { 
  }

  ngOnInit() {
    this.weatherDetails = history.state.data;
    console.log(this.weatherDetails);
    history.state.data = null;

    this.subscription = this.store.select(state => state.history).subscribe(
      (response)=> {
        
        var spliced = response;
        this.executeListing(spliced);
      }
    );
  }

  executeListing(spliced){
    if(spliced?.length > 3){
     const historyItems = spliced;
      this.historys = [...historyItems].splice(this.start, this.stop);
    } else {
      this.historys = spliced;
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  goBack(){
    this.start = this.start - 3;
    this.stop = this.stop - 3;
    this.ngOnInit();
  }

  goForward(){
    this.start = this.start + 3;
    this.stop = this.stop + 3;
    this.ngOnInit();
  }

  @HostListener('unloaded')
  ngOnDestroy(){
    window.history.back
  }

}
