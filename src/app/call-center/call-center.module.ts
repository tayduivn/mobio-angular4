import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CallCenterRoutingModule } from "./call-center.routing";
import { ModalModule } from "ngx-bootstrap";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { Daterangepicker } from "ng2-daterangepicker";
import { PaginationModule } from "../common/directive/mobio-pagination/pagination.module";

import { CallCenterDashboardComponent } from "./dashboard/dashboard.component";
import { CallCenterConfigComponent } from "./config/config.component";
import { CallCenterManageCallsComponent } from "./manage-calls/manage-calls.component";
import { CallCenterComponent } from "./call-center.component";
import { CardStatisticsChartComponent } from "./dashboard/card-statistics-chart/card-statistics-chart.component";
import { CardStatisticsNumberComponent } from "./dashboard/card-statistics-number/card-statistics-number.component";
import { TableTopCallComponent } from "./dashboard/table-top-call/table-top-call.component";
import { TableStatisticsCallComponent } from "./dashboard/table-statistics-call/table-statistics-call.component";
import { ManageCallsFilterComponent } from "./manage-calls/manage-calls-filter/manage-calls-filter.component";
import { ManageCallsTableComponent } from "./manage-calls/manage-calls-table/manage-calls-table.component";
import { ConfigBoxComponent } from './config/config-box/config-box.component';
import { ManageCallsTableRowComponent } from './manage-calls/manage-calls-table/manage-calls-table-row/manage-calls-table-row.component';
import { AudioComponent } from './audio/audio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CallCenterRoutingModule,
    ChartsModule,
    Daterangepicker,
    PaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [
    CallCenterDashboardComponent,
    CallCenterConfigComponent,
    CallCenterManageCallsComponent,
    CallCenterComponent,
    CardStatisticsChartComponent,
    CardStatisticsNumberComponent,
    TableTopCallComponent,
    TableStatisticsCallComponent,
    ManageCallsFilterComponent,
    ManageCallsTableComponent,
    ConfigBoxComponent,
    ManageCallsTableRowComponent,
    AudioComponent
  ]
})
export class CallCenterModule {}
