import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReqModel, RespModel } from 'app/service/coreModel';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'app/widget/alerts/alerts.service';
import { UserModel } from '../../page/profile/service/userModel';

@Injectable()
export class AuthService {
  private apiUrl = environment.url;
  private auth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: UserModel;

  constructor(
    private spinnerServ: NgxSpinnerService,
    private router: Router,
    private httpClient: HttpClient,
    private alertsServ: AlertsService
  ) {
    const admin = JSON.parse(localStorage.getItem('user'));
    if (admin !== null) {
      this.user = admin;
      this.auth.next(true);
    }

    this.auth.subscribe(flag => {
      if (flag) {
        this.router.navigate(['/page/info']);
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  signin(email: string, password: string) {
    this.user = new UserModel();
    this.user.email = email;
    this.login({
      body: {
        email: email,
        password: password
      }
    });
  }

  getUser() {
    return this.user;
  }

  private login(req: ReqModel) {
    this.spinnerServ.show();

    this.httpClient.post(
      this.apiUrl + 'auth/email/login',
      {
        data: req.body
      }
    ).subscribe((resp: RespModel) => {

      if (resp.code === 200) {
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

            localStorage.setItem('user', JSON.stringify({
              email: this.user.email,
              accessToken: resp.data.info.accessToken,
              name: this.user.name
            }));

            this.auth.next(true);
            this.spinnerServ.hide();

          } else {
            this.alertsServ.errorMsg(resp.msg);
            this.spinnerServ.hide();

          }
        }, err => {
          this.alertsServ.errHttp(err);

          this.spinnerServ.hide();
        })

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

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.auth.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth;
  }
}
