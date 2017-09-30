import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToasterService } from 'angular2-toaster';
import { OfferService } from '../../../common/service/component-service/offer.service';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';


import { Point } from '../point.model';



@Component({
  selector: 'voucher-component',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})

export class VoucherComponent {
  public hasBaseDropZoneOverImageDescriptions: boolean = false;
  public uploaderImageDescriptions: FileUploader = new FileUploader({ url: '' });
  public fileUploadDescription: File[] = [];
  public points: Point[];
  public point: Point;
  public isLoadingUploadPoint: boolean = false;
  public uploaderPoint: FileUploader = new FileUploader({ url: '' });
  public fileUploadPoint: File = null;
  public mail: string = '';
  public uploaderAvatar: FileUploader = new FileUploader({ url: '' });
  public fileUploadAvatar: File = null;
  public invoid: string;
  public customerCode: string;


  @ViewChild('elInputFileImageDescriptions') elInputFileImageDescriptions: ElementRef;
  @ViewChild('uploadPointModal') public uploadPointModal: ModalDirective;
  @ViewChild('modalCreateEditPoint') public modalCreateEditPoint: ModalDirective;




  constructor(private renderer: Renderer,
    private _toasterService: ToasterService,
    private _offerService: OfferService,
    private _router: Router
  ) { }
  /**
    * @method changeUrlFileUploadAvatar
    * @description change url file upload for avatar
    * @returns {boolean}
    */
  public changeUrlFileUploadAvatar(event: EventTarget) {
    let fileQueue = this.uploaderAvatar.queue;
    if (fileQueue.length > 1) {
      this.uploaderAvatar.queue[0].remove();
    }
    let self = this;
    let reader = new FileReader();
    reader['onload'] = function (e: any) {
      self.uploaderAvatar.queue[0].url = e.target.result;
      self.fileUploadAvatar = self.uploaderAvatar.queue[0]._file;
    };
    reader.readAsDataURL(fileQueue[0]._file);
  }
  /**
  * @method fileOverBaseUploadImageDescriptions
  * @description file over in border upload image description.
  * @param e
  */
  public fileOverBaseUploadImageDescriptions(e: any): void {
    this.hasBaseDropZoneOverImageDescriptions = e;
  }

  /**
    * @method changeUrlFileUploadImageDescriptions
    * @description get url file upload list image description
    * @returns {boolean}
    */
  public changeUrlFileUploadImageDescriptions() {
    let fileQueueDescription = this.uploaderImageDescriptions.queue;
    this.fileUploadDescription = [];
    let self = this;
    for (let i = 0; i < fileQueueDescription.length; i++) {
      let reader = new FileReader();
      reader['onload'] = function (e: any) {
        self.uploaderImageDescriptions.queue[i].url = e.target.result;
        self.fileUploadDescription.push(self.uploaderImageDescriptions.queue[i]._file);
      };
      reader.readAsDataURL(fileQueueDescription[i]._file);
    }
  }

  /**
  * @method chooseFileUpdateImageDescriptions
  * @description click to choose file to upload image Description
  * @param event
  */
  public chooseFileUpdateImageDescriptions(event: any) {
    let eventClick = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.elInputFileImageDescriptions.nativeElement, 'dispatchEvent', [eventClick]);
  }


  /**
     * @method uploadPoint
     * @description upload file Point and send mail
     */
  public uploadPoint() {
    this.isLoadingUploadPoint = true;
    let timer = setTimeout(() => {
      this.isLoadingUploadPoint = false;
    }, 1000);
    if (this.uploaderPoint.queue.length <= 0) {
      this._toasterService.pop('error', null, 'Bạn cần chọn file để upload.');
      return;
    }
    let file = [];
    file.push({
      name: 'file',
      files: [this.fileUploadPoint]
    });
    // this._offerService._______________________________(file)
    // .subscribe(data => {
    //   this._toasterService.pop('success', null,
    //     data.D);
    //   this.uploadOfferModal.hide();
    // }, this.funcError);

    // sendMail(this.mail){}
  }

  /**
    * @method funcError
    * @description execute error function
    * @param err
    */
  funcError = (err) => {
    this._toasterService.clear();
    this._toasterService.pop('error', null, err.D);
    if (err.status === 401) {
      Observable.timer(2000)
        .subscribe(() => {
          this._router.navigate(['login']);
        });
    }
  }

}
