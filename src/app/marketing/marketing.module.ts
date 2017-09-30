import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketingComponent } from './marketing.component';
import { MaketingRoutingModule } from './marketing.routing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule, AgmMap } from '@agm/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { CKEditorModule } from 'ng2-ckeditor';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LineCharModule } from '../customer-care/report/components/line-char/line-char.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DucDatetimepickerModule } from '../components/duc-datetimepicker/duc-datetimepicker.module';
import { MarketingDashboardComponent } from './marketing-dashboard/marketing-dashboard.component';
import { MarketingReportComponent } from './marketing-report/marketing-report.component';
import { MarketingCampaignComponent } from './marketing-campaign/marketing-campaign.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaketingRoutingModule,
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    CKEditorModule,
    ModalModule,
    RoundProgressModule,
    DucDatetimepickerModule,
    ChartsModule,
    Daterangepicker,
    LineCharModule,
    TabsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALlHESt8QEsvJq6ffXbC4T9JhBjMTiXm8',
      libraries: ['places']
    })
  ],
  declarations: [
    MarketingComponent,
    MarketingDashboardComponent,
    MarketingReportComponent,
    MarketingCampaignComponent
  ]
})
export class MarketingModule { }
