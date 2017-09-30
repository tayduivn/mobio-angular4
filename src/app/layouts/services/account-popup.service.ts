import { Injectable } from '@angular/core';

@Injectable()
export class AccountPopupService {

  private _user_avatar = 'assets/img/avatars/4.jpg';

  constructor() {
  }

  getData() {
    return {
      username: 'ongxabeou',
      avatar: this._user_avatar,
      full_name: 'Lý Tuấn Anh',
      email: 'lytuananh2003@gmail.com',
      user_type: 1,
    };
  }
}
