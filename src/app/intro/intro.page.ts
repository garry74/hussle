/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { ModalController } from '@ionic/angular';
import { PolicyComponent } from '../components/policy/policy.component';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
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
    this.texts = this.languageService.getText('intro');

    localStorage.setItem('intro', 'intro');
  }

  async onModalOpen() {
    const modal = await this.modalController.create({
      component: PolicyComponent,
      cssClass: 'my-custom-class',
      //id: 'policy-modal',
    });
    return await modal.present();
  }
}
