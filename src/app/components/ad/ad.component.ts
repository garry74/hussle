/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { AlertController, ToastController } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { ModalController } from '@ionic/angular';
//import SwiperCore from 'swiper';
import SwiperCore, {
  EffectCube,
  EffectFade,
  EffectCards,
  EffectCoverflow,
  EffectFlip,
  EffectCreative,
} from 'swiper';
import { UserService } from 'src/app/services/user.service';
import { ReportOptionComponent } from '../report-option/report-option.component';

SwiperCore.use([
  EffectCoverflow,
  EffectCards,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCreative,
]);
@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdComponent implements OnInit {
  texts: any;
  currentLang: string = 'en';
  @Input() globalSearch;
  @Input() from;
  @Output() index: EventEmitter<number> = new EventEmitter();
  @Output() blockIndex: EventEmitter<number> = new EventEmitter();

  id: number;
  constructor(
    private languageService: LanguageService,
    public alertController: AlertController,
    private GlobalService: GlobalService,
    private userService: UserService,
    public toastController: ToastController,
    private ChangeDetector: ChangeDetectorRef,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.languageService.currentLang.subscribe((lang) => {
      this.currentLang = lang;
    });
    this.texts = this.languageService.getText('ad');
    this.id = this.globalSearch.id;
    console.log(this.globalSearch);
  }

  ratingCalculator(rating) {
    return Math.round((+rating / 5) * 100);
  }

  onActionSelect(ev) {
    const val = ev.target.value;
    console.log(val);

    switch (val) {
      case 'call':
        this.callToUser();
        break;
      case 'delete':
        this.deleteUser(this.id);
        break;
      case 'blockUser':
        this.blockUser(this.globalSearch.user.id);
        break;
      case 'removeContact':
        this.removeContact(this.globalSearch.user.id);
        break;
      case 'reportOption':
        this.reportOption(this.globalSearch.user.id);
        break;
    }
    ev.target.value = '';
  }

  callToUser() {
    window.open(`tel:+${this.globalSearch.user.phone}`, '_system');
  }

  deleteUser(id) {
    this.presentAlertConfirm('Are you sure', () => {
      this.deleteHandler(id);
    });
  }

  deleteHandler(id) {
    this.GlobalService.DeleteGlobalSearch(id).subscribe((res) => {
      this.index.emit(id);
    });
  }

  blockUser(id) {
    this.presentAlertConfirm('Are you sure', () => {
      this.blockHandler(id);
    });
  }
  blockHandler(id) {
    this.userService.blockUnblock(id).subscribe((res: Array<any>) => {
      if (res) {
        this.blockIndex.emit(id);
      }
    });
  }

  removeContact(id) {
    this.presentAlertConfirm('Are you sure', () => {
      this.removeContactHandler(id);
    });
  }

  removeContactHandler(id) {
    this.userService.addToContact(id).subscribe(
      (res) => {
        console.log(res);

        if (res) {
          this.presentToast('contact added', 'bottom');
          this.globalSearch.user.to_contact.push(res);
          this.ChangeDetector.detectChanges();
        } else {
          this.presentToast('contact removed', 'bottom');
          this.globalSearch.user.to_contact.splice(0, 1);
          this.ChangeDetector.detectChanges();
        }
      },
      (err) => {
        this.presentToast(err.error, 'middle');
      }
    );
  }

  async reportOption(id) {
    const modal = await this.modalController.create({
      component: ReportOptionComponent,
      cssClass: 'openReportModal',
      componentProps: { item_id: this.globalSearch.user.id },
      //id: 'report-modal',
    });
    return await modal.present();
  }

  async presentAlertConfirm(message: string, handler) {
    const alert = await this.alertController.create({
      cssClass: 'confirm-alert',

      message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler,
        },
      ],
    });

    await alert.present();
  }

  async presentToast(message, position) {
    const toast = await this.toastController.create({
      position: position,
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  openMap() {
    console.log('map');
  }
}
