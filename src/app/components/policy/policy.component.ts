/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  texts: any;
  currentLang: string = 'en';

  constructor(
    private languageService: LanguageService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('policy');
  }

  back() {
    this.modalController.dismiss();
  }
}
