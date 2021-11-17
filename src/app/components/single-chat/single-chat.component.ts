/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.scss'],
})
export class SingleChatComponent implements OnInit {
  @Input('chat') chat;
  created_at: Date;
  date_now: number = Date.now();
  deltaDateInMinute: number;
  number_created_at: number;
  dateText: string;
  showFullDate = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.number_created_at = new Date(this.chat.created_at).getTime();
    this.deltaDateInMinute = Math.round(
      (this.date_now - this.number_created_at) / 60000 -
        new Date().getTimezoneOffset()
    );

    this.convertToDate();
    console.log(this.showFullDate);
    console.log(this.deltaDateInMinute);
    console.log(this.chat);
  }

  convertToDate() {
    if (this.deltaDateInMinute < 60) {
      this.deltaDateInMinute = Math.round(this.deltaDateInMinute);
      this.dateText = 'minutes';
    } else if (this.deltaDateInMinute > 60 && this.deltaDateInMinute < 1440) {
      this.deltaDateInMinute = Math.round(this.deltaDateInMinute / 60);
      this.dateText = 'hours';
    } else if (this.deltaDateInMinute > 1440) {
      this.deltaDateInMinute = Math.round(this.deltaDateInMinute / 1440);
      if (this.deltaDateInMinute > 10) {
        this.showFullDate = true;
      }
      this.dateText = 'days';
    }
  }

  navigateTo(event, id) {
    event.stopPropagation();
    console.log('id', id);
    // this.router.navigate([`otherprofile/${id}`]);
  }
}
