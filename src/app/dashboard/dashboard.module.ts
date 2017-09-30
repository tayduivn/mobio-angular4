import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { Daterangepicker } from 'ng2-daterangepicker';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { StatusWidgetComponent } from './components/status-widget.component';
import { LineChartComponent } from './components/line-chart.component';
import { FilterListComponent } from './components/filter-list.component';
import { RatingComponent } from './components/rating.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    Daterangepicker,
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    StatusWidgetComponent,
    LineChartComponent,
    FilterListComponent,
    RatingComponent
  ]
})
export class DashboardModule {
}
