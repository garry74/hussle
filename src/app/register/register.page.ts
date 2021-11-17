/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable curly */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { VerificationCodeComponent } from '../components/verification-code/verification-code.component';
import { LanguageService } from '../services/language.service';
import { LoginService } from '../services/login.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  texts: any;
  currentLang: string = 'en';
  minDate;
  public regForm: FormGroup;
  activeSegment: string = 'person';
  gender = false;
  step: number = 1;
  passShow = false;
  repassShow = false;
  allCountries: any[];
  allCities: any[];
  isOpenCountry = false;
  isOpenSity = false;

  @ViewChild('country') country: ElementRef<HTMLSpanElement>;
  @ViewChild('sity') sity: ElementRef<HTMLSpanElement>;

  constructor(
    private languageService: LanguageService,
    public fb: FormBuilder,
    private modalController: ModalController,
    private searchService: SearchService,
    private LoginService: LoginService
  ) {}

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('register');

    this.getLocation(0);

    this.regForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      profession: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      gender: ['male'],
      company_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      user_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      description: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
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
      country_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
    });
    const date = new Date();

    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    let _month = `${month}`;
    let _day = `${day}`;
    if (month < 10) {
      _month = `0${month}`;
    }
    if (day < 10) {
      _day = `0${day}`;
    }
    this.minDate = `${year - 18}-${_month}-${_day}`;
  }

  getLocation(val: number) {
    this.searchService.getLocations(val).subscribe((res: any[]) => {
      this.allCountries = res;
    });
  }

  onCountryChoose(id, title) {
    let index = String(id);
    console.log(index);
    this.country.nativeElement.textContent = title;
    this.regForm.get('country_id').setValue(index);
    this.searchService.getLocations(id).subscribe((res: any[]) => {
      this.allCities = res;
    });
    this.isOpenCountry = false;
    // let ctrl: AbstractControl = this.fb.control('index', [Validators.required]);
    // this.regForm.addControl('country_id', ctrl);

    //this.regForm.addControl("country_id",)
  }

  onSityChoose(id, title) {
    let index = String(id);
    this.sity.nativeElement.textContent = title;
    this.regForm.get('city_id').setValue(index);
    this.isOpenSity = false;
  }

  openCountry(ev) {
    ev.stopPropagation();
    this.isOpenCountry = !this.isOpenCountry;
  }

  openSity(ev) {
    ev.stopPropagation();
    this.isOpenSity = !this.isOpenSity;
    console.log(this.isOpenSity);
  }

  onGoToStepToo() {
    //this.isSubmitted = true;
    //if (!this.regForm.valid) return;
    if (this.activeSegment === 'person' && this.step === 1) {
      if (
        !this.regForm.controls.name.valid ||
        !this.regForm.controls.surname.valid ||
        !this.regForm.controls.profession.valid
      ) {
        return;
      }
    }

    if (this.activeSegment === 'company' && this.step === 1) {
      if (
        !this.regForm.controls.company_name.valid ||
        !this.regForm.controls.user_name.valid ||
        !this.regForm.controls.description.valid
      ) {
        return;
      }
    }

    this.step = 2;
    console.log(this.regForm.value);
    console.log(this.regForm.controls);
  }

  get errorControl() {
    return this.regForm.controls;
  }

  onGoToVerifiCode() {
    if (this.activeSegment === 'person' && this.step === 2) {
      if (!this.regForm.controls.date_of_birth.valid) {
        return;
      }
    }
    if (this.activeSegment === 'company' && this.step === 2) {
      if (!this.regForm.controls.address.valid) {
        return;
      }
    }

    if (
      this.regForm.value.password !== this.regForm.value.password_confirmation
    ) {
      return;
    }

    if (this.activeSegment === 'person') {
      this.regForm.controls['address'].clearValidators();
      this.regForm.controls['address'].updateValueAndValidity();
      this.regForm.controls['company_name'].clearValidators();
      this.regForm.controls['company_name'].updateValueAndValidity();
      this.regForm.controls['user_name'].clearValidators();
      this.regForm.controls['user_name'].updateValueAndValidity();
      this.regForm.controls['description'].clearValidators();
      this.regForm.controls['description'].updateValueAndValidity();
    }

    if (this.activeSegment === 'company') {
      this.regForm.controls['date_of_birth'].clearValidators();
      this.regForm.controls['date_of_birth'].updateValueAndValidity();
      this.regForm.controls['name'].clearValidators();
      this.regForm.controls['name'].updateValueAndValidity();
      this.regForm.controls['surname'].clearValidators();
      this.regForm.controls['surname'].updateValueAndValidity();
      this.regForm.controls['profession'].clearValidators();
      this.regForm.controls['profession'].updateValueAndValidity();
    }

    if (this.regForm.valid) {
      this.LoginService.sendVerificationRequest(
        this.regForm.get('phone').value
      ).subscribe((res) => {
        console.log(res);
      });
      console.log(this.regForm.get('phone'));
      this.openVerificAlert();
    }

    console.log(this.regForm.controls);
    console.log(this.regForm.valid);
  }

  async openVerificAlert() {
    const modal = await this.modalController.create({
      component: VerificationCodeComponent,
      cssClass: 'openVerificAlert',
      componentProps: {
        data: this.regForm.value,
        user_type: this.activeSegment,
        fromRegister: true,
      },
      //id: 'policy-modal',
    });
    return await modal.present();
  }

  onSubmit() {
    console.log(this.regForm.controls.email);
  }

  onKeyPress(event) {
    let charStr = String.fromCharCode(event.keyCode);
    if (
      /[a-z0-9]/i.test(charStr) ||
      event.keyCode === 32 ||
      event.keyCode === 46
    ) {
      return true;
    }
    return false;
  }

  onKeyPressTel(event) {
    let charStr = String.fromCharCode(event.keyCode);
    if (
      /[0-9]/i.test(charStr) ||
      event.keyCode === 32 ||
      event.keyCode === 46
    ) {
      return true;
    }
    return false;
  }

  segmentChange(ev) {
    console.log(this.activeSegment);
    console.log(ev);
  }
}
