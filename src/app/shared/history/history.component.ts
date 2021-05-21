import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApplicationPaths } from 'src/app/core/constants/app.constants';
import { CoordinateModel } from 'src/app/core/models/coordinate.model';
import { HistoryModel } from 'src/app/core/models/history.model';
import { LocationService } from 'src/app/services/location.service';
import { HistoryState } from 'src/app/store/history.state';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input () historys: HistoryModel[];
  page: number = 1;
  @Input () itemsPerPage: number;
  @Input () start: number;
  @Input () stop: number;

  @Output() citySelected: EventEmitter<any> =   new EventEmitter();
  cityName: string;
  lat: number;
  lon: number;
  todayDate = new Date();
  subscription: Subscription;
  onDetailPage: boolean = false;

  constructor(
    private store: Store<HistoryState>,
    private readonly locationService: LocationService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
  ) { 
    this.subscription = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.endsWith("detail")){
        this.onDetailPage = true;
      } else {
        this.onDetailPage = false;
      }
    });
    }
  

  ngOnInit() {
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  goBack(){
    this.start = this.start - 3;
    this.stop = this.stop - 3;

    this.page = this.page -1

    this.backDisabled;
  }

  goForward(){
    this.start = this.start + 3;
    this.stop = this.stop + 3;

    this.page = this.page + 1;

    this.forwardEnabled;
  }

  get backDisabled(): boolean{
    return true ? this.start === 0 : false;
  }

  get forwardEnabled(): boolean{
    return true ? (this.historys.length > (this.page * this.itemsPerPage)) : false;
  }

  searchCity(cityName: string){
    if (cityName.length < 3){
      this.toastrService.info('Please enter a longer search term');
      return;
    }
    this.locationService.getLocationCoordinates(cityName).subscribe(
      (response: CoordinateModel[]) => {
        if (response.length > 0){
          this.lat = response[0].lat;
        this.lon = response[0].lon;

        console.log(response);

        const payload = {
          name: response[0].local_names.en,
          date: this.todayDate
        }

        const weatherPayload = {
          lat: this.lat,
          lon: this.lon,
          search: response[0].local_names.en
        }

        this.addHistory(payload);

        this.onDetailPage === true ? this.citySelected.emit(weatherPayload) : this.router.navigate([ApplicationPaths.Detail], {state: {data: weatherPayload}});
        } else {
          this.toastrService.error('Location coordinates not found for ' + cityName);
        }
        

      }, (error) => {
        this.toastrService.error('Error Encountered');
      }
    )


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

}
