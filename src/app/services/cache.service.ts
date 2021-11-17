import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  userId: number;

  constructor() {}

  static removeToken() {
    localStorage.removeItem('hussle_token');
  }

  static getToken(): string {
    return localStorage.getItem('hussle_token');
  }

  static addToken(token: string) {
    localStorage.setItem('hussle_token', token);
  }
}
