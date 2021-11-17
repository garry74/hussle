/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  texts: any;
  currentLang: string = 'en';
  @Input() from;
  @Input() review;
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('review');
    console.log(this.from);
    console.log(this.review);
  }

  ratingCalculator(rating) {
    return Math.round((+rating / 5) * 100);
  }
}
