import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'mo-manage-calls-filter',
  templateUrl: './manage-calls-filter.component.html',
  styleUrls: ['./manage-calls-filter.component.scss']
})
export class ManageCallsFilterComponent implements OnInit {
  public stringdaterangeFitter: string = '';
  public optionsDateFitter: any = {
      locale: { format: 'DD/MM/YYYY' },
      alwaysShowCalendars: false,
      startDate: moment().subtract(1, 'month'),
      endDate: moment()
  };
  constructor() { }

  ngOnInit() {
  }
  selectedDateFitter(e) {
    console.log(e);
  }
}
