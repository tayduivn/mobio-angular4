import { Injectable } from '@angular/core';

@Injectable()
export class MessagePopupService {

  private _admin_avatar = 'assets/img/avatars/6.jpg';
  private _admin_name = 'mockup admin';

  constructor() {
  }

  getData() {
    return {
      total: 5,
      data: [
        {
          href: '#',
          arvatar: this._admin_avatar,
          sender: this._admin_name,
          time: '5 phút trước',
          title: 'Lorem ipsum dolor sit amet',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...',
        },
        {
          href: '#',
          arvatar: this._admin_avatar,
          sender: this._admin_name,
          time: '5 phút trước',
          title: 'Lorem ipsum dolor sit amet',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...',
        },
        {
          href: '#',
          arvatar: this._admin_avatar,
          sender: this._admin_name,
          time: '5 phút trước',
          title: 'Lorem ipsum dolor sit amet',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...',
        },
        {
          href: '#',
          arvatar: this._admin_avatar,
          sender: this._admin_name,
          time: '5 phút trước',
          title: 'Lorem ipsum dolor sit amet',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...',
        },
        {
          href: '#',
          arvatar: this._admin_avatar,
          sender: this._admin_name,
          time: '5 phút trước',
          title: 'Lorem ipsum dolor sit amet',
          body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...',
        },
      ],
    };
  }
}
