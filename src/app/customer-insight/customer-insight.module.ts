/**
 * @module customerInsight
 * @author TungNT- ManhNV
 * @description report customer insight
 * @version 1.0.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Daterangepicker } from 'ng2-daterangepicker';
import { LineCharModule } from '../customer-care/report/components/line-char/line-char.module';
import { CustomerInsightRoutingModule } from './customer-insight.routing';
import { CardPatternService } from '../common/service/component-service/card-pattern.service';
import { CustomerInsightsService } from '../common/service/component-service/customer-insights.service';
import { CustomerInsightComponent } from './customer-insight.component'
import { PieCharModule } from '../customer-care/report/components/pie-chart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    CustomerInsightRoutingModule,
    ChartsModule,
    LineCharModule,
    PieCharModule,
    TooltipModule.forRoot(),
    Daterangepicker
  ],
  declarations: [CustomerInsightComponent],
  providers: [
    CardPatternService,
    CustomerInsightsService
  ]
})

export class CustomerInsightModule {
}
