/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  texts: any;
  currentLang: string = 'en';
  isPhoneVisible;
  isEmailVisible;
  isMyActivityVisible;
  isFingerprintUnloc;
  togleMyActivitySubject = new Subject();
  togleFingerprintSubject = new Subject();

  constructor(
    private LoginService: LoginService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('settings');
    this.isPhoneVisible = this.LoginService.LogedUser?.phone_visibility;
    this.isEmailVisible = this.LoginService.LogedUser?.email_visibility;
    this.isMyActivityVisible = this.LoginService.LogedUser?.activity_visibility;
    this.isFingerprintUnloc =
      this.LoginService.LogedUser?.fingerptint_visibility;

    this.togleMyActivitySubject.pipe(debounceTime(2000)).subscribe((res) => {
      this.LoginService.setActivity(this.isMyActivityVisible).subscribe(
        (res) => {
          this.LoginService.LogedUser.activity_visibility = res;
          this.isMyActivityVisible = res;
        }
      );
    });
    this.togleFingerprintSubject.pipe(debounceTime(2000)).subscribe((res) => {
      this.LoginService.setFingerprint(this.isFingerprintUnloc).subscribe(
        (res) => {
          this.LoginService.LogedUser.fingerptint_visibility = res;
          this.isFingerprintUnloc = res;
        }
      );
    });
  }

  onChangePhoneVisibility() {
    this.LoginService.toglePhoneVisibilitySubject.next(this.isPhoneVisible);
  }
  onChangeEmailVisibility() {
    this.LoginService.togleEmailVisibilitySubject.next(this.isEmailVisible);
  }
  onChangeMyActivity() {
    this.togleMyActivitySubject.next();
  }

  onChangeFingerprintUnloc() {
    this.togleFingerprintSubject.next();
  }
}
