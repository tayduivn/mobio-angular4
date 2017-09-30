import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Register} from './register.model';
import {UtilService} from '../../common/service/common-service/util.service';
import {AuthenticateService} from '../../common/service/common-service/authenticate.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    limit: 5,
    timeout: 5000,
    animationClass: 'flyRight'
  });

  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('retryPassInput') retryPassInput: ElementRef;

  // common data
  public lstTypeDisplay = [
    {value: 1, name: 'Kiểu 1', link: 'http://mobio.vn/template-1/'},
    {value: 2, name: 'Kiểu 2', link: 'http://mobio.vn/template-2/'},
    {value: 3, name: 'Kiểu 3', link: 'http://mobio.vn/template-3/'},
    {value: 4, name: 'Kiểu 4', link: 'http://mobio.vn/template-4/'},
    {value: 5, name: 'Kiểu 5', link: 'http://mobio.vn/template-5/'},
    {value: 6, name: 'Kiểu 6', link: 'http://mobio.vn/template-6/'},
    {value: 7, name: 'Kiểu 7', link: 'http://mobio.vn/template-7/'},
    {value: 8, name: 'Kiểu 8', link: 'http://mobio.vn/template-8/'},
  ];

  public registerData: Register;
  public isLoading: boolean = false;
  public isView: boolean = false;

  public nameBrandsAfter: string = '';

  constructor(private  _toasterService: ToasterService,
              private _router: Router,
              private _authService: AuthenticateService) {
    this.initData();
  }

  ngOnInit() {
    if (!!localStorage.getItem('__token')) {
      window.location.href = '/dashboard';
      this.isView = false;
    } else {
      this.isView = true;
    }
  }

  public changeBrands(nameBrands: string) {
    this.nameBrandsAfter = UtilService.removeUnicodeViWhiteSpace(nameBrands).toLowerCase();
  }

  /**
   * @method selectTypeDisplay
   * @description selected type display
   */
  public selectTypeDisplay(value: number) {
    this.registerData.displayType = value;

  }

  public viewTypeDisplay() {
    if (this.registerData.displayType === 0) {
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Vui lòng chọn 1 kiểu hiển thị!');
      return;
    }
    const link = `http://mobio.vn/template-${this.registerData.displayType}/`;
    window.close();
    // window.open(link, 'myWindow', 'width=800,height=600');
    const width = 800;
    const height = 600;

    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    window.open(link, 'Sample ',
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, ' +
      'copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
  }

  public registerAccount() {
    this.isLoading = true;
    if (this.registerData.password.trim() !== this.registerData.retryPass.trim()) {
      this.isLoading = false;
      this.retryPassInput.nativeElement.focus();
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Mật khẩu nhập lại không khớp');
      return;
    }
    const patternMail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/g;
    if (this.registerData.email.trim().length === 0 ||
      !patternMail.test(this.registerData.email.trim())) {
      this.isLoading = false;
      this.emailInput.nativeElement.focus();
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Email không hợp lệ!');
      return;
    }
    if (this.registerData.displayType === 0) {
      this.isLoading = false;
      this._toasterService.clear();
      this._toasterService.pop('warning', null, 'Vui lòng chọn ít nhất 1 kiểu hiển thị!');
      return;
    }
    this.registerData.userName = `${this.registerData.userName}@${this.nameBrandsAfter}`;
    this._authService.registerAccount(this.registerData)
      .subscribe(data => {
        this._toasterService.clear();
        const message = `Đăng ký thành công! Bạn cần kiểm tra email ${this.registerData.email} để xác nhận đăng ký tài khoản!`;
        this._toasterService.pop('success', null, message);
        Observable.timer(5000)
          .subscribe(() => {
            this._router.navigate(['login']);
          })
      }, err => {
        this.isLoading = false;
        this._toasterService.clear();
        this._toasterService.pop('error', null, err.D);
      });
  }

  public initData() {
    this.registerData = {
      nameBrands: '',
      userName: '',
      email: '',
      password: '',
      retryPass: '',
      displayType: 0
    }
  }
}
