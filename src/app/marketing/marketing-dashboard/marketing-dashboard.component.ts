import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-marketing-dashboard',
  templateUrl: './marketing-dashboard.component.html',
  styleUrls: ['./marketing-dashboard.component.scss']
})
export class MarketingDashboardComponent implements OnInit {
  // common native element data ------
  @ViewChild('stateCampaign') stateCampaign: ElementRef;

  public campaign: Array<any> = [
    {
      idCampain: '1',
      name: 'Chiến dịch 1',
      status: 1,
      timeRegister: '29/07/2017 10:00',
      timeEnd: ' 31/08/2017 22:30',
      channelAction: 'Push, Email, FB Messenger',
      customerTag: 'Nữ - Độ tuổi từ 24 đến 45 tuổi',
      voucher: 'Voucher giá tri 50K cho tât ca các nhãn hàng có the thành viên Cocasuki',
      customerApproach: 1600,
      customerOpen: 1400,
      crv: 1300
    },
    {
      idCampain: '2',
      name: 'Chiến dịch 2',
      status: 2,
      timeRegister: '29/07/2017 10:00',
      timeEnd: ' 31/08/2017 22:30',
      channelAction: 'Push, Email, FB Messenger',
      customerTag: 'Nữ - Độ tuổi từ 24 đến 45 tuổi',
      voucher: 'Voucher giá tri 50K cho tât ca các nhãn hàng có the thành viên Cocasuki',
      customerApproach: 1600,
      customerOpen: 1400,
      crv: 1300
    },
    {
      idCampain: '3',
      name: 'Chiến dịch 3',
      status: 3,
      timeRegister: '29/07/2017 10:00',
      timeEnd: ' 31/08/2017 22:30',
      channelAction: 'Push, Email, FB Messenger',
      customerTag: 'Nữ - Độ tuổi từ 24 đến 45 tuổi',
      voucher: 'Voucher giá tri 50K cho tât ca các nhãn hàng có the thành viên Cocasuki',
      customerApproach: 1600,
      customerOpen: 1400,
      crv: 1300
    },
    {
      idCampain: '4',
      name: 'Chiến dịch 4',
      status: 4,
      timeRegister: '29/07/2017 10:00',
      timeEnd: ' 31/08/2017 22:30',
      channelAction: 'Push, Email, FB Messenger',
      customerTag: 'Nữ - Độ tuổi từ 24 đến 45 tuổi',
      voucher: 'Voucher giá tri 50K cho tât ca các nhãn hàng có the thành viên Cocasuki',
      customerApproach: 1600,
      customerOpen: 1400,
      crv: 1300
    }
  ];

  constructor() {
    console.log(this.campaign);
  }

  ngOnInit() {
  }

  public changeStateCampaign(event: any) {
    event.preventDefault();
    const message = event.currentTarget.checked ? 'Bạn có muốn kích hoạt chiến dịch?' : 'Bạn có muốn dừng lại chiến dịch?';
    if (!confirm(message)) {
      this.stateCampaign.nativeElement.checked = !event.currentTarget.checked;
    } else {
      this.stateCampaign.nativeElement.checked = event.currentTarget.checked;
    }
  }
}
