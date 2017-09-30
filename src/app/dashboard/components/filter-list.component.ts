import { Component, Input } from '@angular/core';

@Component({
  templateUrl: 'filter-list.component.html',
  selector: 'mo-filter-list',
  styleUrls: ['filter-list.component.scss'],
  inputs: ['data']
})

export class FilterListComponent {
  public data: any;
  constructor() {
  }
}
