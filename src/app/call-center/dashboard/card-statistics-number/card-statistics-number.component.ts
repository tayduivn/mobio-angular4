import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'mo-card-statistics-number',
  templateUrl: './card-statistics-number.component.html',
  styleUrls: ['./card-statistics-number.component.scss']
})
export class CardStatisticsNumberComponent implements OnInit {
  @Input("data") data: any;

  constructor() { }

  ngOnInit() {
  }

}
