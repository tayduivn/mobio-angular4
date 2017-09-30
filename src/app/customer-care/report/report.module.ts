import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {Daterangepicker} from 'ng2-daterangepicker';
import {FormsModule} from '@angular/forms';
import {ReportRoutingModule} from './report.routing';
import {PaginationModule} from '../../common/directive/mobio-pagination/pagination.module';
import {ReportComponent} from './report.component';
import {FootTrafficReportComponent} from './foot-traffic/foot-traffic-report.component';
import {LineCharModule} from './components/line-char/line-char.module';
import {TabsModule, TabsetConfig} from 'ngx-bootstrap/tabs';

// ===== component ======
import {GiftReportComponent} from './gift/gift-report.component';
import {ProgressComponent} from './components/progress.component';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {PromotionReportComponent} from './promotion/promotion-report.component';
import {RateComponent} from './rate/rate.component';
import {ProductReportComponent} from './product-report/product-report.component';
import {VoucherReportComponent} from './voucher/voucher-report.component';

// ===== service ========
import {ProductReportService} from '../../common/service/component-service/product-report.service';
import {RateService} from '../../common/service/component-service/rate.service';
import {CategoryService} from '../../common/service/common-service/category.service';
import {PromotionService} from '../../common/service/component-service/promotion.service';
import {GiftReportService} from '../../common/service/component-service/gift-report.service';
import {FootTrafficReportService} from '../../common/service/component-service/foot-traffic-report.service';
import {PieCharModule} from './components/pie-chart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReportRoutingModule,
    PaginationModule,
    ChartsModule,
    TabsModule,
    Daterangepicker,
    LineCharModule,
    PieCharModule,
    ProgressbarModule.forRoot()
  ],
  declarations: [
    ReportComponent,
    FootTrafficReportComponent,
    GiftReportComponent,
    ProgressComponent,
    PromotionReportComponent,
    RateComponent,
    ProductReportComponent,
    VoucherReportComponent
  ],
  providers: [
    TabsetConfig,
    ProductReportService,
    RateService,
    CategoryService,
    GiftReportService,
    PromotionService,
    FootTrafficReportService
  ]
})

export class ReportModule {
}
