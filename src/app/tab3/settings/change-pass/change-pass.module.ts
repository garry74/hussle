import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePassPageRoutingModule } from './change-pass-routing.module';

import { ChangePassPage } from './change-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChangePassPageRoutingModule,
  ],
  declarations: [ChangePassPage],
})
export class ChangePassPageModule {}
