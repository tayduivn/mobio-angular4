/**
 * @author SonHK
 * @description config module TransationComponent
 * @version 1.0.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '../../common/directive/mobio-pagination/pagination.module';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RateService } from '../../common/service/component-service/rate.service';
import { CategoryService } from '../../common/service/common-service/category.service';
import { PromotionService } from '../../common/service/component-service/promotion.service';
import { GiftReportService } from '../../common/service/component-service/gift-report.service';
import { FootTrafficReportService } from '../../common/service/component-service/foot-traffic-report.service';
import { OfferService } from '../../common/service/component-service/offer.service';
import { VoucherService } from '../../common/service/component-service/voucher.service';
import { FileUploadModule } from 'ng2-file-upload';
import { LaddaModule } from 'angular2-ladda';
import { ToasterModule } from 'angular2-toaster';
import { BsDropdownModule } from 'ngx-bootstrap';


import { TransactionRouting } from './transaction.routing';
import { TransactionComponent } from './transaction.component';
import { PointComponent } from './point/point.component';
import { EarnPointComponent } from './earn-point/earn-point.component';
import { VoucherComponent } from './voucher/voucher.component';
import {SwapComponent} from './swap/swap.component';
import{CustomerHistoryComponent} from './customer-history/customer-history.component'


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PaginationModule,
        TabsModule,
        Daterangepicker,
        ProgressbarModule.forRoot(),
        TransactionRouting,
        FileUploadModule,
        LaddaModule,
        ToasterModule,
        BsDropdownModule,
        BsDropdownModule.forRoot()
    ],
    declarations: [
        TransactionComponent,
        PointComponent,
        EarnPointComponent,
        VoucherComponent,
        SwapComponent,
        CustomerHistoryComponent
    ],
    providers: [
        TabsetConfig,
        RateService,
        CategoryService,
        GiftReportService,
        PromotionService,
        FootTrafficReportService,
        OfferService,
        VoucherService
    ]
})

export class TransactionModule {
}
