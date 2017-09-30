import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PieChartComponent} from './pie-chart.component';
import {ChartsModule} from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [PieChartComponent],
  exports: [PieChartComponent]
})

export class PieCharModule {
}
