import {Component, OnInit} from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    limit: 1,
    timeout: 5000,
    animationClass: 'flyRight'
  });
}
