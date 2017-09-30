import { JwtHelper } from 'angular2-jwt';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'breadcrumbs',
  templateUrl: 'breadcrumb.component.html',
  styles: [`
            .mPoint{
              float:right;
          }`]
  // template: `
  //   <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last=last>
  //     <li class="breadcrumb-item"
  //         *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '>' || breadcrumb.label.title&&last"
  //         [ngClass]="{active: last}">
  //       <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
  //       <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
  //     </li>
  //   </ng-template>`
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Array<Object>;
  content: string;
  btn: string;
  isShow = true;
  mPoint = true;
  constructor(private router: Router, private route: ActivatedRoute, private jwtHelper: JwtHelper) {
    this.content = "Nội dung đăng ký tham gia mpoint và quyền lợi";
    this.btn = "Bỏ Qua";
    var token = localStorage.getItem("__token");
    var decoded = this.jwtHelper.decodeToken(token);
    var status = decoded.TrangThaiThamGiaxPoint;
    if (status == 3) {
      this.mPoint = false;
    }
  }
  @ViewChild('childModal') public childModal: ModalDirective;

  ngOnInit(): void {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.breadcrumbs = [];
      let currentRoute = this.route.root,
        url = '';
      do {
        let childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach(route => {
          if (route.outlet === 'primary') {
            let routeSnapshot = route.snapshot;
            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
            this.breadcrumbs.push({
              label: route.snapshot.data,
              url: url
            });
            currentRoute = route;
          }
        });
      } while (currentRoute);
    });
  }

  register() {
    this.content = "Cảm ơn bạn đã tham gia mPoint";
    this.btn = "Đóng";
    this.isShow = false;
  }
}

