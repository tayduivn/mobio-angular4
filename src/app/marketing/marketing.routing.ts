import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingComponent } from './marketing.component';
import { MarketingDashboardComponent } from './marketing-dashboard/marketing-dashboard.component';
import { MarketingReportComponent } from './marketing-report/marketing-report.component';
import { MarketingCampaignComponent } from './marketing-campaign/marketing-campaign.component';

export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Marketing',
            redirectTo: 'dashboard'
        },
        component: MarketingComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                data: {
                    title: 'Quản lý chiến dịch'
                },
                component: MarketingDashboardComponent
            },
            {
                path: 'dashboard/report',
                data: {
                    title: 'Quản lý chiến dịch > Báo cáo'
                },
                component: MarketingReportComponent
            }, {
                path: 'dashboard/campaign',
                data: {
                    title: 'Quản lý chiến dịch > Thông tin chiên dịch'
                },
                component: MarketingCampaignComponent
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MaketingRoutingModule {

}