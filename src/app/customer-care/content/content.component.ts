/**
 * @author ManhNV
 * @description setting component manager content
 * @version 1.0.0
 */

import {Component, OnInit} from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
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
