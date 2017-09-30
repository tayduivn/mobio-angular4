import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialComponent } from './social.component';
import { SocialDashboardComponent } from '../social/social-dashboard/social-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Mạng xã hội'
        },
        component: SocialComponent,
        children: [
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full'
            }, {
                path: 'dashboard',
                data: {
                    title: 'Bảng tin'
                },
                component: SocialDashboardComponent
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SocialRoutingModule {

}