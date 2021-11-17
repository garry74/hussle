/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  radius = 0;
  searchInp: any = '';
  changeTab$ = new BehaviorSubject(null);

  constructor(private http: HttpClient, private EnvService: EnvService) {}
  // [TD]: Move to interceptor
  myHeaders() {
    let tz = new Date().getTimezoneOffset();
    const headers = new HttpHeaders({
      Authorization:
        'Bearer' + ' ' + window.localStorage.getItem('hussle_token'),
      tz: tz + '',
    });
    return headers;
  }

  getByLink(link, data?) {
    const headers = this.myHeaders();
    return this.http.post(link, { ...data }, { headers }).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  setSeen(search_id) {
    // [TD]: Move to interceptor
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'chat/update', { search_id }, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  getGlobalSearches() {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'global ',
        { radius: this.radius, desc: this.searchInp ? this.searchInp : null },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  getGlobSearsNoLog(coordinates) {
    let tz = new Date().getTimezoneOffset();
    const headers = new HttpHeaders({ tz: tz + '' });
    return this.http
      .post(
        'http://hussle.webapricot.am/api/all-searches',
        { coordinates },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  getMySearches(otherprofile_id?) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'user/searches ',
        { otherprofile_id: otherprofile_id ? otherprofile_id : null },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  DeleteMySearch(id) {
    const headers = this.myHeaders();
    return this.http
      .get(this.EnvService.API_URL + 'user/delete-search/' + id, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  DeleteGlobalSearch(id) {
    const headers = this.myHeaders();
    return this.http
      .get(this.EnvService.API_URL + 'user/delete-global-search/' + id, {
        headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  deleteGlobalSearchs(ids): Observable<any> {
    const headers = this.myHeaders();
    return this.http.post(
      `${this.EnvService.API_URL}user/delete-global-searches`,
      ids,
      { headers }
    );
  }

  findSearch(search, cordinates) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'user/filter',
        { desc: search, coordinates: cordinates, radius: this.radius },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  findChatSearch(val, user_id) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'user/chat/filter',
        { text: val, user_id: user_id },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  findSearchWithoutLogin(search, cordinates) {
    const headers = this.myHeaders();
    return this.http
      .post(
        'http://hussle.webapricot.am/api/global/filter',
        { desc: search, coordinates: cordinates },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  findMySearch(data) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'user/filter-searches',
        { ...data },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  applySearch(search_id) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'chat/add',
        { search_id: search_id },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  leaveReview(review) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'rate/add', review, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
}
