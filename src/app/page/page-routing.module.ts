import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { InfoComponent } from './info/info.component';
import { VerifyEmailComponent } from './verifyEmail/verifyEmail.component';
import { VerifyEmailGuard } from 'app/shared/auth/verifyEmail-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [VerifyEmailGuard],
    children: [
      {
        path: 'info',
        component: InfoComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'verifyEmail',
        component: VerifyEmailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule { }
