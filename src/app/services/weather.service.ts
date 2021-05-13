import { ErrorHandlers } from './../core/utils/error.hander';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiConstant } from '../core/constants/app.constants';
import { WeatherModel } from '../core/models/weather.model';

const appid = ApiConstant.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

constructor(private httpClient: HttpClient) { }

  getWeatherData(payload) : Observable<WeatherModel>{
    let params = new HttpParams();
    if(!!appid){
      params = params.append('appid', `${appid}`)
    }
    return this.httpClient.get<WeatherModel>(`${ApiConstant.apiUrl}`, {params})
    .pipe(
      catchError(ErrorHandlers.handleApiError)
    )
  }

}
