import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPassPageRoutingModule } from './forgot-pass-routing.module';

import { ForgotPassPage } from './forgot-pass.page';
import { VerificationCodeComponent } from '../components/verification-code/verification-code.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgotPassPageRoutingModule,
  ],
  declarations: [ForgotPassPage, VerificationCodeComponent],
  exports: [VerificationCodeComponent],
  providers: [VerificationCodeComponent],
})
export class ForgotPassPageModule {}
