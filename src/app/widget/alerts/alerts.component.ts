import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertsService, MsgModel, AlertsType } from './alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.pug',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  subscript: Subscription;
  msg: MsgModel;
  type: AlertsType;
  dismissionTimeout = 3000;
  show = false;

  constructor(private _alerts: AlertsService) {
    this.subscript = this._alerts.get().subscribe(res => {
      this.msg = res.msg;
      this.type = res.type;
      this.dismissionTimeout = res.dismissionTimeout;
      this.show = true;
      setTimeout(() => (this.show = false), this.dismissionTimeout);
    });
  }

  ngOnInit() {}
  close() {
    this.show = false;
  }
}
