import {Component, OnInit} from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'customer-care-component',
  templateUrl: './customer-care.component.html',
  styleUrls: ['./customer-care.component.scss']
})

export class CustomerCareComponent implements OnInit {
  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    limit: 1,
    timeout: 5000,
    animationClass: 'flyRight'
  });

  constructor() {
  }

  ngOnInit() {
  }
}
