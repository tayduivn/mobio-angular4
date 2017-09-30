import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'mo-table-statistics-call',
  templateUrl: './table-statistics-call.component.html',
  styleUrls: ['./table-statistics-call.component.scss']
})
export class TableStatisticsCallComponent implements OnInit {
  @Input("data") data: any;
  
  constructor() { }

  ngOnInit() {
  }

}
