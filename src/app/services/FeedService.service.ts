/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import pusher from 'pusher-js';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';

export enum MESSAGE_TYPE {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  LOCATION = 'location',
}

@Injectable()
export class FeedService {
  Pusher;
  chats = [];
  fromId: number = 0;
  constructor(private http: HttpClient, private EnvService: EnvService) {}

  connect() {
    // [TD]: Move to interceptor
    const headers = {
      Authorization:
        'Bearer' + ' ' + window.localStorage.getItem('hussle_token'),
      'X-App-ID': '12345678',
    };
    this.Pusher = new pusher('ABCD', {
      wsHost: 'hussle.webapricot.am',
      httpHost: 'hussle.webapricot.am',
      wsPort: 6001,
      wssPort: 6001,
      forceTLS: false,
      cluster: 'mt1',
      disableStats: true,
      disabledTransports: ['wss'],
      enabledTransports: ['ws'],
      authEndpoint: 'http://hussle.webapricot.am/laravel-websockets/auth',
      auth: { headers: headers },
    });
    this.Pusher.connection.bind('state_change', (states) => {});
    this.Pusher.connection.bind('connected', (event) => {});
    this.Pusher.connection.bind('error', (event) => {});
    const disconnect = this.Pusher.disconnect.bind(this.Pusher);
    this.Pusher.connection.bind(disconnect, (event) => {
      console.log(event);
    });
  }

  disconnect() {
    this.Pusher.disconnect();
  }

  subscribeToChannel(channel) {
    this.Pusher.subscribe(channel);
    this.Pusher.bind_global((event, data) => {
      if (data && data.message) {
        this.chats.push({ body: data.message });
      }

      if (data.from_id === this.fromId) {
        console.log(data.from_id);
      }
    });
  }

  sendEvent(message: string | File, to_id, type: MESSAGE_TYPE) {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('to_id', to_id);
    formData.append('type', type);
    const headers = this.myHeaders();
    return this.http.post(this.EnvService.API_URL + 'chat/store', formData, {
      headers,
    });
  }

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
}
