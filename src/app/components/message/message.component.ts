/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  texts: any;
  currentLang: string = 'en';

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('message');
  }
}
