/**
 * @description config application
 * @version 1.0.0
 */
import { ModalModule } from 'ng2-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { PhoneComponent } from './shared/mobio-phone/mobio-phone.component';
import { ToasterModule } from 'angular2-toaster';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';

// provider
import { AppConfig } from './common/config/app.config';
import { ApiRequestService } from './common/service/common-service/api-request.service';
import { AuthenticateService, UserCanActive } from './common/service/common-service/authenticate.service';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AppComponent } from './app.component';
import { NotificationPopupService } from './layouts/services/notification-popup.service';
import { MessagePopupService } from './layouts/services/message-popup.service';
import { AccountPopupService } from './layouts/services/account-popup.service';
import { NavigatorSidebarService } from './layouts/services/navigator-sidebar.service';
import { PhoneService } from './common/service/common-service/phone.service';
import { JwtHelper } from "angular2-jwt/angular2-jwt";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LaddaModule,
    HttpModule,
    BrowserAnimationsModule,
    ToasterModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    PhoneComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    NotificationPopupService,
    MessagePopupService,
    AccountPopupService,
    AppConfig,
    ApiRequestService,
    AuthenticateService,
    NavigatorSidebarService,
    UserCanActive,
    PhoneService,
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
