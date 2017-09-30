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
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})

export class UploadImagesComponent implements OnInit {
  // declare native element

  @ViewChild('fileUrl') fileUrl: ElementRef;
  @ViewChild('outImg') outImg: ElementRef;
  public images: any = [];
  // data config ckeditor view
  public config = {
  };

  constructor() {
  }

  ngOnInit() {
  }
  public getUrlFileUpload() {
    let fileUpload = this.fileUrl.nativeElement.files;

    if (!fileUpload) {
      return false;
    }
    let self = this;
    for (let i = 0; i < fileUpload.length; i++) {
      let reader = new FileReader();
      reader['onload'] = function (e: any) {
        self.images.push({src: e.target.result, stt: i});
      };
      reader.readAsDataURL(fileUpload[i]);
    }
  }

  /**
   * @method removeImg
   * @description remove item image
   * @param s
   */
  public removeImg(s) {
    let img = this.images;
    for (let i = 0; i < img.length; i++) {
      console.log(img[i].stt);
      console.log(img[i].s);
      if (img[i].stt === s) {
        this.images.splice(i, 1);
      }
    }
  }
}
