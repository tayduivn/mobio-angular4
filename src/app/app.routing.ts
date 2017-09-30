/**
 * @description config routing application
 */

import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { Observable } from 'rxjs';

import { AppCustomPreload } from './app.routing.loader';

import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { UserCanActive } from './common/service/common-service/authenticate.service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    canActivate: [UserCanActive],
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'account',
        loadChildren: './merchant/merchant.module#MerchantModule',
        data: { preload: true }
      },
      {
        path: 'customer-care',
        loadChildren: './customer-care/customer-care.module#CustomerCareModule',
        data: { preload: true }
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
      }, {
        path: 'marketing',
        loadChildren: './marketing/marketing.module#MarketingModule',
        data: { preload: true }
      }, {
        path: 'customer-insight',
        loadChildren: './customer-insight/customer-insight.module#CustomerInsightModule',
        data: { preload: true }
      }, {
        path: 'social',
        loadChildren: './social/social.module#SocialModule',
        data: { preload: true }
      }, {
        path: 'call-center',
        loadChildren: './call-center/call-center.module#CallCenterModule',
        data: { preload: true }
      }
    ]
  }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: false})],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: AppCustomPreload, useHash: false })],
  exports: [RouterModule],
  providers: [AppCustomPreload]
})

export class AppRoutingModule {
}
