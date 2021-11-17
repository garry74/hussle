/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cacheService: CacheService
  ) {}

  get(url: string, options?: any): Observable<any> {
    const headers = this.getHeaders();
    return headers
      ? this.http
          .get(`${environment.apiUrl}/${url}`, {
            ...options,
            headers: this.getHeaders(),
          })
          .pipe(catchError(this.errorChecker.bind(this)))
      : this.logoutFromLocal();
  }

  post(url: string, body: any | null, options?: any): Observable<any> {
    const headers = this.getHeaders();
    return headers
      ? this.http
          .post(`${environment.apiUrl}/${url}`, body, {
            ...options,
            headers: this.getHeaders(),
          })
          .pipe(catchError(this.errorChecker.bind(this)))
      : this.logoutFromLocal();
  }

  logout(): Observable<any> {
    return this.get('logout').pipe(tap((_) => this.logoutFromLocal()));
  }

  getUser(): Observable<any> {
    return this.get('user').pipe(
      tap((res) => (this.cacheService.userId = res.id))
    );
  }

  private getHeaders(): HttpHeaders {
    // [TD]: Move to interceptor
    const token = CacheService.getToken();
    return token && new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private errorChecker(
    error: HttpErrorResponse
  ): Observable<HttpErrorResponse> {
    if (error.status === 401) {
      //this.logoutFromLocal();
    }
    return throwError(error);
  }

  private logoutFromLocal(): Observable<never> {
    CacheService.removeToken();
    //this.router.navigateByUrl('auth');
    return throwError('Unauthorized');
  }
}
