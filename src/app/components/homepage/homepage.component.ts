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

   executeListing(spliced){
     if(spliced?.length > 9){
      const historyItems = spliced;
      this.historys = [...historyItems].splice(this.start, this.stop);
     } else {
       this.historys = spliced;
     }
    
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
        var spliced = response;
        this.executeListing(spliced);
      }
    );
  }

  search(){
    if (this.searchTerm.length < 3){
      this.toastrService.info('Please enter a longer search term');
    }

    this.locationService.getLocationCoordinates(this.searchTerm).subscribe(
      (response: CoordinateModel[]) => {
        this.lat = response[0].lat;
        this.lon = response[0].lon;

        const payload = {
          name: this.searchTerm,
          date: this.todayDate
        }

        this.addHistory(payload);

        this.getWeatherDetails();
      }, (error) => {

      }
    )
  }

  getWeatherDetails(){
    const payload = {
      lat: this?.lat,
      lon: this?.lon,
      exclude: 'minutely,hourly,alerts'
    }
    this.weatherService.getWeatherData(payload).subscribe(
      (resp)=> {
        let weatherData: WeatherModel = resp;
        weatherData.name = this.capitalizeFirstLetter(this.searchTerm);
        weatherData.date = this.todayDate;

        this.router.navigate([ApplicationPaths.Detail], {state: {data: weatherData}});

      }, (error) => {

      }
    )
  }

  goBack(){
    this.start = this.start - 9;
    this.stop = this.stop - 9;
    this.ngOnInit();
  }

  goForward(){
    this.start = this.start + 9;
    this.stop = this.stop + 9;
    this.ngOnInit();
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  testClick(history){
    console.log('div was clicked' + history)
  }

}
