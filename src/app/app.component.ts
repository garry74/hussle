/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Component, HostListener, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { LoginService } from './services/login.service';
import { LanguageService } from './services/language.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from './services/http.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ChatListService } from './services/chat-list.service';
import { FeedService } from './services/FeedService.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplash = true;
  playerId;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private httpService: HttpService,
    private router: Router,
    private FeedService: FeedService,
    public ToastController: ToastController,
    private LoginService: LoginService,
    private chatListService: ChatListService,
    private LanguageService: LanguageService,
    private oneSignal: OneSignal,
    private geolocation: Geolocation
  ) {
    this.initializeApp();
    this.setCordinates();
  }

  ngOnInit(): void {
    this.httpService.getUser().subscribe((res) => {
      this.LoginService.LogedUser = res;
      console.log(res);
    });
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event) {
    event.preventDefault();
  }

  closeApp() {
    this.platform.backButton.subscribeWithPriority(999999, () => {
      navigator['app'].exitApp();
      // or trigger any action you want to achieve
    });
  }

  initializeApp() {
    if (this.platform.is('android')) {
      // this.statusBar.backgroundColorByHexString("#000000");
      // this.statusBar.styleLightContent();
      this.statusBar.overlaysWebView(false);
    }
    this.platform.ready().then(() => {
      this.setupPush();
      this.splashScreen.hide();
    });
    // timer(3000).subscribe(() => (this.showSplash = false));
  }

  setCordinates() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.LoginService.coordinates =
          resp.coords.latitude + ',' + resp.coords.longitude;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setupPush() {
    const playerId = this.oneSignal.getIds().then((id) => {
      window.localStorage.setItem('playerid', id.userId);
      this.LoginService.playerId = id.userId;
      this.playerId = id.userId;
      return id.userId;
    });
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit(
      '5a67b1ad-dded-4ce2-a00f-0207db61b57f',
      '' + playerId
    );
    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.None
    );
    this.oneSignal.setSubscription(false);

    if (this.platform.is('cordova')) {
      this.platform.pause.subscribe(() => {
        this.oneSignal.setSubscription(true);
      });
    }

    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      const msg = data.payload.body;
      const title = data.payload.title;
    });

    this.oneSignal.endInit();
  }

  setupSocket() {
    this.LoginService.loggedUser().subscribe((res) => {
      this.LoginService.showLocation = res['location_visibility'];
      this.chatListService.newMessages = res['new_messages'];
      this.FeedService.connect();
      this.FeedService.Pusher.subscribe('private-channel-' + res['id']);
      this.FeedService.Pusher.bind_global((event, data) => {
        if (data && data.new_messages) {
          this.chatListService.newMessages = data.new_messages;
        }

        let haf = this.router.url.split('/');
        if (
          data &&
          data.message &&
          haf[haf.length - 1] !== data.from_id &&
          this.LoginService.loggedIn()
        ) {
          this.presentToast(data);
        }
      });
    });
  }

  socketDisconnect() {
    this.FeedService.disconnect();
  }

  async presentToast(data) {
    data.message.slice(0, 4) === 'data' ? (data.message = 'Picture') : null;
    const toast = await this.ToastController.create({
      color: 'dark',
      position: 'top',
      message: 'newmessage',
      duration: 5000,
      buttons: [
        {
          side: 'end',
          icon: 'mail',
          text: 'open',
          handler: () => {
            // this.navigate("home/chat/" + data.from_id, "left");
            this.router.navigate(['chat', `${data.from.id}`]);
          },
        },
      ],
    });
    toast.present();
  }
}
