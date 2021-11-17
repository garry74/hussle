/* eslint-disable object-shorthand */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { LoginService } from '../services/login.service';
import { VerificationCodeComponent } from '../components/verification-code/verification-code.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {
  texts: any;
  currentLang: string = 'en';
  passShow = false;
  repassShow = false;
  step: number = 1;
  phone;
  isPhoneError = false;
  isEmit = false;
  code;
  rePassRight = false;
  verifiToken;
  public forgotForm: FormGroup;

  constructor(
    private languageService: LanguageService,
    private LoginService: LoginService,
    public VerComp: VerificationCodeComponent,
    public fb: FormBuilder,
    public toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('forgot_pass');
    console.log(this.VerComp);

    this.forgotForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
      password_confirmation: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.forgotForm.controls;
  }

  onPhoneChange(ev) {
    this.phone = ev.target.value;
    console.log(this.phone);
  }

  onEmitCode(ev) {
    console.log(ev);
    if (ev) {
      this.isEmit = true;
    } else {
      this.isEmit = false;
    }
    this.code = ev;
  }

  goToVerification() {
    if (this.phone.length < 7 || this.phone.length > 15) {
      this.isPhoneError = true;
      return;
    }
    if (this.phone.length) {
      this.LoginService.sendVerificationRequest(this.phone).subscribe((res) => {
        console.log(res);
      });
    }
    this.step = 2;
  }

  onTelPress() {
    if (this.phone.length < 7 || this.phone.length > 15) {
      this.isPhoneError = true;
      return;
    } else {
      this.isPhoneError = false;
    }
  }

  goToConfirmPass() {
    this.LoginService.sendVerificationCode(this.code).subscribe(
      (res) => {
        this.verifiToken = res;
        this.step = 3;
      },
      (err) => {
        if (err.status === 422) {
          this.presentToast(err.error, 'middle');
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

  onRepassPress(ev) {
    const pass = this.forgotForm.get('password').value;

    if (ev.target.value === pass) {
      this.rePassRight = true;
    } else {
      this.rePassRight = false;
    }
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.LoginService.sendNewPassword(
        Object.assign(this.forgotForm.value, { token: this.verifiToken })
      ).subscribe(
        (res) => {
          this.router.navigate(['inbox']);
        },
        (err) => {
          this.presentToast(err.error, 'middle');
        }
      );
    } else {
      return;
    }
  }
}
