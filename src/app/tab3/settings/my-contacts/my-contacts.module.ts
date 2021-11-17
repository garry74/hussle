import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyContactsPageRoutingModule } from './my-contacts-routing.module';

import { MyContactsPage } from './my-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyContactsPageRoutingModule
  ],
  declarations: [MyContactsPage]
})
export class MyContactsPageModule {}
