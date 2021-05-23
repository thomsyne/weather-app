import { ToastrService } from 'ngx-toastr';
import { ApplicationPaths } from './../../core/constants/app.constants';
import { DatePipe } from '@angular/common';
import { WeatherModel } from './../../core/models/weather.model';
import { WeatherService } from './../../services/weather.service';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistoryState } from 'src/app/store/history.state';
import { Store } from '@ngrx/store';
import { HistoryModel } from 'src/app/core/models/history.model';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.scss'],
  providers: [DatePipe],
})
export class DetailpageComponent implements OnInit, OnDestroy {

  chartData: any = [];
  chartLabels: any = [];

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(0,0,255,0.2)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(0,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,255,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(60,179,113,0.2)',
      borderColor: 'rgba(60,179,113,1)',
      pointBackgroundColor: 'rgba(60,179,113,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(60,179,113,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  lineLegends = [
    'Temperature (°C)',
    'Humidity (%)',
    'Wind (km/h)'
  ]

  historys: HistoryModel[];
  lat: number;
  lon: number;
  weatherDetails: WeatherModel;
  subscription: Subscription[] = [];

  start: number = 0;
  stop: number = 3;
  cityName: string;
  todayDate = new Date();
  weatherData: WeatherModel;
  arrayLength: number;
  itemsPerPage: number = 3;
  weatherPassed: WeatherModel;

  displayChart: boolean = true;

  constructor(
    private store: Store<HistoryState>,
    private readonly weatherService: WeatherService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { 

  }

  ngOnInit() {
    const weatherPayload = history.state.data || this.weatherPassed;
    history.state.data = null;

    if(weatherPayload){
      this.cityName = this.capitalizeFirstLetter(weatherPayload.search);
      this.getWeatherDetails(weatherPayload);
    }

    this.subscription.push(this.store.select(state => state.history).subscribe(
      (response)=> {
        this.arrayLength = response.length;
        this.historys = response;
      }
    ));
  }

  getWeatherDetails(weatherPayload){
    const payload = {
      lat: weatherPayload.lat,
      lon: weatherPayload.lon,
      exclude: 'minutely,hourly,alerts',
      units: 'metric'
    }
    this.subscription.push(this.weatherService.getWeatherData(payload).subscribe(
      (resp)=> {
        this.weatherData = resp;
        this.reduceModel();
      }, (error) => {
        this.toastr.error('Error encountered. Please try again later.')
      }
    ));
  }

  reduceModel() {
    var tempList = [];
    var humidList = [];
    var windList = [];
    var chartLabs = [];

    for (var i = 1; i < this.weatherData.daily.length; i++) {

      tempList.push(this.weatherData.daily[i].temp.day);

      humidList.push(this.weatherData.daily[i].humidity);

      windList.push(this.weatherData.daily[i].wind_speed * 3.6);

      chartLabs.push(new Date(this.weatherData.daily[i].dt * 1000).toDateString());

    }

    var chartVars = [tempList, humidList, windList];
    this.weatherData.daily = [];
    var newData = [];
    
    for (var i = 0; i < this.lineLegends.length; i++) {
      newData.push({ data: chartVars[i], label: this.lineLegends[i] });
    }
    this.lineChartData = newData;
    this.lineChartLabels = chartLabs;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  toggleDisplay(display: string){
    switch (display){
      case 'chart':
        this.displayChart = true;
        break;
      
      case 'table':
        this.displayChart = false;
        break;    
    }
  }

  citySelectedHandler(weatherDeets: WeatherModel){
    this.weatherPassed = weatherDeets;
    this.ngOnInit();
    window.scroll(0,0);
  }

  routeToHome(){
    this.router.navigate([ApplicationPaths.Home])
  }

  @HostListener('unloaded')
  ngOnDestroy(){
    window.history.back
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
