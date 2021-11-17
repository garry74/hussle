/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LanguageService } from '../services/language.service';
import { AppComponent } from '../app.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  texts: any;
  currentLang: string = 'en';
  passShow = false;
  public logForm: FormGroup;
  user;

  constructor(
    private languageService: LanguageService,
    public fb: FormBuilder,
    private geolocation: Geolocation,
    private router: Router,
    public toastController: ToastController,
    private LoginService: LoginService,
    public AppComponent: AppComponent
  ) {}

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('login');

    this.logForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.logForm.controls;
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

  onSubmit() {
    if (!this.logForm.valid) {
      return false;
    } else {
      this.LoginService.login(this.logForm.value).subscribe(
        (res) => {
          console.log(res);
          if (res['hussle_token']) {
            window.localStorage.setItem('hussle_token', res['hussle_token']);
            this.user = res['user'];
            this.setCordinates();
            this.AppComponent.setupSocket();
            this.router.navigate(['../']);
          }
        },
        (err) => {
          console.log('err', err);
          if (err.error.message === 'Unauthorized') {
            this.presentToast('Wrong Login/password', 'middle');
          } else if (err.error.errors.email) {
            this.presentToast(err.error.errors.email, 'middle');
          }
        }
      );
    }
  }

  async presentToast(message, position) {
    const toast = await this.toastController.create({
      position: position,
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
