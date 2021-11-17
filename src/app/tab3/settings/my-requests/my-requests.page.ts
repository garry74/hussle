/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonInput } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { GlobalService } from '../../../../app/services/global.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss'],
})
export class MyRequestsPage implements OnInit {
  globalSearchesParams;
  mesaage;
  mySearches;
  globalSearches;
  cordinates;
  showInfiniteScroll = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonInput) searchInput: IonInput;

  constructor(
    private httpService: HttpService,
    private GlobalService: GlobalService,
    private LoginService: LoginService
  ) {}

  ngOnInit() {
    this.GlobalService.getMySearches().subscribe((res) => {
      this.globalSearchesParams = res;

      this.globalSearches = res['data'];
      console.log('clobalSearch', this.globalSearches);
      console.log('clobalSearchParams', this.globalSearchesParams);
      if (this.globalSearchesParams['next_page_url']) {
        // this.showInfiniteScroll = true;
      }
    });
    this.cordinates = this.LoginService.coordinates;
  }

  delete(event, globalSearch) {
    console.log(event);
    console.log('ok');
  }

  loadData(event) {
    console.log(event);
    if (this.globalSearchesParams['next_page_url']) {
      event.target.disabled = false;
      this.GlobalService.getByLink(this.globalSearchesParams['next_page_url'], {
        coordinates: this.cordinates,
        desc: this.GlobalService.searchInp
          ? this.GlobalService.searchInp
          : null,
      }).subscribe((res: Array<any>) => {
        this.globalSearches = this.globalSearches.concat(
          Object.values(res['data'])
        );
        this.globalSearchesParams['next_page_url'] = res['next_page_url'];
        //  this.showInfiniteScroll = false;
        event.target.complete();
        console.log('next page url', res['next_page_url']);
        if (!res['next_page_url']) {
          event.target.disabled = true;
        }
      });
    }
  }

  inputChange(searchInput) {
    console.log(searchInput.value.length);
    this.GlobalService.searchInp = searchInput.value;
    if (searchInput.value.length === 0) {
      this.mesaage = undefined;
      this.GlobalService.getMySearches().subscribe((res) => {
        this.globalSearchesParams = res;
        console.log(res);
        this.globalSearches = res['data'];
        if (this.globalSearchesParams['next_page_url']) {
          console.log('okkk');
          this.infiniteScroll.disabled = false;
        }
      });
      console.log(this.showInfiniteScroll);
      return false;
    }

    if (searchInput.value.length > 2) {
      if (this.LoginService.loggedIn()) {
        // this.GlobalService.searchInp = searchInput.value;
        this.GlobalService.findMySearch({ desc: searchInput.value }).subscribe(
          (res: Array<any>) => {
            console.log(res);
            if (res['data'].length) {
              this.mesaage = undefined;
              this.globalSearches = res['data'];
            } else {
              this.globalSearches = [];
              this.mesaage = 'Nothing founde';
            }
            if (this.globalSearchesParams['next_page_url']) {
              this.infiniteScroll.disabled = false;
            } else {
              this.infiniteScroll.disabled = true;
            }
          }
        );
      }
    } else {
      this.mesaage = 'Min 3 characters.';
    }
  }
}
