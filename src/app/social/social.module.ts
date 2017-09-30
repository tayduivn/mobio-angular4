import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialRoutingModule } from './social.routing';
import { ModalModule } from 'ngx-bootstrap';
import { SocialDashboardComponent } from './social-dashboard/social-dashboard.component';
import { SocialComponent } from './social.component'


@NgModule({
  imports: [
    CommonModule,
    SocialRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    SocialDashboardComponent,
    SocialComponent
  ]
})
export class SocialModule { }
