/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import SwiperCore, {
  EffectCube,
  EffectFade,
  EffectCards,
  EffectCoverflow,
  EffectFlip,
  EffectCreative,
} from 'swiper';
import { LoginService } from '../services/login.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { SliderModalComponent } from '../components/slider-modal/slider-modal.component';
import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';
import { HelpModalComponent } from '../components/help-modal/help-modal.component';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

SwiperCore.use([
  EffectCoverflow,
  EffectCards,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCreative,
]);

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  images: any[];
  user;
  addPhoto: string = '../../assets/icon/add-photo.jpg';
  imagesCount: number;
  activeSegment: string = 'myRequests';
  constructor(
    private LoginService: LoginService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private ChangeDetector: ChangeDetectorRef,
    private modalController: ModalController,
    private userService: UserService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.httpService.getUser().subscribe((res) => {
      this.LoginService.LogedUser = res;
      this.user = res;
      this.images = this.user?.image;
      this.initImages(this.images);
      console.log('logd user', this.user);
      console.log('image user', this.images);
    });

    // this.images = [
    //   'http://hussle.webapricot.am/storage/users/109/1620822319.jpeg',
    //   'http://hussle.webapricot.am/storage/users/109/1620822342.jpeg',
    // ];

    this.userService._deletedImageUrl.subscribe((res) => {
      const index = this.images.indexOf(res);
      this.images.splice(index, 1);
      this.ChangeDetector.detectChanges();
      this.initImages(this.images);
    });

    this.LoginService.toglePhoneVisibilitySubject
      .pipe(debounceTime(2000))
      .subscribe((visibility) => {
        this.LoginService.setPhoneVisibility(visibility).subscribe((res) => {
          this.LoginService.LogedUser.phone_visibility = res;
          this.user.phone_visibility = res;
        });
      });

    this.LoginService.togleEmailVisibilitySubject
      .pipe(debounceTime(2000))
      .subscribe((visibility) => {
        this.LoginService.setEmailVisibility(visibility).subscribe((res) => {
          this.LoginService.LogedUser.email_visibility = res;
          this.user.email_visibility = res;
        });
      });
  }

  initImages(arr: string[]) {
    console.log('arr', arr);
    this.imagesCount = arr?.length;
    if (this.imagesCount == 0) {
      console.log('0', arr);
      for (let i = 0; i < 3; i++) {
        arr.push(this.addPhoto);
      }
    }
    if (this.imagesCount == 1) {
      console.log('1', arr);
      for (let i = 0; i < 2; i++) {
        arr.push(this.addPhoto);
      }
    }
    if (this.imagesCount == 2) {
      console.log('2', arr);
      arr.push(this.addPhoto);
    }
    this.ChangeDetector.detectChanges();
  }

  navigate() {
    this.router.navigate(['/settings']);
  }

  onSliderPhotoClick(img) {
    const filtredImages = this.images.filter((img) => img != this.addPhoto);
    if (img === this.addPhoto) {
      this.presentActionSheet();
      console.log('no Photo');
    } else {
      this.openSliderModal(filtredImages);
      console.log('yes Photo');
      console.log('filtredImages', filtredImages);
    }
  }

  imageFromCamera() {
    const options: CameraOptions = {
      quality: 75,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
    };
    this.camera.getPicture(options).then((imageData) => {
      //this.LoginService.LogedUser.image = 'data:image/jpeg;base64,' + imageData;
      this.LoginService.editUserimage({
        image_url: 'data:image/jpeg;base64,' + imageData,
      }).subscribe((res) => {
        // if (this.imagesCount < 2) {
        //   this.images[1] = res;
        // }
        // if (this.imagesCount == 2) {
        //   this.images[2] = res;
        // }
        // if (this.imagesCount > 2) {
        //   this.images.push(res);
        // }

        this.images.push(res);
        if (this.images.includes(this.addPhoto)) {
          const index = this.images.indexOf(this.addPhoto);
          this.images.splice(index, 1);
        }

        this.ChangeDetector.detectChanges();
        console.log('from Local', res);
      });
    });
  }
  imageFromLocala() {
    const options: CameraOptions = {
      quality: 75,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
    };
    this.camera.getPicture(options).then((imageData) => {
      // this.LoginService.LogedUser.image = 'data:image/jpeg;base64,' + imageData;
      this.LoginService.editUserimage({
        image_url: 'data:image/jpeg;base64,' + imageData,
      }).subscribe((res) => {
        this.images.push(res);
        if (this.images.includes(this.addPhoto)) {
          const index = this.images.indexOf(this.addPhoto);
          this.images.splice(index, 1);
        }
        this.ChangeDetector.detectChanges();
        console.log('from Local', res);
      });
    });
  }

  async openSliderModal(img: any[]) {
    const modal = await this.modalController.create({
      component: SliderModalComponent,
      cssClass: 'open-slider-modal',
      backdropDismiss: true,

      componentProps: {
        filtridImages: img,
        fromMyProfile: true,
      },
      //id: 'slider-modal',
    });

    modal.onDidDismiss().then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        this.presentActionSheet();
      }
    });
    return await modal.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Photo',
      buttons: [
        {
          text: 'camera',
          icon: 'camera',
          handler: () => {
            this.imageFromCamera();
          },
        },
        {
          text: 'photos',
          icon: 'image',
          handler: () => {
            this.imageFromLocala();
          },
        },
      ],
    });
    await actionSheet.present();
  }

  segmentChange(ev) {
    console.log(this.activeSegment);
    console.log(ev);
  }

  async openHelpModal() {
    const modal = await this.modalController.create({
      component: HelpModalComponent,
      cssClass: 'open-help-modal',
      backdropDismiss: true,
      showBackdrop: true,
      //id: 'help-modal',
    });

    return await modal.present();
  }
}
