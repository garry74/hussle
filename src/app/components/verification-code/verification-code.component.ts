/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';
import { LoginService } from '../../services/login.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
//import { EventEmitter } from 'stream';

const VERIFICATION_CODE_EXPIRED = 120;

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
})
export class VerificationCodeComponent implements OnInit, OnDestroy {
  seconds: number;
  texts: any;
  currentLang: string = 'en';
  interval: any;
  isExpiredCode = false;
  code = '';
  buttonDisabled = false;
  errCode = false;
  user;

  @Input() data;
  @Input() user_type;
  @Input() fromRegister;
  @Output() chanedCode: EventEmitter<any> = new EventEmitter();

  constructor(
    private languageService: LanguageService,
    private modalController: ModalController,
    private LoginService: LoginService,
    private geolocation: Geolocation,
    private router: Router,
    public AppComponent: AppComponent,
    public toastController: ToastController
  ) {}
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  ngOnInit() {
    console.log(this.data);
    this.seconds = VERIFICATION_CODE_EXPIRED;
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('verification');

    this.interval = setInterval(() => {
      this.seconds--;
      console.log('interval');
      if (this.seconds === 0) {
        this.isExpiredCode = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  resendCode() {
    if (!this.isExpiredCode) {
      return;
    }
    this.seconds = VERIFICATION_CODE_EXPIRED;
    this.code = '';
    this.interval = setInterval(() => {
      this.seconds--;
      if (this.seconds === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
    this.isExpiredCode = false;
    this.buttonDisabled = false;
    this.LoginService.sendVerificationRequest(this.data.phone).subscribe(
      (res) => {
        console.log(res);
      }
    );
    // this.authService.getVerificationCodeLogin(this.data).subscribe((res) => {
    //   this.seconds = VERIFICATION_CODE_EXPIRED;
    //   this.isExpiredCode = false;
    //   this.interval = setInterval(() => {
    //     this.seconds--;
    //     if (this.seconds === 0) {
    //       this.isExpiredCode = true;
    //       clearInterval(this.interval);
    //     }
    //   }, 1000);
    // });
  }

  onNumberChange(event) {
    event.target.value = event.target.value.replace(/[^0-9]*/g, '');
    this.code = event.target.value;
    this.chanedCode.emit(this.code);
  }

  setCordinates() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        const data = resp.coords.latitude + ',' + resp.coords.longitude;
        this.LoginService.setCordinates(data).subscribe((res) => {});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitCode() {
    this.buttonDisabled = true;
    this.data.user_type = this.user_type;
    this.data.phone_verify_code = this.code;

    this.LoginService.regUser(this.data).subscribe(
      (res) => {
        if (res['message']) {
          this.presentToast(res['message'], 'bottom');
          let dataInfo = {
            email: this.data.email,
            password: this.data.password,
            //remamber: false,
          };
          this.LoginService.login(dataInfo).subscribe((res) => {
            window.localStorage.setItem('hussle_token', res['hussle_token']);
            this.router.navigate(['../']);
            this.presentToast('logged in', 'bottom');
            this.AppComponent.setupSocket();
            this.modalController.dismiss();
          });
        }
      },
      (err) => {
        this.buttonDisabled = false;
        this.errCode = true;
        console.log(err.error.errors);
        for (const massage in err.error.errors) {
          this.presentToast(err.error.errors[massage], 'bottom');
        }
      }
    );
  }

  async presentToast(message, position) {
    const toast = await this.toastController.create({
      position: position,
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  close(success = false) {
    this.modalController.dismiss(success);
  }
}
