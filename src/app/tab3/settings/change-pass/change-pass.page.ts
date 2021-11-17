/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {
  texts: any;
  currentLang: string = 'en';
  passShow = false;
  passShow1 = false;
  passShow2 = false;
  public changePass: FormGroup;

  constructor(
    private languageService: LanguageService,
    public Router: Router,
    public fb: FormBuilder,
    public toastController: ToastController,
    private LoginService: LoginService,
    private router: Router
  ) {
    this.changePass = this.fb.group({
      curPass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
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

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('change_pass');
  }

  get errorControl() {
    return this.changePass.controls;
  }

  async presentToast(message, position) {
    const toast = await this.toastController.create({
      position: position,
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  onSubmit() {
    if (
      this.changePass.get('password').value &&
      this.changePass.get('password').value !==
        this.changePass.get('password_confirmation').value
    ) {
      this.presentToast(
        'new password and confirm password do not match',
        'bottom'
      );
      return;
    }
    if (this.changePass.invalid) {
      return;
    }

    this.LoginService.editUser(this.changePass.value).subscribe(
      (res) => {
        if (res) {
          this.presentToast('Password has been changed', 'bottom');
          this.router.navigate(['/settings']);
        }
      },
      (err) => {
        this.presentToast(err.error.message, 'bottom');
      }
    );

    console.log(this.changePass.value);
  }
}
