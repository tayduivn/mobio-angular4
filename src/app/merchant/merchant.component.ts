import {Component} from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'customer-care-component',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})

export class MerchantComponent {
  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    limit: 1,
    timeout: 5000,
    animationClass: 'flyRight'
  });

  constructor() {
  }
}
