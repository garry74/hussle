/* eslint-disable guard-for-in */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
// import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { LanguageService } from 'src/app/services/language.service';
import { SearchService } from 'src/app/services/search.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  texts: any;
  currentLang: string = 'en';
  minDate;
  public editForm: FormGroup;
  user;

  step: number = 1;
  passShow = false;
  repassShow = false;
  allCountres: any[];
  allSityes: any[];
  isOpenCountry = false;
  isOpenSity = false;

  @ViewChild('country') country: ElementRef<HTMLSpanElement>;
  @ViewChild('sity') sity: ElementRef<HTMLSpanElement>;

  constructor(
    private searchService: SearchService,
    private languageService: LanguageService,
    public fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    public LoginService: LoginService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.httpService.getUser().subscribe((res) => {
      this.user = res;
      this.LoginService.LogedUser = res;
      this.editForm.get('country_id').setValue(res.loc_country.id);
      this.country.nativeElement.textContent = res.loc_country.title;
      this.editForm.get('city_id').setValue(res.loc_city.id);
      this.sity.nativeElement.textContent = res.loc_city.title;
      this.searchService
        .getLocations(res.loc_country.id)
        .subscribe((cityes: any[]) => {
          this.allSityes = cityes;
        });

      this.editForm.get('name').setValue(res.name);
      this.editForm.get('surname').setValue(res.surname);
      this.editForm.get('profession').setValue(res.profession);
      this.editForm.get('gender').setValue(res.gender);
      this.editForm.get('company_name').setValue(res.company_name);
      this.editForm.get('user_name').setValue(res.user_name);
      this.editForm.get('description').setValue(res.description);
      this.editForm.get('date_of_birth').setValue(res.date_of_birth);
      this.editForm.get('address').setValue(res.address);
      this.editForm.get('phone').setValue(res.phone);
      this.editForm.get('email').setValue(res.email);

      this.chakValidation(res.user_type);
      console.log(res);
    });

    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('edit');

    this.getLocation(0);

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

    this.editForm = this.fb.group({
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
      gender: '',
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

      country_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.editForm.controls;
  }
  get getGender() {
    return this.editForm.controls['gender'].value;
  }

  chakValidation(uesrType) {
    if (uesrType === 'person') {
      this.editForm.controls['address'].clearValidators();
      this.editForm.controls['address'].updateValueAndValidity();
      this.editForm.controls['company_name'].clearValidators();
      this.editForm.controls['company_name'].updateValueAndValidity();
      this.editForm.controls['user_name'].clearValidators();
      this.editForm.controls['user_name'].updateValueAndValidity();
      this.editForm.controls['description'].clearValidators();
      this.editForm.controls['description'].updateValueAndValidity();
    }

    if (uesrType === 'company') {
      this.editForm.controls['date_of_birth'].clearValidators();
      this.editForm.controls['date_of_birth'].updateValueAndValidity();
      this.editForm.controls['name'].clearValidators();
      this.editForm.controls['name'].updateValueAndValidity();
      this.editForm.controls['surname'].clearValidators();
      this.editForm.controls['surname'].updateValueAndValidity();
      this.editForm.controls['profession'].clearValidators();
      this.editForm.controls['profession'].updateValueAndValidity();
    }
  }

  getLocation(val: number) {
    this.searchService.getLocations(val).subscribe((res: any[]) => {
      this.allCountres = res;
    });
  }

  onCountryChoose(id, title) {
    let index = String(id);
    console.log(index);
    this.country.nativeElement.textContent = title;
    this.sity.nativeElement.textContent = '';
    this.editForm.get('country_id').setValue(index);
    this.searchService.getLocations(id).subscribe((res: any[]) => {
      this.allSityes = res;
    });
    this.isOpenCountry = false;
    // let ctrl: AbstractControl = this.fb.control('index', [Validators.required]);
    // this.regForm.addControl('country_id', ctrl);

    //this.regForm.addControl("country_id",)
  }

  onSityChoose(id, title) {
    let index = String(id);
    this.sity.nativeElement.textContent = title;
    this.editForm.get('city_id').setValue(index);
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

  async presentToast(message, position) {
    const toast = await this.toastController.create({
      position: position,
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
    console.log(this.editForm.value);
    this.LoginService.updateUser(this.editForm.value).subscribe(
      (res) => {
        if (res) {
          this.LoginService.LogedUser = res;
          this.presentToast('User Updated', 'bottom');
        }
      },
      (err) => {
        for (const massage in err.error.errors) {
          this.presentToast(err.error.errors[massage], 'bottom');
        }
      }
    );
    this.editForm.reset();
    this.router.navigate(['/settings']);
  }
}
