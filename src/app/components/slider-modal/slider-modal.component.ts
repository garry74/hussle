/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-slider-modal',
  templateUrl: './slider-modal.component.html',
  styleUrls: ['./slider-modal.component.scss'],
})
export class SliderModalComponent implements OnInit, AfterViewInit {
  @Input() filtridImages;
  @Input() fromMyProfile;

  @ViewChild('newSwiper') newSwiper: any;
  swiperRef;
  activSlidIndex;

  constructor(
    public alertController: AlertController,
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log(this.filtridImages);
    console.log(this.fromMyProfile);
  }

  ngAfterViewInit(): void {
    this.swiperRef = this.newSwiper.swiperRef;
    this.activSlidIndex = this.swiperRef.realIndex - 1;
    console.log(this.activSlidIndex);
    //console.log('swipRef', this.swiper);
  }

  dismiss(state: boolean) {
    this.modalController.dismiss({ data: state });
  }

  onActionSelect(ev) {
    const val = ev.target.value;
    if (val === 'Delete') {
      const url = this.filtridImages[this.activSlidIndex];
      this.deleteImg(url, this.activSlidIndex);
      // ev.target.value = '';
      this.dismiss(false);
    } else if (val === 'Upload new photo') {
      this.dismiss(true);
    }
  }

  deleteImg(url, ind) {
    this.presentAlertConfirm('Are you sure', () => {
      this.onDelImg(url, ind);
    });
  }
  onDelImg(url, ind) {
    this.userService.postDeleteUserPhoto(ind).subscribe((res) => {
      if (res) {
        this.userService._deletedImageUrl.next(url);
        console.log('on delete in slider modal', res);
      }
    });
    console.log('url frpm slider modal', url);
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

  onSwiper(ev) {}
  onSlideChange() {
    this.activSlidIndex = this.swiperRef?.realIndex;
    console.log(this.activSlidIndex);
    // this.swiperRef.
    // if (this.newSwiper.swiperRef.imagesToLoad) {
    //   this.newSwiper.swiperRef.imagesToLoad.forEach((img) => {
    //     console.log(img);
    //   });
    // }
  }
}
