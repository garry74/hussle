/* eslint-disable no-trailing-spaces */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { AppComponent } from '../app.component';
import { RegisterPage } from './register.page';
import { ComponentsModule } from '../components/components.module';
import { SearchPipe } from '../pipes/search.pipe';

@NgModule({
  declarations: [RegisterPage, SearchPipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    RegisterPageRoutingModule,
  ],
  exports: [SearchPipe],
  providers: [AppComponent],
})
export class RegisterPageModule {}
