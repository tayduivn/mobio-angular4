import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CommentRoutingModule} from './comment.routing';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {DucDatetimepickerModule} from '../../components/duc-datetimepicker/duc-datetimepicker.module';
import {CommentComponent} from './comment.component';
import {CommentService} from '../../common/service/component-service/comment.service';
import {ApiRequestService} from '../../common/service/common-service/api-request.service';
import {CarouselModule} from 'ng2-bootstrap';
import {ToasterModule} from 'angular2-toaster';
import {CustomerService} from '../../common/service/common-service/customer.service';

@NgModule({
  imports: [
    CommonModule,
    CommentRoutingModule,
    FormsModule,
    CarouselModule,
    ToasterModule,
    PopoverModule.forRoot(),
    DucDatetimepickerModule
  ],
  declarations: [CommentComponent],
  providers: [
    CommentService,
    ApiRequestService,
    CustomerService
  ]
})
export class CommentModule {
}
