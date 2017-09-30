import { Injectable } from '@angular/core';

@Injectable()
export class NotificationPopupService {

  private _iconType: string[];

  private _icon_user_follow: number = 0;
  private _icon_user_unfollow: number = 1;
  private _icon_chart: number = 2;
  private _icon_basket_loaded: number = 3;
  private _icon_speedometer: number = 4;

  constructor() {
    this._iconType = ['icon-user-follow text-success',
      'icon-user-unfollow text-danger',
      'icon-chart text-info',
      'icon-basket-loaded text-primary',
      'icon-speedometer text-warning',
    ];
  }

  getData() {
    return {
      total: 5,
      data: [
        {
          href: '#',
          class: this._iconType[this._icon_user_follow],
          lable: 'New user registered',
        },
        {
          href: '#',
          class: this._iconType[this._icon_user_unfollow],
          lable: 'User deleted',
        },
        {
          href: '#',
          class: this._iconType[this._icon_chart],
          lable: 'Sales report is ready',
        },
        {
          href: '#',
          class: this._iconType[this._icon_basket_loaded],
          lable: 'New client',
        },
        {
          href: '#',
          class: this._iconType[this._icon_speedometer],
          lable: 'Server overloaded',
        }
      ],
    };
  }
}
