/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss'],
})
export class HelpModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
}
