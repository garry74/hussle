/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  otherProfileRequests = false;
  requestName = '';

  drawnPolygon$ = new Subject<any[]>();

  constructor(private http: HttpClient, private EnvService: EnvService) {}
  myHeaders() {
    let tz = new Date().getTimezoneOffset();
    const headers = new HttpHeaders({
      Authorization:
        'Bearer' + ' ' + window.localStorage.getItem('hussle_token'),
      tz: tz + '',
    });
    return headers;
  }

  saveSearch(data) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'search/create', data, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getLocations(parent_id: number, page?: number) {
    const headers = this.myHeaders();
    return this.http.get(`${this.EnvService.API_URL}locations/${parent_id}`, {
      headers: headers,
    });
  }

  getAllCats(): Observable<any> {
    const headers = this.myHeaders();
    return this.http.get(`${this.EnvService.API_URL}search/categories`, {
      headers: headers,
    });
  }
}
