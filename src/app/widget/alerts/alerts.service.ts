import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alert = new Subject<AlertsModel>();
  public type: AlertsType = AlertsType.success;
  public dismissionTimeout = 3000;

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor() {
  }

  get(): Observable<AlertsModel> {
    return this.alert.asObservable();
  }
  set(icon: SweetAlertIcon, title: string, content: string = null) {
    this.toast.fire({
      toast: false,
      icon: icon,
      title: title,
      html: content
    });
  }
  toastMsg(icon: SweetAlertIcon, content: string = null) {
    this.toast.fire({
      toast: true,
      icon: icon,
      title: content
    });
  }
  private toContent(content) {
    return content
  }
  saveMsg(content?: string) {
    this.toastMsg('success', 'Saved');
  }
  deleteMsg(content?: string) {
    this.toastMsg('warning', 'Deleted');
  }
  copyMsg(content?: string) {
    this.toastMsg('warning', 'Copy');
  }
  nullMsg() {
    this.toastMsg('warning', 'Null');
  }

  errorMsg(content?: string) {
    this.set('error', 'Warning', (content) ? content : this.toContent('Error'));
  }
  errHttp(err: any, show: boolean = false) {
    let content = err;
    if (show) {
      console.log(err)
    }
    switch (err.status) {
      case 404:
        this.nullMsg();
        break;
      default:
        this.errorMsg(content);
    }
  }
}
export interface AlertsModel {
  msg: MsgModel;
  type: AlertsType;
  dismissionTimeout: number;
}
export interface MsgModel {
  icon: IconType;
  title: string;
  content: string;
}
export enum IconType {
  info = 'fa fa-info',
  warning = 'fa fa-exclamation',
  copy = 'ft-copy'
}
export enum AlertsType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  copy = 'amber'
}
