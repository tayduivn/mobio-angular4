/**
 * @author ManhNV - Ui and Integrate API
 * DuyBV Support UI
 * @description setting feature shop component
 * @version 1.0.0
 */

import {Component, OnInit, ViewChild, ElementRef, OnDestroy, Renderer} from '@angular/core';
import {Http} from '@angular/http';
import {ToasterService} from 'angular2-toaster';
import * as _ from 'lodash';
import {CardPatternService} from '../../../common/service/component-service/card-pattern.service';
import {CardPattern, CardPatternConfig} from './card-pattern.model';
import {Paging} from '../../../common/model/paging';
import {ModalDirective} from 'ng2-bootstrap';
import {CodeType} from '../../../common/model/code-type.model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {DragulaService} from 'ng2-dragula';
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'card-pattern-component',
  templateUrl: './card-pattern.component.html',
  styleUrls: ['./card-pattern.component.scss',
    '../product/product-styles/modal.component.scss',
    '../product/product-styles/product.component.scss']
})

export class CardPatternComponent implements OnInit, OnDestroy {
  // =================DECLARE VARIABLE =======================================================================
  // variable native element ------------------------------
  @ViewChild('inputCodition') inputCodition: ElementRef;
  @ViewChild('accumulativePoint') accumulativePoint: ElementRef;
  @ViewChild('totalPayment') totalPayment: ElementRef;
  // ---- table native element
  @ViewChild('_selectAllCardPattern') _selectAllCardPattern: ElementRef;
  // ---- modal card pattern
  @ViewChild('titleModalCardPattern') titleModalCardPattern: ElementRef;
  @ViewChild('modalCreateEditCardPattern') public modalCreateEditCardPattern: ModalDirective;
  @ViewChild('modalCardConfig') public modalCardConfig: ModalDirective;
  // ---- file upload front and back
  @ViewChild('fileElementUploadFront') fileElementUploadFront: ElementRef;
  @ViewChild('fileElementUploadBack') fileElementUploadBack: ElementRef;

  // common variable ----------------------------------------------------------------
  public cardPatterns: CardPattern[];
  public cardPattern: CardPattern;
  public CodeTypes: CodeType[];
  public cardPatternConfig: CardPatternConfig = {
    setting: {
      card_condition: 1
    }
  };

  // variable bar (search and action button)-----------------------------------------
  public allowButton: boolean = false;
  public keySearch: string = '';

  // variable create shop modal -----------------------------------------------------
  // image and file upload config
  public fileUploadFrontPhoto: File = null;
  public fileUploadBackPhoto: File = null;
  public frontPhotoImage: string = '';
  public backPhotoImage: string = '';

  public checkEqualCard: any = [];
  // state modal setting card -----------------------
  public isLoadingConfig = false;
  public hide: boolean = false;
  public setHidePoint: boolean = false;
  // state modal create and edit card-pattern -------
  public isLoadingCardPattern: boolean = false;
  // variable data filter -----------------------------------------------------------
  public dataFilter = {
    page: 1, // default page select is 1
    per_page: 5, // default get 5 item
    ChuoiTimKiem: ''
  };
  public paging: Paging;

  constructor(private _router: Router,
              private _cardPatternService: CardPatternService,
              private dragulaService: DragulaService,
              private renderer: Renderer,
              private _toasterService: ToasterService) {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
    this.initCardPatternData();
    dragulaService.setOptions('bag-items', {})
    dragulaService.dropModel.subscribe((value) => {
      console.log(value);
    });
  }

  ngOnInit() {
    this.filterCardPattern();
    this._cardPatternService.getCodeTypes()
      .subscribe(data => {
        this.CodeTypes = data.codes; // not map
      }, this.funcError)
  }

  ngOnDestroy() {
    this.dragulaService.destroy('bag-items');
  }

  // ===================== FUNCTION INIT PAGE ================================================================
  /**
   * @function filterCardPattern
   * @description support filter card-pattern
   */
  public filterCardPattern(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._cardPatternService.getCardPatterns(this.dataFilter)
      .subscribe(
        data => {
          // set data and add temp field select
          this.cardPatterns = data.cards.length === 0 ? [] : data.cards.map(CardPatternService.toCardPattern);
          _.map(this.cardPatterns, cardPattern => cardPattern.select = false);
          // set data filter
          if (data.paging) {
            this.paging = data.paging;
            this.paging.page = _setPage;
          }
        }, this.funcError);
  }

  /**
   * @method searchCardPattern
   * @description search list card pattern
   */
  public searchCardPattern() {
    this.dataFilter.ChuoiTimKiem = this.keySearch;
    if (!this.keySearch) {
      this.dataFilter.ChuoiTimKiem = '';
    }
    this.filterCardPattern();
  }

  // ================== FUNCTION SUPPORT FILTER ==================================================================
  /**
   * @method changePerPage
   * @description change per page view
   * @param {string} _perPage
   */
  public changePerPage(_perPage: number) {
    this.resetState();
    this.dataFilter.per_page = _perPage;
    this.filterCardPattern();
  }

  /**
   * @method getCurrentPage
   * @description get page when click button page
   * @param {string} _pageSelected
   */
  public getCurrentPage(_pageSelected: number) {
    this.resetState();
    this.dataFilter.page = _pageSelected;
    this.filterCardPattern(_pageSelected);
  }

  // ================== FUNCTION SUPPORT MODAL CONFIG CARD-PATTERN ==============================================
  public showModalCardConfig() {
    if (this.cardPatterns.length === 0) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Bạn chưa tạo thẻ mẫu. Vui lòng tạo thẻ mẫu.');
      return;
    }
    this._cardPatternService.getCardPatternConfigDetail()
      .subscribe(dataCardConfig => {
        this.cardPatternConfig = dataCardConfig;
        this.setHidePoint = this.cardPatternConfig.setting.card_condition === 1;
        // gia thiet lap de coi nhu trang thai nay la an
        // if (this.setHidePoint) this.cardPatternConfig.setting.change_card_level = 2;
        this.modalCardConfig.show();
      }, this.funcError);
  }

  /**
   * @method changeConditionCard
   * @description change type card condition
   * @param _typeCondition
   */
  public changeConditionCard(_typeCondition: string) {
    this.cardPatternConfig.setting.card_condition = parseInt(_typeCondition, 10);
    if (this.cardPatternConfig.setting.card_condition === 1) {
      // set visible tu-dong-nang-hang-the
      this.cardPatternConfig.setting.change_card_level = 2;
      this.setHidePoint = true;
    } else {
      this.setHidePoint = false;
    }
  }

  public saveConfigCard() {
    console.log(this.cardPatternConfig.cards);
    if (this.cardPatternConfig.setting.card_condition !== 1) {
      for (let i = 0; i < this.cardPatternConfig.cards.length; i++) {
        if (this.cardPatternConfig.cards[i].value <= 0) {
          this._toasterService.clear();
          this._toasterService.pop('warning', null,
            'Các giá trị phân hạng thẻ phải lớn hơn 0');
          return;
        }
        for (let j = i + 1; j < this.cardPatternConfig.cards.length; j++) {
          if (this.cardPatternConfig.cards[i].value === this.cardPatternConfig.cards[j].value) {
            this._toasterService.clear();
            this._toasterService.pop('warning', null,
              'Các giá trị phân hạng thẻ không được phép giống nhau');
            return;
          }
        }
      }
    }

    this._cardPatternService.updateCardPatternConfig(this.cardPatternConfig)
      .subscribe(data => {
        this.isLoadingConfig = false;
        this._toasterService.clear();
        this._toasterService.pop('success', null, data.D);
        this.modalCardConfig.hide();
      }, err => {
        this.isLoadingConfig = false;
        this.funcError(err);
      });
  }

  public checkCardMember(value) {

  }

  public changeCardLevel(event: any) {
    this.cardPatternConfig.setting.change_card_level = event.currentTarget.checked ? 1 : 2; // 1 ThuCong, 2: TuDong
  }

  // ============== FUNCTION BAR MANAGER ======================================================================
  public hideCardSelect() {
    this.updateMultipleCardSelect(2);
  }

  public showCardSelect() {
    this.updateMultipleCardSelect(1);
  }

  /**
   * @method updateMultipleCardSelect
   * @description enable/ disable multiple card select
   * @param {number} state
   */
  private updateMultipleCardSelect(state: number) {
    let idCardPatterns = [];
    this.cardPatterns.forEach(itemCard => {
      if (itemCard['select'] === true) {
        idCardPatterns.push(itemCard.idCardPattern);
      }
    });

    let body = {
      cards: idCardPatterns,
      TrangThai: state
    };
    this._cardPatternService.changeStateShowCardPattern(body)
      .subscribe(data => {
          this.resetState();
          this.filterCardPattern(this.dataFilter.page); // set current-page
          this._toasterService.pop('success', null, data.D);
        }, this.funcError
      );
  }

  // ================== FUNCTION SUPPORT TABLE ==================================================================
  /**
   * @method selectAllCardPattern
   * @description select all cardPattern
   * @param event
   */
  public selectAllCardPattern(event) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
      _.map(this.cardPatterns, cardPattern => cardPattern['select'] = true);
    } else {
      this.allowButton = false;
      _.map(this.cardPatterns, cardPattern => cardPattern['select'] = false);
    }
  }

  public selectCardPattern(event, cardPatternID) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
    }
    let cardPatternSelect = _.find(this.cardPatterns, cardPattern => cardPattern.idCardPattern === cardPatternID);
    cardPatternSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.cardPatterns, cardPattern => cardPattern.select === true);
    this.allowButton = findSelect !== -1;
  }

  public changeStateShow(_idCardPattern, _state: number) {
    let body = {
      cards: [_idCardPattern],
      TrangThai: _state === 1 ? 2 : 1
    };
    this._cardPatternService.changeStateShowCardPattern(body)
      .subscribe(() => {
          this.filterCardPattern(this.dataFilter.page); // set current-page
          const message = _state === 2 ? 'Đã chuyển sang trạng thái hiển thị'
            : 'Đã chuyển sang trạng thái ẩn';
          this._toasterService.pop('success', null, message);
        }, this.funcError
      );
  }

  // ================ FUNCTION MODAL CREATE - UPDATE CARD-PATTERN ===============================================

  // ---- sub variable control upload image
  public fileUploadAvatar: File = null;
  public uploaderAvatar: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOverAvatar: boolean = false;
  @ViewChild('elInputFileAvatar') elInputFileAvatar: ElementRef;

  // ----------------- function execute upload file -----------------------------------------------------
  /**
   * @method fileOverBaseUploadAvatar
   * @description file over in border upload avatar.
   * @param e
   */
  public fileOverBaseUploadAvatar(e: any): void {
    this.hasBaseDropZoneOverAvatar = e;
  }

  /**
   * @method changeUrlFileUploadAvatar
   * @description change url file upload for avatar
   * @returns {boolean}
   */
  public changeUrlFileUploadAvatar() {
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
   * @method chooseFileUpdateAvatar
   * @description click to choose file to upload avatar
   */
  public chooseFileUpdateAvatar() {
    let eventClick = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(
      this.elInputFileAvatar.nativeElement, 'dispatchEvent', [eventClick]);
  }

  /// --- end function execute upload file ------------

  /**
   * @method showCreateCardPattern
   * @description show modal by create card pattern
   */
  public showCreateCardPattern() {
    this.titleModalCardPattern.nativeElement.innerText = 'TẠO THẺ MẪU';
    this.modalCreateEditCardPattern.show();
    this.initCardPatternData();
    // reset native element value
    this.resetOptionImage();
  }

  /**
   * @method showEditCardPattern
   * @description show modal by edit card pattern
   * @param _idCardPattern
   */
  public showEditCardPattern(_idCardPattern: string) {
    this.titleModalCardPattern.nativeElement.innerText = 'SỬA THẺ MẪU';
    this._cardPatternService.getCardPatternDetail(_idCardPattern)
      .subscribe(cardPatternData => {
        this.cardPattern = [cardPatternData['card']].map(CardPatternService.toCardPattern)[0];
        this.frontPhotoImage = this.cardPattern.frontPhoto;
        this.backPhotoImage = this.cardPattern.backPhoto;
      }, this.funcError);
    this.modalCreateEditCardPattern.show();
    // reset native element value
    this.resetOptionImage();
  }

  public changeFileFrontPhoto() {
    const fileUpload = this.fileElementUploadFront.nativeElement.files;
    console.log(this.fileElementUploadFront.nativeElement);
    if (fileUpload[0].size > 102400) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Dung lượng ảnh chỉ giới hạn <= 100kb');
      return;
    }
    this.fileUploadFrontPhoto = fileUpload[0];
    if (!fileUpload || fileUpload.length === 0) {
      this.frontPhotoImage = '';
      return;
    }

    // update target image
    const reader = new FileReader();
    reader.onload = ((e: any) => {
      this.frontPhotoImage = e.target.result;
    });
    reader.readAsDataURL(fileUpload[0]);
  }

  public changeFileBackPhoto() {
    const fileUpload = this.fileElementUploadBack.nativeElement.files;
    if (fileUpload[0].size > 102400) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Dung lượng ảnh chỉ giới hạn <= 100kb');
      return;
    }
    this.fileUploadBackPhoto = fileUpload[0];
    this.backPhotoImage = '';
    if (!fileUpload || fileUpload.length === 0) {
      this.backPhotoImage = '';
      return;
    }
    // update target image
    const reader = new FileReader();
    reader.onload = ((e: any) => {
      this.backPhotoImage = e.target.result;
    });
    reader.readAsDataURL(fileUpload[0]);
  }

  /**
   * @method switchState
   * @description switch state Show|Hide
   * @param event
   */
  public switchState(event: any) {
    this.cardPattern.state = event.currentTarget.checked ? 1 : 2;
  }

  public selectSelfGenerateCode(value: number) {
    this.cardPattern.selfGenerateCode = value;
  }

  public selectTypeCardDisplay(value: number) {
    this.cardPattern.typeCardDisplay = value;
  }

  public selectTabbedBrowsing(value: number) {
    this.cardPattern.tabbedBrowsing = value;
  }

  public saveCardPattern() {
    if (this.titleModalCardPattern.nativeElement.innerText === 'TẠO THẺ MẪU') {
      this.createCardPattern();
    } else {
      this.updateCardPattern();
    }
  }

  public createCardPattern() {
    this.isLoadingCardPattern = true;
    let file = [];
    if (this.fileUploadFrontPhoto) {
      file.push({
        name: 'LinkAnhMatTruoc',
        files: [this.fileUploadFrontPhoto]
      });
    }
    if (this.fileUploadBackPhoto) {
      file.push({
        name: 'LinkAnhMatSau',
        files: [this.fileUploadBackPhoto]
      });
    }
    this._cardPatternService.createCardPattern(this.cardPattern, file)
      .subscribe((data) => {
        this.isLoadingCardPattern = false;
        this._toasterService.pop('success', null, data.D);
        this.filterCardPattern();
        this.modalCreateEditCardPattern.hide();
      }, err => {
        this.isLoadingCardPattern = false;
        this.funcError(err);
      });
  }

  /**
   * @method updateCardPattern
   */
  public updateCardPattern() {
    this.isLoadingCardPattern = true;
    let file = [];
    if (this.fileUploadFrontPhoto) {
      file.push({
        name: 'LinkAnhMatTruoc',
        files: [this.fileUploadFrontPhoto]
      });
    }
    if (this.fileUploadBackPhoto) {
      file.push({
        name: 'LinkAnhMatSau',
        files: [this.fileUploadBackPhoto]
      });
    }
    this._cardPatternService.updateCardPattern(this.cardPattern, file)
      .subscribe((data) => {
        this.isLoadingCardPattern = false;
        this._toasterService.pop('success', null, data.D);
        this.filterCardPattern(this.dataFilter.page);
        this.modalCreateEditCardPattern.hide();
      }, err => {
        this.isLoadingCardPattern = false;
        this.funcError(err);
      });
  }

  // ================ FUNCTION COMMON SUPPORT  ================================================================
  public initCardPatternData() {
    this.cardPattern = {
      idCardPattern: '',
      cardName: '',
      selfGenerateCode: 1,
      typeCardDisplay: 128,
      tabbedBrowsing: 1, //
      frontPhoto: '',
      backPhoto: '',
      state: 1, // show
    };
  }

  /**
   * @method resetOptionImage
   * @description reset image view + fileUpload + reset inner text input upload
   */
  public resetOptionImage() {
    this.frontPhotoImage = '';
    this.backPhotoImage = '';
    this.fileUploadFrontPhoto = null;
    this.fileUploadBackPhoto = null;
    this.fileElementUploadFront.nativeElement.value = '';
    this.fileElementUploadBack.nativeElement.value = '';
  }

  /**
   * @method resetState
   * @description reset check all and button bar- execute multiple [delete, hide, show]
   */
  private resetState() {
    this.allowButton = false;
    this._selectAllCardPattern.nativeElement.checked = false;
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
