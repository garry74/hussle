/* eslint-disable no-trailing-spaces */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab3PageRoutingModule } from './tab3-routing.module';

import { Tab3Page as myProfile } from './tab3.page';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab3PageRoutingModule,
    ComponentsModule,
    SwiperModule,
  ],
  declarations: [myProfile],
})
export class Tab3PageModule {}
