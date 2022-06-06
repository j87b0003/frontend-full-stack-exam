import { Routes, RouterModule } from '@angular/router';
import { VerifyEmailGuard } from '../auth/verifyEmail-guard.service';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'page',
    loadChildren: () => import('../../page/page.module').then(m => m.PageModule)
  }
];
