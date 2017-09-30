import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductReportService } from '../../../common/service/component-service/product-report.service';
import { ReportProduct, DetailProduct, Transaction, ChartProduct } from '../../report/product-report/product-report.model';
import { Category } from '../../../common/model/category.model';
import { CategoryService } from '../../../common/service/common-service/category.service';
import { Observable } from 'rxjs/Observable';
import { Paging } from '../../../common/model/paging';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash'
import * as moment from 'moment';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent implements OnInit {
  constructor(private router: Router, private _productService: ProductReportService, private _categoryService: CategoryService) {
    this.paging = {
      total_page: 0,
      per_page: 5,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
    this.paging1 = {
      total_page: 0,
      per_page: 10,
      page: 1,
      total_count: 0,
      max_page_item: 10
    };
  }
  public reportproducts: ReportProduct[];
  public viewsValue: any[] = new Array();
  public viewsTime: any[] = new Array();
  public receivedTime: any[] = new Array();
  public receivedValue: any[] = new Array();
  public purchaseValue: any[] = new Array();
  public purchaseTime: any[] = new Array();
  public categories: Category[];
  public categoriesByModal: Category[];
  public paging: Paging;
  public ProductData: object;
  public paging1: Paging;
  public chartproduct: ChartProduct[];
  public detailproduct: DetailProduct[];
  public transaction: Transaction[];
  public hidden: boolean = false;
  public dataFilter = {
    start: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    end: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    TrangThai: '',
    TrangThaiDoiDiem: '',
    MaDanhMuc: '',
    ChuoiTimKiem: '',
    page: 1,
    per_page: 5
  };
  public dataFilterTransaction = {
    ChuoiTimKiem: '',
    page: 1,
    per_page: 10
  };

  @ViewChild('showStateItem') showStateItem: ElementRef;
  @ViewChild('hideStateItem') hideStateItem: ElementRef;
  @ViewChild('searchItem') searchItem: ElementRef;
  @ViewChild('searchTransaction') searchProductTransaction: ElementRef;
  @ViewChild('allowChangeItem') allowChangeItem: ElementRef;
  @ViewChild('dontAllowChangeItem') dontAllowChangeItem: ElementRef;
  public optionsDateFitter: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    startDate: moment().subtract(1, 'month'),
    endDate: moment()
  };
  public mainInput = {
    start: moment().subtract(1, 'month'),
    end: moment().subtract(1, 'day')
  }
  private selectedDate(value: any, dateInput: any) {
    this.purchaseTime = [];
    dateInput.start = value.start;
    dateInput.end = value.end;
    this.dataFilter.start = value.start.format('YYYY-MM-DD');
    this.dataFilter.end = value.end.format('YYYY-MM-DD');
    this.filterChartProduct();
  }

  public changePerPage(_perPage: number) {
    this.dataFilter.per_page = _perPage;
    this.filterProducts();
  }
  public getCurrentPage(_pageSelected: number) {
    this.dataFilter.page = _pageSelected;
    this.filterProducts(_pageSelected);
  }
  public changePerPageCard(_idProduct: string, _perPage: number) {
    this.dataFilterTransaction.per_page = _perPage;
    this.showDetailProduct(_idProduct, this.dataFilterTransaction.per_page);
  }
  public getCurrentPageCard(_idProduct: string, _pageSelected: number) {
    this.dataFilterTransaction.per_page = _pageSelected;
    this.showDetailProduct(_idProduct, this.dataFilterTransaction.per_page);
  }
  public filterStateShow(event: any) {
    if (this.showStateItem.nativeElement.checked) {
      if (this.hideStateItem.nativeElement.checked)
        this.dataFilter.TrangThai = '';
      else this.dataFilter.TrangThai = '1';
    } else if (this.hideStateItem.nativeElement.checked) {
      this.dataFilter.TrangThai = '2';
    } else {
      this.dataFilter.TrangThai = '';
    }
    this.filterProducts();
  }

  public filterAllowChange(event: any) {
    if (this.allowChangeItem.nativeElement.checked) {
      if (this.dontAllowChangeItem.nativeElement.checked)
        this.dataFilter.TrangThaiDoiDiem = '';
      else this.dataFilter.TrangThaiDoiDiem = '1';
    } else if (this.dontAllowChangeItem.nativeElement.checked) {
      this.dataFilter.TrangThaiDoiDiem = '2';
    } else {
      this.dataFilter.TrangThaiDoiDiem = '';
    }
    this.filterProducts();
  }
  public searchProduct(event: any) {
    if (this.searchItem.nativeElement.value !== '') {
      this.dataFilter.ChuoiTimKiem = this.searchItem.nativeElement.value;
    }
    this.filterProducts();
  }
  public searchTransaction(_idProduct: string, event: any) {
    if (this.searchProductTransaction.nativeElement.value !== '') {
      this.dataFilterTransaction.ChuoiTimKiem = this.searchProductTransaction.nativeElement.value;
    }
    this.showDetailProduct(_idProduct, this.dataFilterTransaction.per_page);
  }
  public filterCategory(event: any, idCategory: string) {
    if (event.currentTarget.checked) {
      this.dataFilter.MaDanhMuc += `${idCategory},`;
    } else {
      this.dataFilter.MaDanhMuc = _.replace(this.dataFilter.MaDanhMuc, idCategory + ',', '');
    }
    this.filterProducts();
  }

  public filterChartProduct() {
    this._productService.getChartProduct(this.dataFilter)
      .subscribe(
      data => {
        this.chartproduct = [data['reports']].map(ProductReportService.toChartProduct);
        for (let i = 0; i < this.chartproduct.length; i++) {
          for (let j = 0; j < this.chartproduct[i].purchase.data.length; j++) {
            this.purchaseValue.push(this.chartproduct[i].purchase.data[j].value);
            let datetime = new Date(this.chartproduct[i].purchase.data[j].time);
            let date = datetime.getDate();
            let month = datetime.getMonth() + 1;
            this.purchaseTime.push(date + '-' + month);
          }
          for (let j = 0; j < this.chartproduct[i].views.data.length; j++) {
            this.viewsValue.push(this.chartproduct[i].views.data[j].value);
          }
          for (let j = 0; j < this.chartproduct[i].received.data.length; j++) {
            this.receivedValue.push(this.chartproduct[i].received.data[j].value);
          }
        }
        let lineChartData: Array<any> = [
          {
            data: this.viewsValue,
            label: 'Xem'
          }, {
            data: this.purchaseValue,
            label: 'Đổi sản phẩm'
          }, {
            data: this.receivedValue,
            label: 'Đã nhận'
          }
        ];
        let lineChartLabels: Array<any> = this.purchaseTime;
        let lineChartOptions: any = {
          maintainAspectRatio: false
        };
        let lineChartColors: Array<any> = [
          {
            fill: false,
            borderColor: '#ff5454',
            backgroundColor: '#ff5454'
          }, {
            fill: false,
            borderColor: '#79c447',
            backgroundColor: '#79c447'
          }, {
            fill: false,
            borderColor: '#fabb3d',
            backgroundColor: '#fabb3d'
          }
        ];
        let lineChartLegend: boolean = true;
        let lineChartType: string = 'line';
        this.ProductData = {
          datasets: lineChartData,
          labels: lineChartLabels,
          options: lineChartOptions,
          colors: lineChartColors,
          legend: lineChartLegend,
          chartType: lineChartType
        };
      });
  }

  public showDetailProduct(_idProduct: string, _setPage: number) {
    this._productService.getDetailProductReport(_idProduct)
      .subscribe(
      data => {
        this.detailproduct = [data['reports']].map(ProductReportService.toDetailProductReport);
      });
    this.dataFilterTransaction.page = _setPage;
    this._productService.getTransactionProductReport(_idProduct, this.dataFilterTransaction)
      .subscribe(
      data => {
        this.transaction = data.transaction.map(ProductReportService.toTransactionProductReport);
        this.paging1 = data.paging;
        this.paging1.page = _setPage;
      }
      );
    this.hidden = true;
  }
  private filterProducts(_setPage: number = 1) {
    this.dataFilter.page = _setPage;
    this._productService.getReportProducts(this.dataFilter)
      .subscribe(
      data => {
        this.reportproducts = data.products.map(ProductReportService.toReportProduct);
        this.paging = data.paging;
        this.paging.page = _setPage;
      });
  }

  ngOnInit() {
    this.filterProducts();
    this.filterChartProduct();
    this._categoryService.getCategories()
      .subscribe(
      dataCategories => {
        let categoriesTemp = dataCategories;
        _.map(categoriesTemp, category => category['idCategory'] = category['idCategory'].replace('&', '%26'));
        this.categories = categoriesTemp;
        this.categoriesByModal = categoriesTemp;
      });
  }

}
