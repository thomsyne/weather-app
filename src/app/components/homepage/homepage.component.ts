import { WeatherModel } from './../../core/models/weather.model';
import { ApplicationPaths } from './../../core/constants/app.constants';
import { WeatherService } from './../../services/weather.service';
import { CoordinateModel } from './../../core/models/coordinate.model';
import { LocationService } from './../../services/location.service';
import { HistoryState } from './../../store/history.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HistoryModel } from 'src/app/core/models/history.model';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [DatePipe]
})
export class HomepageComponent implements OnInit {

  fullList: HistoryModel[];
  historys: HistoryModel[];
  searchTerm: string;
  lat: number;
  lon: number;
  weatherData: WeatherModel;
  subscription: Subscription;
  todayDate = new Date();
  start: number = 0;
  stop: number = 9;
  

  constructor(
    private store: Store<HistoryState>,
    private readonly locationService: LocationService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly weatherService: WeatherService
    ) {

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
    this.subscription = this.store.select(state => state.history).subscribe(
      (response)=> {
        console.log(response);
        this.historys = response;
      }
    );
  }

  search(){
    if (this.searchTerm.length < 3){
      this.toastrService.info('Please enter a longer search term');
    }


  }

  // citySelectedHandler(cityName: string){
  //   this.searchTerm = cityName;
  //   this.search();
  // }

}
