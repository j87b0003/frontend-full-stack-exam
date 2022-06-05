import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { AlertsService } from 'app/widget/alerts/alerts.service';
import { UserService } from '../profile/service/user.service';
import { UserGetRespModel, UserModel } from '../profile/service/userModel';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.pug',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  user: UserModel;

  constructor(
    private cdr: ChangeDetectorRef,
    private authServ: AuthService,
    private userServ: UserService,
    private alertsServ: AlertsService
  ) {
      this.userServ.info().subscribe((resp: UserGetRespModel) => {

        if (resp.code === 200) {
          this.user = resp.data.info;
          this.cdr.markForCheck();
        } else {
          this.alertsServ.errorMsg(resp.msg);
        }

      }, err => {
        console.log(err)
        this.alertsServ.errHttp(err);
      })
  }

  ngOnInit() { }

}
