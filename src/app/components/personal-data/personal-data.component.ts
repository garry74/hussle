/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {
  texts: any;
  currentLang: string = 'en';
  @Input() from;
  @Input() personalInfo;
  user;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('personalData');
    this.user = this.personalInfo;

    console.log('personalData', this.personalInfo);
  }

  ratingCalculator(rating) {
    return Math.round((+rating / 5) * 100);
  }
}
