import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FeedService } from './services/FeedService.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { SearchPipe } from './pipes/search.pipe';
import { NoArrowDirective } from './directives/NoArrow.directive';
import { ComponentsModule } from './components/components.module';
import { SwiperModule } from 'swiper/angular';
import { Tab3PageModule } from './tab3/tab3.module';

@NgModule({
  declarations: [AppComponent, NoArrowDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    SwiperModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    Tab3PageModule,
    HttpClientModule,
  ],
  exports: [NoArrowDirective],
  providers: [
    StatusBar,
    SplashScreen,
    FeedService,
    Camera,
    OneSignal,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
