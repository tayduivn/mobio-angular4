/**
 * @description init application
 * @version 1.0.0
 */

import { Component } from "@angular/core";
import { ToasterConfig } from "angular2-toaster";
import { Router } from "@angular/router";
import { PhoneService } from "./common/service/common-service/phone.service";

@Component({
  selector: "body",
  template: `
            <router-outlet></router-outlet>
            <mo-phone *ngIf="showCallFuntion" [phoneToCall]="phoneToCall"></mo-phone>
            `
})
export class AppComponent {
  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right",
    limit: 1,
    timeout: 3000,
    animationClass: "flyRight"
  });
  phoneToCall: string;
  showCallFuntion: boolean = false;
  constructor(private router: Router, private phoneService: PhoneService) {
    router.events.subscribe(val => {
      if (!!localStorage.getItem("__token")) {
        this.showCallFuntion = true;
        this.phoneService.phoneSubject.subscribe(data => {
          this.phoneToCall = data;
        });
        this.phoneService.onPhoneChangeSubject.subscribe(data => {
          this.phoneToCall = data;
        });
      } else {
        this.showCallFuntion = false;
      }
    });
  }
}
