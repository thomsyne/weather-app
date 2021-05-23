import { HttpErrorResponse } from '@angular/common/http';
import { from, throwError } from 'rxjs';

import {Router} from '@angular/router'

export class ErrorHandlers {
  
  static handleApiError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    let errorList = [];
    let router: Router

    switch (errorRes.status) {
      case 401:
        errorMessage = 'Un Authorized';
        break;
      case 400:
        errorList = errorRes.error.errors;
        errorMessage = errorRes.error.message;
        break;
      case 404:
          errorList = errorRes.error.errors;
          errorMessage = errorRes.error.message;
        break;
      case 500:
        errorMessage = 'Server Error';
    }
    if (errorList === undefined){
      return throwError(errorMessage);
    } else {
      return throwError(errorList);
    }
  }
}

