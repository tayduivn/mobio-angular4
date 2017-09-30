import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import ckConfig from '../../common/config/ck.config';

@Component({
  selector: 'app-marketing-campaign',
  templateUrl: './marketing-campaign.component.html',
  styleUrls: ['./marketing-campaign.component.scss']
})
export class MarketingCampaignComponent implements OnInit {
  public config = {
    uiColor: '#F0F3F4',
    height: '300',
    toolbar: ckConfig.toolbar,
    toolbarGroups: ckConfig.toolbarGroups,
  };
  public emailmodal: number = 0;
  public customersave: boolean = true;
  public chanelmobio: boolean = true;
  public chanelfb: boolean = true;
  public chanelemail: boolean = true;
  @ViewChild('selectRegion') selectRegion: ElementRef;
  public active: number = 0;
  public region: any[] = new Array();
  public customeractive: number = 0;
  public gender: number = 0;
  public selectregions: any[] = new Array();
  public hidden: any[] = new Array(20);
  public emailtemplate: number = 0;
  @ViewChild('emailTabs') emailTabs: TabsetComponent;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  @ViewChild('customerTabs') customerTabs: TabsetComponent;
  @ViewChild('emailModal') emailModal: TabsetComponent
  // config datetime  StartDisplay
  public dateTimeEventStart: any = new Date();
  public optionsStartEventDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY'
  };
  public optionsEndEventDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY',
    minDate: this.dateTimeEventStart
  };
  public optionsStartDisplayDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY'
  };
  public optionsEndDisplayDatetimePicker = {
    format: 'DD/MM/YYYY HH:mm',
    dayViewHeaderFormat: 'MM YYYY',
    minDate: this.dateTimeEventStart
  };
  selectChannelMobio() {
    if (this.chanelmobio) {
      this.chanelmobio = false;
      this.chanelemail = true
      this.chanelfb = true;
    } else {
      this.chanelmobio = true;
    }
  }
  selectChannelFb() {
    if (this.chanelfb) {
      this.chanelmobio = true;
      this.chanelemail = true
      this.chanelfb = false;
    } else {
      this.chanelfb = true;
    }
  }
  selectChannelEmail() {
    if (this.chanelemail) {
      this.chanelmobio = true;
      this.chanelemail = false
      this.chanelfb = true;
    } else {
      this.chanelemail = true;
    }
  }
  showCustomerSave() {
    this.customersave ? this.customersave = false : this.customersave = true;
  }
  hideShowOption(event: any, id: number) {
    this.hidden[id] ? this.hidden[id] = false : this.hidden[id] = true;
  }
  modalTab(tab_id: number) {
    this.emailModal.tabs[tab_id].active = true;
    this.emailmodal = tab_id;
  }
  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
    this.active = tab_id;
  }
  emailTab(tab_id: number) {
    this.emailTabs.tabs[tab_id].active = true;
    this.emailtemplate = tab_id;
  }
  customerTab(tab_id: number) {
    this.customerTabs.tabs[tab_id].active = true;
    this.customeractive = tab_id;
  }
  selectGender(gender_id: number) {
    this.gender = gender_id
  }
  deleteAllRegion() {
    this.region = [];
  }
  selectAllRegion() {
    this.region = this.regions;
  }
  selectRe() {
    this.region.push(this.selectRegion.nativeElement.value);
  }
  public regions = ['An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước']


  constructor() {
  }

  ngOnInit() {
  }
}


