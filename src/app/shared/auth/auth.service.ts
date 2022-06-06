import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReqModel, RespModel } from 'app/service/coreModel';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'app/widget/alerts/alerts.service';
import { UserModel } from '../../page/profile/service/userModel';
import { SocialAuthService } from 'angularx-social-login';

@Injectable()
export class AuthService {
  private apiUrl = environment.url;
  private auth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private verify: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: UserModel;
  private oauth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private socialAuthServ: SocialAuthService,
    private spinnerServ: NgxSpinnerService,
    private router: Router,
    private httpClient: HttpClient,
    private alertsServ: AlertsService
  ) {
    const admin = JSON.parse(localStorage.getItem('user'));
    if (admin !== null) {
      this.user = admin;
      this.auth.next(true);
      this.verify.next(this.user.verify);
    }

    this.auth.subscribe(flag => {
      if (flag) {
        if (this.user.verify) {
          this.router.navigate(['/page/info']);
        } else {
          this.router.navigate(['/page/verifyEmail']);
        }
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  signup(email: string, password: string) {
    this.spinnerServ.show();

    this.httpClient.post(
      this.apiUrl + 'auth/email/signup',
      {
        data: {
          email: email,
          password: password
        }
      }
    ).subscribe((resp: RespModel) => {

      if (resp.code === 200) {
        this.getInfo(resp);
      } else {
        this.alertsServ.errorMsg(resp.msg);
        this.spinnerServ.hide();
      }

    }, err => {
      this.auth.next(false);
      this.alertsServ.errHttp(err);

      this.spinnerServ.hide();
    });

  }

  setUser(user?: UserModel) {
    if (!user) user = this.user;


    localStorage.setItem(
      'user', JSON.stringify(
        {
          email: user.email,
          accessToken: user.accessToken || this.user.accessToken,
          name: user.name,
          verify: user.verify
        }
      )
    );

    this.verify.next(user.verify);
    this.auth.next(true);
  }

  getUser() {
    return this.user;
  }
  removeUser() {
    this.user = null;
    localStorage.removeItem('user');
    this.auth.next(false);
    this.oauth.next(false);
  }

  oAuthSignIn(user) {
    if (user) {

      this.httpClient.post(
        this.apiUrl + 'auth/oauth',
        {
          data: {
            provider: user.provider,
            email: user.email,
            name: user.name,
            accessToken: user.authToken,
          }
        }
      ).subscribe((resp: RespModel) => {

        if (resp.code === 200) {
          this.user = resp.data.info
          this.setUser();
          this.oauth.next(true);
        } else {
          this.alertsServ.errorMsg(resp.msg);
          this.spinnerServ.hide();
        }

      }, err => {
        this.auth.next(false);
        this.alertsServ.errHttp(err);

        this.spinnerServ.hide();
      });
    }
  }

  login(email: string, password: string) {
    this.spinnerServ.show();

    this.httpClient.post(
      this.apiUrl + 'auth/email/login',
      {
        data: {
          email: email,
          password: password
        }
      }
    ).subscribe((resp: RespModel) => {

      if (resp.code === 200) {
        this.getInfo(resp);
      } else {
        this.alertsServ.errorMsg(resp.msg);
        this.spinnerServ.hide();
      }

    }, err => {
      this.auth.next(false);
      this.alertsServ.errHttp(err);

      this.spinnerServ.hide();
    });
  }

  private getInfo(resp) {
    this.httpClient.get(
      this.apiUrl + 'user/info',
      {
        headers: {
          'access-token': resp.data.info.accessToken
        }
      }
    ).subscribe((response: RespModel) => {

      if (response.code === 200) {
        this.user = response.data.info;
        this.user.accessToken = resp.data.info.accessToken;

        this.setUser();

        this.spinnerServ.hide();

      } else {
        this.alertsServ.errorMsg(resp.msg);
        this.spinnerServ.hide();

      }
    }, err => {
      this.alertsServ.errHttp(err);

      this.spinnerServ.hide();
    })
  }

  logout() {
    if (this.oauth.value) {
      this.socialAuthServ.signOut().then(() => {
        this.removeUser();
      })
    } else {
      this.removeUser();
    }
  }

  isAuthenticated(): Observable<boolean> | any {
    return this.auth;
  }

  isVerify(): Observable<boolean> | any {
    return this.verify;
  }
}
