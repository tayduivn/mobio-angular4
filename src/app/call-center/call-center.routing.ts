import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallCenterComponent } from './call-center.component';
import { CallCenterDashboardComponent } from '../call-center/dashboard/dashboard.component';
import { CallCenterConfigComponent } from '../call-center/config/config.component';
import { CallCenterManageCallsComponent } from '../call-center/manage-calls/manage-calls.component';

export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tổng đài'
        },
        component: CallCenterComponent,
        children: [
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full'
            }, {
                path: 'dashboard',
                data: {
                    title: 'Dashboard'
                },
                component: CallCenterDashboardComponent
            }, {
                path: 'config',
                data: {
                    title: 'Cấu hình số máy lẻ'
                },
                component: CallCenterConfigComponent
            }, {
                path: 'manage-calls',
                data: {
                    title: 'Quản lý cuộc gọi'
                },
                component: CallCenterManageCallsComponent
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CallCenterRoutingModule {

}