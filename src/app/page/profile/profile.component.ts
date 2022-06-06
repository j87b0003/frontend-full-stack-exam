import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from "environments/environment";
import { UserService } from './service/user.service';
import { UserModel } from './service/userModel';
import { AuthService } from 'app/shared/auth/auth.service';
import { AlertsService } from 'app/widget/alerts/alerts.service';
import { ValidatorModel } from 'app/service/coreModel';
import { Config } from 'app/tools/config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.pug',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  config = Config;
  formSubmitted = false;

  form = new FormGroup({
    oldPassword: new FormControl(undefined, ValidatorModel.required()),
    password: new FormControl(undefined, ValidatorModel.required()),
    reenterPassword: new FormControl(undefined, ValidatorModel.required([this.matchValidator('password')]))
  });
  admin: UserModel;

  envUrl = environment.url;

  constructor(
    private authServ: AuthService,
    private userServ: UserService,
    private alertsServ: AlertsService
  ) {
    this.admin = this.authServ.getUser();
  }

  ngOnInit() { }

  get lf() {
    return this.form.controls;
  }
  reset() {
    this.formSubmitted = false;
    this.form.reset();
  }

  save() {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return
    }
    this.userServ.resetPassword({
      body: {
        oldPassword: this.form.value.oldPassword,
        password: this.form.value.password
      }
    }).subscribe(resp => {

      if (resp.code === 200) {
        this.reset();
        this.alertsServ.saveMsg();
      } else {
        this.alertsServ.errorMsg(resp.msg)
      }

    }, err => {
      this.alertsServ.errHttp(err);
    })
  }

  private matchValidator(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }
}
