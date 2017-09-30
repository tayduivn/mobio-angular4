import {Component, OnInit} from '@angular/core';
import {NotificationPopupService} from './services/notification-popup.service'
import {MessagePopupService} from './services/message-popup.service'
import {AccountPopupService} from './services/account-popup.service'
import {NavigatorSidebarService} from './services/navigator-sidebar.service'
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./full-layout.component.scss'],
  templateUrl: './full-layout.component.html'
})

export class FullLayoutComponent implements OnInit {
  disabled: boolean = false;
  status: { isopen: boolean } = {isopen: false};

  notificationPopup: any;
  messagePopup: any;
  account: any;
  navigator: any;

  constructor(private router: Router,
              private _toasterService: ToasterService,
              private _notifiPopupService: NotificationPopupService,
              private _messagePopupService: MessagePopupService,
              private _accountPopupService: AccountPopupService,
              private _navigatorSidebarService: NavigatorSidebarService) {
  }

  ngOnInit(): void {
    this.notificationPopup = this._notifiPopupService.getData();
    this.messagePopup = this._messagePopupService.getData();
    this.account = this._accountPopupService.getData();
    this.navigator = this._navigatorSidebarService.getData();
  }

  public toggled($event: MouseEvent): void {
    console.log('Dropdown is now: ', $event);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public inboxUser() {
    this._toasterService.pop('info', null, 'Feature inbox in system');
  }

  public logOut() {
    localStorage.removeItem('__token');
    this.router.navigate(['login']);
  }
}
