import {Component} from '@angular/core';

@Component({
  templateUrl: 'status-widget.component.html',
  styleUrls: ['status-widget.component.scss'],
  selector: 'mo-status-widget',
  inputs: ['data']
})
export class StatusWidgetComponent {
  public data: any;

  constructor() {
  }

}
