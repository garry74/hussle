import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page as chat } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SingleChatComponent } from '../components/single-chat/single-chat.component';
//import { ChatPage } from './chat/chat.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab1PageRoutingModule],
  declarations: [chat, SingleChatComponent],
  exports: [SingleChatComponent],
})
export class Tab1PageModule {}
