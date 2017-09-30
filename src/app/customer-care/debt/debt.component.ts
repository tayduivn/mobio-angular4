/**
 * @author DuyBV
 * @description setting feature Debt component
 * @version 1.0.0
 */

import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Http} from '@angular/http';
import {ToasterService} from 'angular2-toaster';
import * as _ from 'lodash';
import * as moment from 'moment';

import ckConfig from '../../common/config/ck.config';
import {DebtService} from '../../common/service/component-service/debt.service';

@Component({
  selector: 'debt-component',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss',
    '../content/product/product-styles/modal.component.scss',
    '../content/product/product-styles/product.component.scss']
})
export class DebtComponent implements OnInit {
  // =================DECLARE VARIABLE =======================================================================

  public debts;
  public images: any = [];
  public imagesAvatar: any = [];
  public item = [{value: 0, display: 'Angular'}, {value: 1, display: 'React'}];
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public daterangeFitter: any = {};
  public stringdaterangeFitter: string = '';
  public optionsDateFitter: any = {
      locale: { format: 'DD/MM/YYYY' },
      alwaysShowCalendars: false,
      startDate: moment().subtract(1, 'month'),
      endDate: moment()
  };
  public dateTimeMask: any = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  @ViewChild('elmDaterangeFitter') elmDaterangeFitter: ElementRef;
  // config ckeditor view
  public config = {
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
  };

  constructor(private http: Http,
              private _debtService: DebtService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this._debtService.getDebt()
      .subscribe((data) => {
        let debtTemp = data.json().map(DebtService.toDebt);
        _.map(debtTemp, debt => debt['select'] = false);
        this.debts = debtTemp;
        console.log(this.debts);
      }, err => {
        console.log(err);
      });
    this.dropdownList = [
      {'id': 1, 'itemName': 'demo1@yhaoo.com'},
      {'id': 2, 'itemName': 'demo1@yhaoo.com'},
      {'id': 3, 'itemName': 'demo1@yhaoo.com'},
      {'id': 4, 'itemName': 'demo1@yhaoo.com'}
    ];
    this.selectedItems = [
      {'id': 2, 'itemName': 'demo1@yhaoo.com'}
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Chọn tài khoản',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  onItemSelect(item: any) {

  }

  OnItemDeSelect(item: any) {

  }

  onSelectAll(items: any) {
  }

  onDeSelectAll(items: any) {
  }

  /**
   * @method exportFile
   * @description export to file exel
   * @todo
   */
  public exportFile() {
    this.toasterService.pop('info', null, 'Export');
  }

  /**
   * @method showDaterangeFitter
   * @description show ui change datetime rage
   * @param event
   */
  public showDaterangeFitter(event){
    this.elmDaterangeFitter.nativeElement.click();
  }

  /**
   * @method selectedDateFitter
   * @description change datetime rage
   * @param value
   */
  public selectedDateFitter(value: any) {
    this.daterangeFitter.start = value.start;
    this.daterangeFitter.end = value.end;
    this.daterangeFitter.label = value.label;
  }
}
