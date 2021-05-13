import { ErrorHandlers } from './../core/utils/error.hander';
import { CoordinateModel } from './../core/models/coordinate.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstant } from '../core/constants/app.constants';
import { catchError } from 'rxjs/operators';

const appid = ApiConstant.apiKey;

@Injectable({
  providedIn: 'root'
})

export class LocationService {

constructor(private httpClient: HttpClient) { }

  getLocationCoordinates(city: string) : Observable<CoordinateModel> {
    let params = new HttpParams();
    if (!!city){
      params = params.append('q', `${city}`)
    }
    if(!!appid){
      params = params.append('appid', `${appid}`)
    }

    return this.httpClient.get<CoordinateModel>(`${ApiConstant.locationUrl}`, {params}
    ).pipe(
      catchError(ErrorHandlers.handleApiError)
    )
  }

}
