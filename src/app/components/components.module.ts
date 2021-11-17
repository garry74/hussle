import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AdComponent } from './ad/ad.component';
import { SwiperModule } from 'swiper/angular';
import { DistanceValuePipe } from '../pipes/distance-value.pipe';
import { ReportOptionComponent } from './report-option/report-option.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { ReviewComponent } from './review/review.component';
import { SliderModalComponent } from './slider-modal/slider-modal.component';
import { HelpModalComponent } from './help-modal/help-modal.component';

@NgModule({
  declarations: [
    AdComponent,
    DistanceValuePipe,
    ReportOptionComponent,
    PersonalDataComponent,
    ReviewComponent,
    SliderModalComponent,
    HelpModalComponent,
  ],
  imports: [IonicModule, CommonModule, FormsModule, SwiperModule],
  exports: [
    AdComponent,
    DistanceValuePipe,
    ReportOptionComponent,
    PersonalDataComponent,
    ReviewComponent,
    SliderModalComponent,
    HelpModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
