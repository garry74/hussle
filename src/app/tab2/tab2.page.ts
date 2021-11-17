/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { LanguageService } from '../services/language.service';
import { LoginService } from '../services/login.service';
import { GlobalService } from '../../app/services/global.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  texts: any;
  currentLang: string = 'en';
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('content') private content: any;
  @ViewChild(IonInput) searchInput: IonInput;
  globalSearches = [];
  message;
  coordinates;
  globalSearchesParams: {};
  showInfiniteScroll = false;

  constructor(
    private languageService: LanguageService,
    private GlobalService: GlobalService,
    private ChangeDetector: ChangeDetectorRef,
    private LoginService: LoginService
  ) {}
  ngOnInit(): void {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('inbox');
    this.coordinates = this.LoginService.coordinates;

    this.GlobalService.getGlobalSearches().subscribe((res) => {
      this.globalSearchesParams = res;
      this.globalSearches = res['data'];
      if (this.globalSearchesParams['next_page_url']) {
        this.showInfiniteScroll = true;
      }
    });
  }

  deleteItem(ev) {
    const index = this.globalSearches.findIndex((item) => item.id === ev);
    this.globalSearches.splice(index, 1);
    this.ChangeDetector.detectChanges();
    console.log(this.globalSearches);
  }
  blockUser(ev) {
    const index = this.globalSearches.findIndex((item) => item.user_id === ev);
    this.globalSearches.splice(index, 1);
    this.ChangeDetector.detectChanges();
    console.log(this.globalSearches);
  }

  inputChange(searchInput) {
    console.log(searchInput.value.length);
    this.GlobalService.searchInp = searchInput.value;
    if (searchInput.value.length === 0) {
      this.message = undefined;
      this.GlobalService.getGlobalSearches().subscribe((res) => {
        this.globalSearchesParams = res;
        this.globalSearches = res['data'];
        if (this.globalSearchesParams['next_page_url']) {
          this.showInfiniteScroll = true;
        }
      });
      return false;
    }

    if (searchInput.value.length > 2) {
      if (this.LoginService.loggedIn()) {
        // this.GlobalService.searchInp = searchInput.value;
        this.GlobalService.findSearch(
          searchInput.value,
          this.coordinates
        ).subscribe((res: Array<any>) => {
          console.log(res);
          if (res['data'].length) {
            this.message = undefined;

            this.globalSearches = res['data'];
          } else {
            this.globalSearches = [];
            this.message = 'Nothing found';
          }
        });
      } else {
        this.GlobalService.findSearchWithoutLogin(
          searchInput.value,
          this.coordinates
        ).subscribe((res: Array<any>) => {
          if (Object.values(res['data']).length) {
            res['data'] = Object.values(res['data']);
            this.message = undefined;

            this.globalSearches = res['data'];
          } else {
            this.globalSearches = [];
            this.message = 'Nothing found';
          }
        });
      }
    } else {
      this.message = 'Min 3 characters.';
    }
  }

  loadData(event) {
    if (this.globalSearchesParams['next_page_url']) {
      this.showInfiniteScroll = true;
      this.GlobalService.getByLink(this.globalSearchesParams['next_page_url'], {
        coordinates: this.coordinates,
        desc: this.GlobalService.searchInp
          ? this.GlobalService.searchInp
          : null,
      }).subscribe((res: Array<any>) => {
        this.globalSearches = this.globalSearches.concat(
          Object.values(res['data'])
        );
        this.globalSearchesParams['next_page_url'] = res['next_page_url'];
        this.showInfiniteScroll = false;
        event.target.complete();
      });
    }
  }

  getGlobalSearches(event?) {
    console.log(event);
    this.GlobalService.getGlobalSearches().subscribe((res) => {
      this.globalSearchesParams = res;
      if (this.globalSearchesParams['next_page_url']) {
        this.showInfiniteScroll = true;
      }
      this.globalSearches = res['data'];
      this.content.scrollToTop(10);
      if (event) {
        event.target.disabled = false;
        event.target.complete();
      }
    });
  }
}
