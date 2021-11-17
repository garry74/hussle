/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatListService {
  newMessages: number = null;
  comeFromChatList = new BehaviorSubject(null);
  constructor(private http: HttpClient, private EnvService: EnvService) {}

  myHeaders() {
    // [TD]: Move to interceptor
    let tz = new Date().getTimezoneOffset();
    const headers = new HttpHeaders({
      Authorization:
        'Bearer' + ' ' + window.localStorage.getItem('hussle_token'),
      tz: tz + '',
    });
    return headers;
  }
  getChatsMyAnswers() {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'user/all-chats', {}, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  getChatsLists() {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'user/chat/list', {}, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  getSingleChat(data) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'chats', data, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  getSingleSearch(id) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'one-search',
        { search_id: id },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  seen(data) {
    const headers = this.myHeaders();
    return this.http
      .post(this.EnvService.API_URL + 'chat/seen', data, { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  postDeleteChat(arr: any): Observable<any> {
    const headers = this.myHeaders();
    return this.http.post(`${this.EnvService.API_URL}chats/delete`, arr, {
      headers,
    });
  }

  shareList(str: any = {}): Observable<any> {
    const headers = this.myHeaders();
    return this.http.post(`${this.EnvService.API_URL}chats/sharelist`, str, {
      headers,
    });
  }

  postDeleteSingleChat(message_id: any): Observable<any> {
    const headers = this.myHeaders();
    return this.http.post(`${this.EnvService.API_URL}chat/delete`, message_id, {
      headers,
    });
  }
}
