import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Observable} from 'rxjs/Observable';
import {DataLogin} from '../../common/model/login.model';
import {AuthenticateService} from '../../common/service/common-service/authenticate.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    limit: 5,
    timeout: 5000,
    animationClass: 'flyRight'
  });

  @ViewChild('userNameInput') userNameInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  isLoading: boolean = false;
  dataLogin: DataLogin;
  isView: boolean = false;

  constructor(private _toasterService: ToasterService,
              private _authService: AuthenticateService) {
    this.dataLogin = {
      userName: '',
      password: ''
    }
  }

  ngOnInit() {
    if (!!localStorage.getItem('__token')) {
      window.location.href = '/dashboard';
      this.isView = false;
    } else {
      this.isView = true;
    }
  }

  login() {
    this.isLoading = true;
    if (this.dataLogin.password.trim().length < 6) {
      this.isLoading = false;
      this.passwordInput.nativeElement.focus();
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Mật khẩu phải có độ dài từ 6 ký tự trở lên!');
      return;
    }
    const patternMail = /^\w+.?\w+@\w+/g;
    if (this.dataLogin.userName.trim().length === 0 ||
      !patternMail.test(this.dataLogin.userName.trim())) {
      this.isLoading = false;
      this.userNameInput.nativeElement.focus();
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Tên tài khoản không hợp lệ!');
      return;
    }
    this._authService.authenticate(this.dataLogin)
      .subscribe(data => {
        this._toasterService.clear();
        this._toasterService.pop('success', data.D,
          `Chúc ${data.merchantName} một ngày làm việc hiệu quả!`);
        Observable.timer(1500)
          .subscribe(() => {
            // this.router.navigate(['/']);
            window.location.href = '/';
          })
      }, err => {
        this._toasterService.clear();
        this._toasterService.pop('error', null, err.D);
        this.isLoading = false;
      });
  }
}
