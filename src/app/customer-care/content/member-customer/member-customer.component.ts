/**
 * @author ManhNV, DuyBV
 * @description setting feature shop component
 * @version 1.0.0
 */

import {Component, OnInit, ViewChild, ElementRef, Renderer} from '@angular/core';
import {MemberCustomerService} from '../../../common/service/component-service/member-customer.service';
import {CardPatternService} from '../../../common/service/component-service/card-pattern.service';
import {ToasterService} from 'angular2-toaster';
import * as _ from 'lodash';
import ckConfig from '../../../common/config/ck.config';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CodeType} from '../../../common/model/code-type.model';
import {MemberCustomer} from './member-customer.model';
import {Paging} from '../../../common/model/paging';
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {FileUploader} from 'ng2-file-upload';
import {CardPattern} from '../card-pattern/card-pattern.model';

@Component({
  selector: 'member-customer-component',
  templateUrl: './member-customer.component.html',
  styleUrls: ['./member-customer.component.scss',
    '../product/product-styles/modal.component.scss',
    '../product/product-styles/product.component.scss']
})
export class MemberCustomerComponent implements OnInit {
  // =================DECLARE VARIABLE =======================================================================
  // variable native element ------------------------------
  @ViewChild('fileUrl') fileUrl: ElementRef;
  @ViewChild('outImg') outImg: ElementRef;
  @ViewChild('fileUrlAvatar') fileUrlAvatar: ElementRef;
  @ViewChild('outImgAvatar') outImgAvatar: ElementRef;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('uploadMemberCustomerModal') public uploadMemberCustomerModal: ModalDirective;
  @ViewChild('acceptAndRejectModal') public acceptAndRejectModal: ModalDirective;
  @ViewChild('elInputFileProduct') elInputFileProduct: ElementRef;
  // -- state all check element
  @ViewChild('_selectAllMemberCustomer') _selectAllMemberCustomer: ElementRef;
  // common variable ----------------------------------------
  public title: string = 'TẠO THẺ KHÁCH HÀNG';
  public memberCustomers: MemberCustomer[];
  public memberCustomer: MemberCustomer;
  public categories = null;
  public CodeTypes: CodeType[];
  public cardPatterns: CardPattern[];

  // why
  public memberCreateForm = {};
  public listCardApprovalCancel = [];
  public category: string = 'Thẻ thành viên';
  public keyCard: string = '';
  public phone: string = '';
  public email: string = '';
  public dob: any = '';
  public address: string = '';
  public gender: number = 1;
  public theMauNhaCungCapID: string = '0';
  public eidtTheMauNhaCungCapID: string = '';
  public name: string = '';
  public keySearch: string = '';
  public dataCreate: string = '';
  public allowButton: boolean = false;
  public isLoadingShop: boolean = false;
  public idMberCustomer: string = '';
  public textButtomAccess: string = 'Lưu';
  public setHideActicess: boolean = false;
  public today: Date;
  public checkCreate: number = 1;
  public finterDateActive: any = '';
  public finterDateCreate: any = '';
  public _stateShowInfoMationUpload: boolean = false;
  public uploaderProduct: FileUploader = new FileUploader({url: ''});
  public hasBaseDropZoneOver: boolean = false;
  public isLoadingUploadProduct: boolean = false;
  public timeRangerRegister: string = '';
  public timeRangerApprove: string = '';
  public showInfo: boolean = false;
  public time;
  // --- sort filter
  public filterTypeTimeStart: boolean = true;
  public filterTypeTimeEnd: boolean = true;
  public setIconTimeStart: number = 0;
  public setIconTimeEnd: number = 0;

  public dobDatetimePicker = {
    format: 'DD/MM/YYYY',
    dayViewHeaderFormat: 'MM YYYY',
    maxDate: this.today
  };
  public dataFilter = {
    page: 1, // default page select is 1
    per_page: 5, // default get 5 item
    TrangThaiDuyet: '',
    TheMauNhaCungCapID: '',
    ThoiDiemTaoBegin: '',
    ThoiDiemTaoEnd: '',
    ThoiDiemCapNhatBegin: '',
    ThoiDiemCapNhatEnd: '',
    ChuoiTimKiem: '',
    sort: '',
    order: '',
  };

  public paging: Paging;

  public config = {
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
  };

  constructor(private _router: Router,
              private _memberCustomerService: MemberCustomerService,
              private _toasterService: ToasterService,
              private _cardPatternService: CardPatternService,
              private renderer: Renderer) {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
    this._initmemberCreateForm();
  }

  ngOnInit() {
    // get TheMauNhaCungCapId
    this._cardPatternService.getCardPatterns({page: -1})
      .subscribe(data => {
        let cardPatterns = data.cards.length === 0 ? []
          : data.cards.reverse().map(CardPatternService.toCardPattern);
        let strCardPatterns = '';
        cardPatterns.forEach(cardPattern => {
          strCardPatterns += `${cardPattern.idCardPattern},`;
        });
        this.cardPatterns = cardPatterns;
        this.dataFilter.TheMauNhaCungCapID = strCardPatterns;
      });
    this.filterCardcustomer();
    this._initmemberCreateForm();
  }

  // ===== FUNCTION FILTER CARD PATTERN ======================================================================
  /**
   * @function filterCardPattern
   * @description support filter card-pattern
   */
  public filterCardcustomer(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._memberCustomerService.getMemberCustomers(this.dataFilter)
      .subscribe(
        data => {
          // set data and add temp field select
          this.memberCustomers = data.cards.length === 0 ? []
            : data.cards.map(MemberCustomerService.toMemberCustomer);
          _.map(this.memberCustomers, memberCustomer => memberCustomer.select = false);
          if (data.paging) {
            this.paging = data.paging;
            this.paging.page = _setPage;
          }
        }, err => {
          console.log(err);
        });
  }

  /**
   * @method filterTimeRegister
   * @description filter with time ranger register
   */
  public filterTimeRegister(event) {
    this.resetState();
    // "08/10/2017 - 09/13/2017"
    let timeRanger = event.event.currentTarget.value.replace(/\//g, '-');
    this.dataFilter.ThoiDiemTaoBegin = `${timeRanger.substring(6, 10)}${timeRanger.substring(0, 2)}${timeRanger.substring(3, 5)}`;
    this.dataFilter.ThoiDiemTaoEnd = `${timeRanger.substring(19, 23)}${timeRanger.substring(13, 15)}${timeRanger.substring(16, 18)}`;
    this.filterCardcustomer();
    console.log(event.event.currentTarget.value);
  }

  /**
   * @method filterTimeApprove
   * @description filter with time ranger approve
   * @memberof MemberCustomerComponent
   */
  public filterTimeApprove(event) {
    this.resetState();
    // "08/10/2017 - 09/13/2017"
    let timeRanger = event.event.currentTarget.value.replace(/\//g, '-');
    this.dataFilter.ThoiDiemCapNhatBegin = `${timeRanger.substring(6, 10)}${timeRanger.substring(0, 2)}${timeRanger.substring(3, 5)}`;
    this.dataFilter.ThoiDiemCapNhatEnd = `${timeRanger.substring(19, 23)}${timeRanger.substring(13, 15)}${timeRanger.substring(16, 18)}`;
    this.filterCardcustomer();
    console.log(event.event.currentTarget.value);
  }

  public filterStatus(idCategory: number) {
    this.resetState();
    // reset any more click filter category
    this.dataFilter.TrangThaiDuyet = `${idCategory} `;
    this.filterCardcustomer(1);
  }

  // // ---- sort ThoiGianDangKy va ThoiGianDuyet ----------- ----------
  // public sortMemberCustomer(Field: string, order: string) {
  //   this.dataFilter.sort = Field;
  //   this.dataFilter.order = order;
  //   this.filterCardcustomer(this.dataFilter.page);
  // }

  // ------- sub filter sorting timeStart and timeEnd
  public sortTimeStart() {
    this.resetState();
    // set default icon view price + select all checkbox + disable button execute
    this.setIconTimeEnd = 0;

    this.dataFilter.sort = 'ThoiDiemTao';
    this.filterTypeTimeStart = !this.filterTypeTimeStart;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeStart ? 'desc' : 'asc';
    this.setIconTimeStart = !this.filterTypeTimeStart ? 2 : 1;
    this.filterCardcustomer(this.dataFilter.page);
  }

  public sortTimeEnd() {
    // set default icon view price + select all checkbox + disable button execute
    this.setIconTimeStart = 0;
    this.dataFilter.sort = 'ThoiDiemCapNhat';
    this.filterTypeTimeEnd = !this.filterTypeTimeEnd;
    // set filter (desc, asc) and set icon sort view
    this.dataFilter.order = !this.filterTypeTimeEnd ? 'desc' : 'asc';
    this.setIconTimeEnd = !this.filterTypeTimeEnd ? 2 : 1;
    this.filterCardcustomer(this.dataFilter.page);
  }

  public filterTypeCard(idCategory: string) {
    this.resetState();
    this.dataFilter.TheMauNhaCungCapID = `${idCategory} `;
    this.filterCardcustomer(1);
  }

  public buttomSearch() {
    console.log(this.keySearch);
    this.dataFilter.ChuoiTimKiem = this.keySearch;
    this.filterCardcustomer(1);
  }

  // ============== FUNCTION BAR MANAGER =========================================================================
  public acceptMultiMemberCustomer() {

    this.memberCustomers.forEach(memberCustomer => {
      if (memberCustomer['select'] === true) {
        this.listCardApprovalCancel.push(memberCustomer.idMemberCustomer);
      }
    });
    this.callApiApprovalCancel(this.addDataApprovalAndCancel(this.listCardApprovalCancel, 2),
      'Duyệt thẻ khách hàng thanh công');
  }

  public rejectMultiMemberCustomer() {
    if (!confirm('Bạn có muốn hủy những sản phẩm đã chọn!')) return;
    this.memberCustomers.forEach(memberCustomer => {
      if (memberCustomer['select'] === true) {
        this.listCardApprovalCancel.push(memberCustomer.idMemberCustomer);
      }
    });
    this.callApiApprovalCancel(this.addDataApprovalAndCancel(this.listCardApprovalCancel, 3),
      'Huy thẻ khách hàng thanh công');
  }

  // ================== FUNCTION SUPPORT TABLE =====================================================================
  public selectAllMemberCustomer(event) {
    if (event.currentTarget.checked === true) {
      _.map(this.memberCustomers, memberCustomer => memberCustomer['select'] = true);
    } else {
      _.map(this.memberCustomers, memberCustomer => memberCustomer['select'] = false);
    }
    this.allowButton = event.currentTarget.checked;
  }

  public selectMemberCustomer(event, _idMemberCustomer) {
    if (event.currentTarget.checked === true) {
      this.allowButton = true;
    } else {
      this._selectAllMemberCustomer.nativeElement.checked = false;
    }
    let memberCustomerSelect = _.find(this.memberCustomers,
      memberCustomer => memberCustomer.idMemberCustomer === _idMemberCustomer);
    memberCustomerSelect.select = event.currentTarget.checked;
    const findSelect = _.findIndex(this.memberCustomers,
      memberCustomer => memberCustomer.select === true);
    this.allowButton = findSelect !== -1;
  }

  funcError = (err) => {
    this._toasterService.clear();
    this._toasterService.pop('error', null, err.D);
    if (err.status === 401) {
      Observable.timer(2000)
        .subscribe(() => {
          this._router.navigate(['login']);
        });
    }
  };

  public showFromCreate(type) {
    this.largeModal.show();
    this.textButtomAccess = 'Lưu';
    let typeActive = parseFloat(type);
    if (typeActive === 1) {
      this.checkCreate = 1;
      this.title = 'TẠO THẺ KHÁCH HÀNG';
      this._initmemberCreateForm();
      this.setHideActicess = false;
      return false;
    }
    if (typeActive === 2) {
      this.checkCreate = 2;
      this.title = 'SỬA THẺ KHÁCH HÀNG';
      this.setHideActicess = false;
      return false;
    }
    this.title = 'DUYỆT THÔNG TIN KHÁCH HÀNG THÀNH VIÊN';
    this.setHideActicess = true;
    if (typeActive === 3) {
      this.textButtomAccess = 'Đồng ý';
      this.checkCreate = 3;
      return false
    }
    this.textButtomAccess = 'Reject';
    this.checkCreate = 4;
  }

  public closeFromCreate() {
    this.largeModal.hide();
    this._initmemberCreateForm();
  }

  public closeFromAccept() {
    this.acceptAndRejectModal.hide();
    this._initmemberCreateForm();
  }

  public getCurrentPage(_pageSelected: number) {
    this.dataFilter.page = _pageSelected;
    this.filterCardcustomer(_pageSelected);
  }

  public changePerPage(_perPage: number) {
    this.dataFilter.per_page = _perPage;
    this.filterCardcustomer();
  }

  public showInformation() {
    this.showInfo = !this.showInfo;
    console.log(this.showInfo)
  }

  /**
   * @method create
   * @description create
   */
  public save() {
    if (this.checkCreate === 1) {
      this.createMemberCustomer();
      return false
    }
    if (this.checkCreate === 2) {
      this.updateMemberCustomer();
      return false;
    }
    if (this.checkCreate === 3) {
      this.approvalMemberCustomer(2, 'Duyệt thẻ khách hàng thành công');
      return false
    }
    return false
  }

  public selectTypeCard(_idCardPattern: string) {
    this.eidtTheMauNhaCungCapID = _idCardPattern;
  }

  public selectTypeCardAccept(_idCardPattern: string) {
    this.eidtTheMauNhaCungCapID = _idCardPattern;
  }

  public createMemberCustomer() {
    if (this.validateData() === false) return false;
    if (this.eidtTheMauNhaCungCapID === '0') {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ít một thẻ mẫu nhà cung cấp id');
      return;
    }
    this._memberCustomerService.createMemberCustomer(this.mapData(this.eidtTheMauNhaCungCapID))
      .subscribe(data => {
        this.isLoadingShop = false;
        this._toasterService.pop('success', null, data.D || 'Thêm thẻ khách hàng thành công');
        this.largeModal.hide();
        this.resetState();
        this.filterCardcustomer(this.dataFilter.page);
      }, err => {
        this.isLoadingShop = false;
        this.funcError(err);
      });
  }

  public changeGender(genderValue: number) {
    this.gender = genderValue;
  }

  public updateMemberCustomer() {
    console.log(this.eidtTheMauNhaCungCapID);
    if (this.validateData() === false) {
      return false;
    }
    this._memberCustomerService.editMemberCustomer(this.mapData(this.eidtTheMauNhaCungCapID), this.idMberCustomer)
      .subscribe(data => {
        this.isLoadingShop = false;
        this._toasterService.pop('success', null, data.D);
        this.largeModal.hide();
        this.resetState();
        this.filterCardcustomer(this.dataFilter.page);
      }, err => {
        this.isLoadingShop = false;
        this.funcError(err);
      });
  }

  public approvalMemberCustomer(status: number, text: string) {
    this.listCardApprovalCancel = [];
    this.callApiApprovalCancel(this.addDataApprovalAndCancel(this.idMberCustomer, status), text);
  }

  public callApiApprovalCancel(data, text) {
    this._memberCustomerService.approvalCancelMemberCustomer(data)
      .subscribe(() => {
        this.isLoadingShop = false;
        this._toasterService.pop('success', null, text);
        this.acceptAndRejectModal.hide();
        this.resetState();
        this.filterCardcustomer(this.dataFilter.page);
      }, err => {
        this.isLoadingShop = false;
        this.funcError(err);
      });
  }

  public addDataApprovalAndCancel(idMberCustomer, starus) {
    if (!idMberCustomer || !starus) {
      return false;
    }
    if (typeof (idMberCustomer) !== 'object') {
      this.listCardApprovalCancel.push(idMberCustomer);
    } else {
      this.listCardApprovalCancel = idMberCustomer;
    }
    let data = {
      'cards': this.listCardApprovalCancel,
      'TrangThaiDuyet': parseFloat(starus)
    };
    console.log(data);
    return JSON.stringify(data);
  }

  public validateData() {
    if (!this.gender || !this.keyCard || !this.category || !this.phone) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Bạn không được bỏ trống các mục đánh dấu (*)');
      return false
    }
    if (this.validateEmail(this.email) === false) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Email không hợp lệ');
      return false;
    }
    return true;
  }

  public mapData(theMauNhaCungCapID) {
    let data = {
      TheMauNhaCungCapId: theMauNhaCungCapID,
      TenKhachHang: this.name,
      SoDienThoai: this.phone,
      Email: this.email,
      NgaySinh: this.dob.format('YYYYMMDD'),
      DiaChi: this.address,
      GioiTinh: this.gender,
      MaThe: this.keyCard
    };
    return JSON.stringify(data);
  }

  public editMemberCustomer(_idMemberCustomer) {
    this.title = 'SỬA THẺ KHÁCH HÀNG';
    this.checkCreate = 2;
    this.acceptMemberCustomer(_idMemberCustomer);
  }

  /**
   * @method rejectMemberCustomer
   * @param {string} _idMemberCustomer
   * @param {string} keyCard
   */
  public rejectMemberCustomer(_idMemberCustomer: string, keyCard: string) {
    // this.acceptMemberCustomer(_idMemberCustomer, 4);
    if (!confirm(`Bạn có muốn hủy thẻ mã: ${keyCard}?`)) return;
    const body = {
      'cards': [
        _idMemberCustomer
      ],
      'TrangThaiDuyet': 3
    };
    this._memberCustomerService.approvalCancelMemberCustomer(body)
      .subscribe(() => {
        this._toasterService.clear();
        this._toasterService.pop('success', null, 'Hủy thẻ thành công');
        this.filterCardcustomer(this.dataFilter.page);
      }, this.funcError);
  }

  /**
   * @method activeMemberCustomer
   * @description activeMemberCustomer
   * @param _idMemberCustomer
   */
  public acceptMemberCustomer(_idMemberCustomer) {
    this.idMberCustomer = _idMemberCustomer;
    this._memberCustomerService.getDetailMemberCustomer(_idMemberCustomer)
      .subscribe((data) => {
        this.memberCustomer = [data['card']].map(MemberCustomerService.toMemberCustomer)[0];
        this.category = this.memberCustomer.category;
        this.keyCard = this.memberCustomer.keyCard;
        this.name = this.memberCustomer.name;
        this.phone = this.memberCustomer.phone;
        this.dob = this.memberCustomer.dob;
        this.address = this.memberCustomer.address;
        this.gender = this.memberCustomer.gender;
        this.email = this.memberCustomer.email;
        this.dataCreate = this.memberCustomer.dataCreate;
        this.eidtTheMauNhaCungCapID = this.memberCustomer.TheMauNhaCungCapID;
        // this.showFromCreate(type);
        this.largeModal.show();
        console.log(this.gender);
      }, err => {
        this.isLoadingShop = false;
        this.funcError(err);
      });
  }

  public acceptMemberCustomerModal(_idMemberCustomer) {
    this.idMberCustomer = _idMemberCustomer;
    this._memberCustomerService.getDetailMemberCustomer(_idMemberCustomer)
      .subscribe((data) => {
        this.memberCustomer = [data['card']].map(MemberCustomerService.toMemberCustomer)[0];
        this.category = this.memberCustomer.category;
        this.keyCard = this.memberCustomer.keyCard;
        this.name = this.memberCustomer.name;
        this.phone = this.memberCustomer.phone;
        this.dob = this.memberCustomer.dob;
        this.address = this.memberCustomer.address;
        this.gender = this.memberCustomer.gender;
        this.email = this.memberCustomer.email;
        this.dataCreate = this.memberCustomer.dataCreate;
        this.eidtTheMauNhaCungCapID = this.memberCustomer.TheMauNhaCungCapID;
        // this.showFromCreate(type);
        this.acceptAndRejectModal.show();
        console.log(this.gender);
      }, err => {
        this.isLoadingShop = false;
        this.funcError(err);
      });
  }

  /**
   * @method acceptCardCustomer
   * @description accept card customer
   */
  public acceptCardCustomer() {
    // this.acceptMemberCustomer(_idMemberCustomer, 4);
    if (this.keyCard.trim() === '' || this.name.trim() === '') {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Bạn không được bỏ trống các mục đánh dấu (*)');
      return;
    }
    if (this.validateEmail(this.email) === false) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Email không hợp lệ');
      return;
    }
    if (this.validatePhone(this.phone) === false) {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Số điện thoại không hợp lệ');
      return;
    }
    if (this.eidtTheMauNhaCungCapID === '0') {
      this._toasterService.clear();
      this._toasterService.pop('error', null, 'Vui lòng chọn ít một thẻ mẫu nhà cung cấp id');
      return;
    }
    const body = {
      'cards': [
        this.idMberCustomer
      ],
      'TrangThaiDuyet': 2
    };
    this._memberCustomerService.editMemberCustomer(this.mapData(this.eidtTheMauNhaCungCapID), this.idMberCustomer)
      .subscribe(() => {
        this._memberCustomerService.approvalCancelMemberCustomer(body)
          .subscribe(() => {
            this._toasterService.clear();
            this._toasterService.pop('success', null, 'Duyệt thẻ khách hàng thanh công');
            this.acceptAndRejectModal.hide();
            this.resetState();
            this.filterCardcustomer(this.dataFilter.page);
          }, this.funcError);
      }, this.funcError);
  }

  /**
   * @method showFormUpload file
   * @description FormUpload file
   */
  public uploadMemberCustomer() {
    this._stateShowInfoMationUpload = false;
    this.uploadMemberCustomerModal.show();
  }

  public onFileDropUploadProduct() {
    let fileQueue = this.uploaderProduct.queue;
    if (fileQueue.length > 1) {
      this.uploaderProduct.queue[0].remove();
    }
    if (fileQueue.length === 1) {
      console.log(fileQueue[0].file.type);
      if (fileQueue[0].file.type !== 'application/vnd.ms-excel'
        && fileQueue[0].file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.uploaderProduct.queue[0].remove();
        this._toasterService.pop('error', null, 'Bạn chọn file sai định dạng.');
      }
    }
  }

  public chooseFileUpdateProduct() {
    let eventClick = new MouseEvent('click', {bubbles: true});
    this.renderer.invokeElementMethod(
      this.elInputFileProduct.nativeElement, 'dispatchEvent', [eventClick]);
  }

  /**
   * @method validateEmail
   * @description validateEmail
   * @param email
   */
  public validateEmail(email: any) {
    if (!email) {
      return false
    }
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // bo loc filter
    return filter.test(email);
  }

  public validatePhone(phone: any) {
    if (!phone) return false;
    let filter = /\+?\d{10,15}/g; // bo loc filter
    return filter.test(phone);
  }

  /**
   * @method _initmemberCreateCreateEdit
   * @description Listener event  memberCreate modal
   */
  private _initmemberCreateForm() {
    this.category = 'Thẻ thành viên';
    this.keyCard = '';
    this.name = '';
    this.phone = '';
    this.dob = '';
    this.address = '';
    this.gender = 1;
    this.email = '';
    this.dataCreate = '';
    this.eidtTheMauNhaCungCapID = '0';
  }

  private resetState() {
    this.allowButton = false;
    this._selectAllMemberCustomer.nativeElement.checked = false;
  }
}
