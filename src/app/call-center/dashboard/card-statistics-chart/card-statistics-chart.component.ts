import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'mo-card-statistics-chart',
  templateUrl: './card-statistics-chart.component.html',
  styleUrls: ['./card-statistics-chart.component.scss']
})
export class CardStatisticsChartComponent implements OnInit {
  @Input("data") data: any;
  @Input("legend") legend: any;
  
  constructor() { }

  ngOnInit() {
  }

}
