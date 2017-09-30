import{Component} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {FileUploader} from 'ng2-file-upload';
import ckConfig from '../../../common/config/ck.config';
import {Paging} from '../../../common/model/paging';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
    selector:'customer-history',
    templateUrl: './customer-history.component.html',
    styleUrls: ['./customer-history.component.scss']
})

export class CustomerHistoryComponent{

}