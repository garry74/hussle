/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable object-shorthand */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
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
export class UserService {
  _deletedImageUrl: Subject<string> = new Subject<string>();
  // _uploadImageUrl: Subject<string> = new Subject<string>();
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

  getBalcklist() {
    const headers = this.myHeaders();
    return this.http
      .get(this.EnvService.API_URL + 'user/blocked-users ', { headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  blockUnblock(id) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'user/block-user ',
        { id: id },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  blockUnblockMultiple(ids) {
    const headers = this.myHeaders();
    return this.http.post(
      `${this.EnvService.API_URL}user/block-multiple-users`,
      ids,
      { headers }
    );
  }

  getOtherUser(id) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'user/other-user ',
        { id: id },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  addToContact(id) {
    const headers = this.myHeaders();
    return this.http
      .post(
        this.EnvService.API_URL + 'user/addContact',
        { id: id },
        { headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  userFind(val: any): Observable<any> {
    const headers = this.myHeaders();
    return this.http.post(
      `${this.EnvService.API_URL}user/find`,
      { value: val },
      { headers: headers }
    );
  }

  getContacts(searchBy?: string): Observable<any> {
    const headers = this.myHeaders();
    const options = { headers };
    if (searchBy) {
      options['params'] = { desc: searchBy };
    }
    return this.http.get(`${this.EnvService.API_URL}contacts`, options);
  }

  removeContact(contactId: number): Observable<any> {
    const headers = this.myHeaders();
    return this.http.post(
      `${this.EnvService.API_URL}contacts/remove`,
      { contact_id: contactId },
      { headers }
    );
  }

  shopBuyExtraMiles(miles) {
    const headers = this.myHeaders();
    return this.http.post(
      `${this.EnvService.API_URL}user/shop/extra-miles`,
      { miles: miles },
      { headers }
    );
  }

  postDeleteUserPhoto(ind) {
    const headers = this.myHeaders();
    return this.http.post(
      `${this.EnvService.API_URL}user/delete/image`,
      { ind: ind },
      { headers }
    );
  }

  getAllProfessions(): Observable<any> {
    const headers = this.myHeaders();
    return this.http.get(`${this.EnvService.API_URL}user/professions`, {
      headers,
    });
  }

  requestReport(id: number, report_id: number): Observable<any> {
    const headers = this.myHeaders();
    return this.http.post(
      `${this.EnvService.API_URL}request/report`,
      { id, report_id },
      { headers }
    );
  }
}
