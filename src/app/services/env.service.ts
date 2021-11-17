/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  lang = window.localStorage.getItem('lang');
  API_URL = `http://hussle.webapricot.am/api/auth/`;
  // API_URL_UNI = `http://tosend.webapricot.am/api/${this.lang}/`;
  // OS_app_id = '721e0e12-4da9-49a8-9cd9-aa62c6c68aed'
  constructor() {}
}
