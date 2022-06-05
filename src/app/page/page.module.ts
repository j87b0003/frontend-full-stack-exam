import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from 'app/widget/widget.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { UiSwitchModule } from 'ngx-ui-switch';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StatisticsComponent } from './statistics/statistics.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    NgbModule,
    TagInputModule,
    UiSwitchModule,
    QRCodeModule,
    NgxSpinnerModule
  ],
  exports: [],
  declarations: [
    ProfileComponent,
    StatisticsComponent,
    InfoComponent
  ],
  providers: [DatePipe],
})
export class PageModule { }
