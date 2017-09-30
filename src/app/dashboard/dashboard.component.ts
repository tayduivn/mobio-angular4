import { TopModel } from './model/top.model';
import { Chart } from './model/chart.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { BalancePoint } from './model/dashboard.model';
import * as moment from 'moment';
import * as _ from 'lodash'

@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private _dashboardService: DashboardService) {
  }

  public brandPrimary: string = '#20a8d8';
  public brandSuccess: string = '#4dbd74';
  public brandInfo: string = '#67c2ef';
  public brandWarning: string = '#f8cb00';
  public brandDanger: string = '#f86c6b';

  // convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    let rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return rgba;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend: boolean = false;
  public lineChart1Type: string = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend: boolean = false;
  public lineChart2Type: string = 'line';

  public mainChartElements: number = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
    , 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    , 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    , 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public mainChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: this.convertHex(this.brandInfo, 10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend: boolean = false;
  public mainChartType: string = 'line';

  // social box charts

  public socialChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public socialChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public socialChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public socialChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public socialChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public socialChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public socialChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public socialChartLegend: boolean = false;
  public socialChartType: string = 'line';

  // sparkline charts

  public sparklineChartData1: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Clients'
    }
  ];
  public sparklineChartData2: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Clients'
    }
  ];

  public sparklineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public sparklineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public sparklineChartDefault: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#d1d4d7',
    }
  ];
  public sparklineChartPrimary: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandPrimary,
    }
  ];
  public sparklineChartInfo: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandInfo,
    }
  ];
  public sparklineChartDanger: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
    }
  ];
  public sparklineChartWarning: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandWarning,
    }
  ];
  public sparklineChartSuccess: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
    }
  ];


  public sparklineChartLegend: boolean = false;
  public sparklineChartType: string = 'line';


  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';


  //blancePoint
  private membershipStatus: object = BalancePoint;
  private currentPointStatus: object = BalancePoint;
  private notVerifiedVoucherStatus: object = BalancePoint;
  private visibleProductStatus: object = BalancePoint;
  private activedPromotionStatus: object = BalancePoint;
  private activedVoucherPromotionStatus: object = BalancePoint;
  private activedFootTrafficVoucherPromotionStatus: object = BalancePoint;
  private activedGiftStatus: object = BalancePoint;
  // customer chart
  private membershipChartData: object = Chart;
  private listMember: Array<any> = [];
  private listDay: Array<any> = [];
  //shopping chart
  private shoppingChartData: object = Chart;
  private listOnline: Array<any> = [];
  private listOffline: Array<any> = [];
  private listDayShopping: Array<any> = [];
  //mobio chart
  private mobioChartData: object = Chart;
  private listPromotions: Array<any> = [];
  private listProducts: Array<any> = [];
  private listDayMobios: Array<any> = [];
  //voucher
  private voucherChartData: object = Chart;
  private listUsedVoucher: Array<any> = [];
  private listDayVoucher: Array<any> = [];
  private listIssuesVoucher: Array<any> = [];
  //top
  private filters: Array<any>= [
          {
            id: 1,
            name: 'Sản phẩm'
          },
          {
            id: 2,
            name: 'Ưu đãi'
          },
          {
            id: 3,
            name: 'Voucher'
          },
          {
            id: 4,
            name: 'Quà tặng'
          },
        ];
  private minRateShops: Array<object>;
  private topChanged: object = TopModel;
  private topView: object = TopModel;
  private merchanRating: object = {} ;


  getCurrentPointStatus() {
    this._dashboardService.getCurrentPointStatus().subscribe(data => {
      this.currentPointStatus = {
        number: data.data.balance_point + " mPoint",
        text: 'Điểm hiện tại trong tài khoản',
        image: 'assets/images/dashboard/dashboard-3.png'
      }
    }, err => {
      console.log(err);
    })
  }

  getMembershipStatus() {
    this._dashboardService.getMembershipStatus().subscribe(data => {
      this.membershipStatus = {
        number: data.data.count,
        text: 'Khách hàng thành viên',
        image: 'assets/images/dashboard/dashboard-1.png'
      }
    })
  }

  getNotVerifiedVoucherStatus() {
    this._dashboardService.getNotVerifiedVoucherStatus().subscribe(data => {
      this.notVerifiedVoucherStatus = {
        number: data.data.count,
        text: 'Thẻ chưa duyệt',
        image: 'assets/images/dashboard/dashboard-2.png'
      }
    })
  }

  getVisibleProductStatus() {
    this._dashboardService.getVisibleProductStatus().subscribe(data => {
      this.visibleProductStatus = {
        number: data.data.count,
        text: 'Sản phẩm đang hiển thị',
        image: 'assets/images/dashboard/dashboard-4.png',
        resize: 60
      }
    })
  }

  getActivedPromotionStatus() {
    this._dashboardService.getActivedPromotionStatus().subscribe(data => {
      this.activedPromotionStatus = {
        number: data.data.count,
        text: 'Ưu đãi còn hiệu lực',
        image: 'assets/images/dashboard/dashboard-5.png',
        resize: 60
      }
    })
  }

  getActivedVoucherPromotionStatus() {
    this._dashboardService.getActivedVoucherPromotionStatus().subscribe(data => {
      this.activedVoucherPromotionStatus = {
        number: data.data.count,
        text: 'Chương trình voucher còn hiệu lực',
        image: 'assets/images/dashboard/dashboard-6.png'
      }
    })
  }

  getActivedFootTrafficVoucherPromotionStatus() {
    this._dashboardService.getActivedFootTrafficVoucherPromotionStatus().subscribe(data => {
      this.activedFootTrafficVoucherPromotionStatus = {
        number: data.data.count,
        text: 'Chương trình foot-traffic còn hiệu lực',
        image: 'assets/images/dashboard/dashboard-7.png'
      }
    })
  }

  getActivedGiftStatus() {
    this._dashboardService.getActivedGiftStatus().subscribe(data => {
      this.activedGiftStatus = {
        number: data.data.count,
        text: 'Quà tặng còn hiệu lực',
        image: 'assets/images/dashboard/dashboard-8.png',
        resize: 55
      }
    })
  }

  getMembershipChart() {
    this._dashboardService.getMembershipChart().subscribe(data => {
      let listData = data.data.values;
      for (var i = 0; i < listData.length; i++) {
        this.listMember.push(listData[i].value);
        this.listDay.push(listData[i].end_time.substring(5, 10))
      }
      let lineChartData: Array<any> = [
        {
          data: this.listMember,
          label: 'Số thành viên'
        }
      ];
      let lineChartLabels: Array<any> = this.listDay;
      let lineChartOptions: any = {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          position: 'top',
          fullWidth: false,
          labels: {
            boxWidth: 12,
            padding: 50
          }
        }
      };
      let lineChartColors: Array<any> = [
        {
          fill: false,
          borderColor: '#70C159',
          backgroundColor: '#70C159'
        }, {
          fill: false,
          borderColor: '#C44518',
          backgroundColor: '#c44518'
        }, {
          fill: false,
          borderColor: '#37B7F7',
          backgroundColor: '#37b7f7'
        }
      ];
      let lineChartLegend: boolean = false;
      let lineChartType: string = 'line';

      this.membershipChartData = {
        title: 'Khách hàng thành viên ',
        datasets: lineChartData,
        labels: lineChartLabels,
        options: lineChartOptions,
        colors: lineChartColors,
        legend: lineChartLegend,
        chartType: lineChartType
      };
    })
  }

  getShoppingChart() {
    this._dashboardService.getShoppingChart().subscribe(data => {
      let listData = data.data.values;
      for (var i = 0; i < listData.length; i++) {
        this.listOnline.push(listData[i].online);
        this.listOffline.push(listData[i].offline);
        this.listDayShopping.push(listData[i].end_time.substring(5, 10))
      }
      let lineChartData: Array<any> = [
        {
          data: this.listOnline,
          label: 'Tại cửa hàng'
        },
        {
          data: this.listOffline,
          label: 'Qua Mobio'
        },
      ];

      let lineChartLabels: Array<any> = this.listDayShopping;
      let lineChartOptions: any = {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          labels: {
            boxWidth: 12
          }
        }
      };
      let lineChartColors: Array<any> = [
        {
          fill: false,
          borderColor: '#C44518',
          backgroundColor: '#C44518'
        },
        {
          fill: false,
          borderColor: '#37B7F7',
          backgroundColor: '#37B7F7'
        }
      ];
      let lineChartLegend: boolean = true;
      let lineChartType: string = 'line';

      this.shoppingChartData = {
        title: 'Lượt khách hàng mua sắm',
        datasets: lineChartData,
        labels: lineChartLabels,
        options: lineChartOptions,
        colors: lineChartColors,
        legend: lineChartLegend,
        chartType: lineChartType
      }
    })
  }

  getMobioChart() {
    this._dashboardService.getMobioChart().subscribe(data => {
      let listData = data.data.values;
      for (var i = 0; i < listData.length; i++) {
        this.listPromotions.push(listData[i].promotions);
        this.listProducts.push(listData[i].products);
        this.listDayMobios.push(listData[i].end_time.substring(5, 10))
      }

      let lineChartData: Array<any> = [
        {
          data: this.listProducts,
          label: 'Sản phẩm'
        },
        {
          data: this.listPromotions,
          label: 'Ưu đãi'
        },
      ];

      let lineChartLabels: Array<any> = this.listDayMobios;
      let lineChartOptions: any = {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          labels: {
            boxWidth: 12
          }
        }
      };
      let lineChartColors: Array<any> = [
        {
          fill: false,
          borderColor: '#FF003D',
          backgroundColor: '#FF003D'
        },
        {
          fill: false,
          borderColor: '#3CBA54',
          backgroundColor: '#3CBA54'
        }
      ];
      let lineChartLegend: boolean = true;
      let lineChartType: string = 'line';

      this.mobioChartData = {
        title: 'Sản phẩm và khuyến mại đổi qua Mobio',
        datasets: lineChartData,
        labels: lineChartLabels,
        options: lineChartOptions,
        colors: lineChartColors,
        legend: lineChartLegend,
        chartType: lineChartType
      }
    })
  }

  getVoucherChart() {
    this._dashboardService.getVoucherChart().subscribe(data => {
      let listData = data.data.values;
      for (var i = 0; i < listData.length; i++) {
        this.listUsedVoucher.push(listData[i].useds);
        this.listIssuesVoucher.push(listData[i].issues);
        this.listDayVoucher.push(listData[i].end_time.substring(5, 10))
      }
      let lineChartData: Array<any> = [
        {
          data: this.listUsedVoucher,
          label: 'Phát hành'
        },
        {
          data: this.listIssuesVoucher,
          label: 'Đã sử dụng'
        },
      ];

      let lineChartLabels: Array<any> = this.listDayVoucher;
      let lineChartOptions: any = {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          labels: {
            boxWidth: 12
          }
        }
      };
      let lineChartColors: Array<any> = [
        {
          fill: false,
          borderColor: '#F8AB75',
          backgroundColor: '#F8AB75'
        },
        {
          fill: false,
          borderColor: '#FFC74A',
          backgroundColor: '#FFC74A'
        }
      ];
      let lineChartLegend: boolean = true;
      let lineChartType: string = 'line';
      this.voucherChartData = {
        title: 'Voucher',
        datasets: lineChartData,
        labels: lineChartLabels,
        options: lineChartOptions,
        colors: lineChartColors,
        legend: lineChartLegend,
        chartType: lineChartType
      }
    });
  }

  getMinRateShops() {
    this._dashboardService.getMinRateShops().subscribe(data => {
      this.minRateShops = data.stores;
    })
  }

  getTopViewed() {
    this._dashboardService.getTopViewed().subscribe(data => {
      this.topView = {
        name: 'top-viewed',
        title: 'Top 5 được xem nhiều nhất',
        filters: this.filters,
        products: data.list
      }
    })
  }

  getTopChanged() {
    this._dashboardService.getTopChanged().subscribe(data => {
      this.topChanged = {
        name: 'top-changed',
        title: 'Top 5 được đổi nhiều nhất',
        filters: this.filters,
        products: data.list
      }
    })
  }
  public sum:number = 0;
  getMerchantRating() {
    this._dashboardService.getMerchantRating().subscribe(data => {
      console.log(data.data.ratings);
      let listData = data.data.ratings.values;
      for( var i=0; i <listData.length; i++){
        this.sum = listData[i]["value"] + this.sum;
      }
      console.log(this.sum);
    })
  }

  ngOnInit() {
    this.getCurrentPointStatus();
    this.getMembershipStatus();
    this.getNotVerifiedVoucherStatus();
    this.getVisibleProductStatus();
    this.getActivedPromotionStatus();
    this.getActivedVoucherPromotionStatus();
    this.getActivedFootTrafficVoucherPromotionStatus();
    this.getActivedGiftStatus();
    //chart
    this.getMembershipChart();
    this.getShoppingChart();
    this.getMobioChart();
    this.getVoucherChart();
    //top
    this.getMinRateShops();
    this.getTopViewed();
    this.getTopChanged();
    this.getMerchantRating();
  }
}
