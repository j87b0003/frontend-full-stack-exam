import { ActivatedRouteSnapshot, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class VerifyEmailGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private authServ: AuthService,
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authServ.isVerify().value) {
      if (state.url !== '/page/verifyEmail') {
        this.router.navigate(['/page/verifyEmail']);
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}