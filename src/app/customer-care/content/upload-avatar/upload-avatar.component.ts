/**
 * @author ManhNV, Duy
 * @description manager promotions
 * @version 1.0.0
 * @todo datepicker
 */

import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ToasterService} from 'angular2-toaster';


@Component({
  selector: 'upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avartar.component.scss']
})

export class UploadAvatarComponent implements OnInit {
  // declare native element

  @ViewChild('fileUrlAvatar') fileUrlAvatar: ElementRef;
  @ViewChild('outImgAvatar') outImgAvatar: ElementRef;

  public imagesAvatar: any = null;
  // data config ckeditor view
  public config = {
  };

  constructor() {
  }

  ngOnInit() {
  }
  public getUrlFileUploadAvatar() {
    let fileUpload = this.fileUrlAvatar.nativeElement.files;
    if (!fileUpload) {
      return false;
    }
    this.imagesAvatar = [];
    let self = this;
    for (let i = 0; i < fileUpload.length; i++) {
      let reader = new FileReader();
      reader['onload'] = function (e: any) {
        self.imagesAvatar.push({src: e.target.result, stt: i});
      };
      reader.readAsDataURL(fileUpload[i]);
    }
  }
}
