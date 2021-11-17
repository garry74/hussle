/* eslint-disable eol-last */
/* eslint-disable prefer-const */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { ChatListService } from './chat-list.service';
import { debounceTime, debounce } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  fromMySearch = false;
  fromRegister = false;
  LogedUser;
  playerId;
  showLocation;
  coordinates;

  toglePhoneVisibilitySubject = new Subject();
  togleEmailVisibilitySubject = new Subject();

  constructor(
    private http: HttpClient,
    private EnvService: EnvService,
    private chatListService: ChatListService
  ) {}

  loggedIn() {
    if (!!localStorage.getItem('hussle_token')) return true;
  }

  myHeaders() {
    let tz = new Date().getTimezoneOffset();
    const headers = new HttpHeaders({
      Authorization:
        'Bearer' + ' ' + window.localStorage.getItem('hussle_token'),
      tz: tz + '',
    });
    return headers;
  }
  setCordinates(data) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'change-coordinates',
        { coordinates: data },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  sendVerificationRequest(tel) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'register/phone/verify/' + `${tel}`, {
        headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  sendVerificationCode(code) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'user/code', { code }, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  sendNewPassword(pass) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'user/password/change', pass, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  regUser(data) {
    return this.http
      .post(this.EnvService.API_URL + 'register', { ...data })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getLocations(data) {
    return this.http
      .post(this.EnvService.API_URL + 'location/search', data)
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  login(data) {
    data.playerId = this.playerId;
    return this.http.post(this.EnvService.API_URL + 'login', data).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  loggedUser() {
    const headers = this.myHeaders();
    return this.http.get(this.EnvService.API_URL + 'user', { headers }).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  updateUser(data) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'user/update', data, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  setPhoneVisibility(data) {
    const headers = this.myHeaders();
    return this.http
      .get(this.EnvService.API_URL + 'user/pv/' + data, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  setEmailVisibility(data) {
    const headers = this.myHeaders();
    return this.http
      .get(this.EnvService.API_URL + 'user/ev/' + data, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  setFingerprint(data) {
    const headers = this.myHeaders();
    return this.http
      .get(this.EnvService.API_URL + 'user/fv/' + data, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  setActivity(data) {
    const headers = this.myHeaders();
    return this.http
      .get(this.EnvService.API_URL + 'user/av/' + data, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  editUser(data) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'user/edit', data, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  logOut() {
    const headers = this.myHeaders();
    return this.http.get(this.EnvService.API_URL + 'logout', { headers }).pipe(
      tap((res) => {
        this.chatListService.newMessages = null;
      })
    );
  }

  editUserimage(image) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'user/image', image, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  forgetPass(email) {
    return this.http
      .post('http://hussle.webapricot.am/api/forgot', { email: email })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
}
