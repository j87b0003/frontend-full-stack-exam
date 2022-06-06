import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { AlertsService } from 'app/widget/alerts/alerts.service';
import { UserService } from '../profile/service/user.service';

@Component({
  selector: 'app-verifyEmail',
  templateUrl: './verifyEmail.component.pug',
  styleUrls: ['./verifyEmail.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private authServ: AuthService,
    private userServ: UserService,
    private alertsServ: AlertsService
  ) {
    this.userServ.info().subscribe(resp => {

      if (resp.code === 200) {
        let user = resp.data.info;
        this.authServ.setUser(user);
      }

    }, err => {
      this.alertsServ.errHttp(err);
    })
  }

  ngOnInit() {
  }

  sendVerifyEmail(): void {
    this.userServ.sendVerifyEmail().subscribe(resp => {

      if (resp.code === 200) {
        this.alertsServ.toastMsg(
          'warning',
          'Email is sent.'
        )
      } else {
        this.alertsServ.errHttp(resp.msg);
      }
      
    }, err => {
      this.alertsServ.errHttp(err);
    });
  }
}
