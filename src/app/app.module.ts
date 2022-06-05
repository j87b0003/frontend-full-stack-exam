import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from "@angular/fire";

import { NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { WINDOW_PROVIDERS } from './shared/services/window.service';

import { AlertsService } from './widget/alerts/alerts.service';
import { AlertsComponent } from './widget/alerts/alerts.component';
import { TagInputModule } from 'ngx-chips';
import { UiSwitchModule } from 'ngx-ui-switch';
import { QRCodeModule } from 'angularx-qrcode';

var firebaseConfig = {
  apiKey: "AIzaSyBIbMs4vnaUufly4DVF_kZo5EzVWkX6J1Y",
  authDomain: "money-288102.firebaseapp.com",
  databaseURL: "https://money-288102.firebaseio.com",
  projectId: "money-288102",
  storageBucket: "money-288102.appspot.com",
  messagingSenderId: "383778290422",
  appId: "1:383778290422:web:725b940b2b738fcf694ad7",
  measurementId: "G-8RXLMNYE6S"
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, AlertsComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule,
    NgxSpinnerModule,
    DeviceDetectorModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCRx1gY5vDhw-QBvcvNhTl3xq9rgFeDcHw'
    }),
    PerfectScrollbarModule,
    TagInputModule,
    UiSwitchModule,
    QRCodeModule,
    NgbTimepickerModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertsService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
