import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { RegisterPageModule } from 'src/app/register/register.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule,
    ReactiveFormsModule,
    RegisterPageModule,
  ],
  declarations: [EditPage],
  exports: [],
})
export class EditPageModule {}
