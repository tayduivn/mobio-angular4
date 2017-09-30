import { Component, OnInit } from "@angular/core";
import * as moment from 'moment';

@Component({
  selector: "mo-call-center-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class CallCenterDashboardComponent implements OnInit {
  dataTest = {
    label: "Tổng số cuộc gọi đến",
    value: "5000",
    icon: "../../../../assets/img/call-center/avg-call-in.svg",
    desc: "+3% so với 30 ngày trước"
  };
  doughnutChartLabels: string[] = ["Thẻ thành viên", "Thẻ vip", "Thẻ vàng"];
  barChartOptions: any = {
    legend: {
      display: false
    },
    cutoutPercentage: 80
  };
  doughnutChartColor: any[] = [
    {
      backgroundColor: ["#37B7F7", "#F85061", "#E0D517"],
      borderWidth: 0
    }
  ];
  doughnutChartData: Array<any> = [350, 450, 100];
  doughnutChartType: string = "doughnut";

  chartTest = {
    data: this.doughnutChartData,
    labels: this.doughnutChartLabels,
    options: this.barChartOptions,
    chartType: this.doughnutChartType,
    colors: this.doughnutChartColor,
    icon: "../../../../assets/img/call-center/chart-call-in.svg",
    labelChart: "Cuộc gọi đến"
  };
  legend = [
    { color: "#37B7F7", text: "Thẻ thành viên" },
    { color: "#F85061", text: "Thẻ vip" },
    { color: "#E0D517", text: "Thẻ vàng" }
  ];

  dataTableTop = {
    name: "Top 5 cuộc gọi đến có thời gian dài nhất",
    data: [
      {
        id: 1,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        card: "Thẻ Vàng",
        phone: "0123456789",
        time: "09:10:56 12/06/2017",
        duration: "01:30",
        employee: "cskh@gmail.com",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"        
      },
      {
        id: 2,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        card: "Thẻ Vàng",
        phone: "0123456789",
        time: "09:10:56 12/06/2017",
        duration: "01:30",
        employee: "cskh@gmail.com",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"        
      },
      {
        id: 3,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        card: "Thẻ Vàng",
        phone: "0123456789",
        time: "09:10:56 12/06/2017",
        duration: "01:30",
        employee: "cskh@gmail.com",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"        
      },
      {
        id: 4,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        card: "Thẻ Vàng",
        phone: "0123456789",
        time: "09:10:56 12/06/2017",
        duration: "01:30",
        employee: "cskh@gmail.com",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"        
      },
      {
        id: 5,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        card: "Thẻ Vàng",
        phone: "0123456789",
        time: "09:10:56 12/06/2017",
        duration: "01:30",
        employee: "cskh@gmail.com",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"        
      }
    ]
  };

  dataTableStatistics = {
    name: "Thống kê cuộc gọi theo nhân viên",
    data: [
      {
        id: 1,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        totalCallIn: "10",
        callInAnswered: "8",
        ratio: "80%",
        avgCallIn: "1.5",
        avgDurationIn: "01:30",
        totalCallOut: "10",
        avgCallOut: "1.5",
        avgDurationOut: "01:30"
      },
      {
        id: 2,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        totalCallIn: "10",
        callInAnswered: "8",
        ratio: "80%",
        avgCallIn: "1.5",
        avgDurationIn: "01:30",
        totalCallOut: "10",
        avgCallOut: "1.5",
        avgDurationOut: "01:30"
      },
      {
        id: 3,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        totalCallIn: "10",
        callInAnswered: "8",
        ratio: "80%",
        avgCallIn: "1.5",
        avgDurationIn: "01:30",
        totalCallOut: "10",
        avgCallOut: "1.5",
        avgDurationOut: "01:30"
      },
      {
        id: 4,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        totalCallIn: "10",
        callInAnswered: "8",
        ratio: "80%",
        avgCallIn: "1.5",
        avgDurationIn: "01:30",
        totalCallOut: "10",
        avgCallOut: "1.5",
        avgDurationOut: "01:30"
      },
      {
        id: 5,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        totalCallIn: "10",
        callInAnswered: "8",
        ratio: "80%",
        avgCallIn: "1.5",
        avgDurationIn: "01:30",
        totalCallOut: "10",
        avgCallOut: "1.5",
        avgDurationOut: "01:30"
      },
      {
        id: 6,
        avatar: "../../../../assets/img/avatars/4.jpg",
        fullName: "Ng. Hữu Việt Cường",
        totalCallIn: "10",
        callInAnswered: "8",
        ratio: "80%",
        avgCallIn: "1.5",
        avgDurationIn: "01:30",
        totalCallOut: "10",
        avgCallOut: "1.5",
        avgDurationOut: "01:30"
      }
    ]
  };
  sourceAudio: object;
  constructor() {}

  ngOnInit() {}
  public stringdaterangeFitter: string = '';
  public optionsDateFitter: any = {
      locale: { format: 'DD/MM/YYYY' },
      alwaysShowCalendars: false,
      startDate: moment().subtract(1, 'month'),
      endDate: moment()
  };
  selectedDateFitter(e) {
    console.log(e);
  }
  eventAudio(e) {
    this.sourceAudio = e;
  }
}
