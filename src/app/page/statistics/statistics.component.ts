import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertsService } from 'app/widget/alerts/alerts.service';
import { StatisticsService } from './service/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.pug',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statistics = {
    signedUpTotal: 0,
    activeSessionTotal: 0,
    activeSessionAverage: 0
  }


  constructor(
    private cdr: ChangeDetectorRef,
    private statisticsServ: StatisticsService,
    private alertsServ: AlertsService
  ) {
    this.statisticsServ.signedUpTotal().subscribe(resp => {

      if (resp.code === 200) {
        this.statistics.signedUpTotal = resp.data.info.number;
        this.cdr.markForCheck();
      } else {
        this.alertsServ.errorMsg(resp.msg);
      }
      
    }, err => {
      this.alertsServ.errHttp(err);
    })

    this.statisticsServ.activeSessionTotal().subscribe(resp => {

      if (resp.code === 200) {
        this.statistics.activeSessionTotal = resp.data.info.number;
        this.cdr.markForCheck();
      } else {
        this.alertsServ.errorMsg(resp.msg);
      }
      
    }, err => {
      this.alertsServ.errHttp(err);
    })

    this.statisticsServ.activeSessionAverage().subscribe(resp => {

      if (resp.code === 200) {
        this.statistics.activeSessionAverage = resp.data.info.number;
        this.cdr.markForCheck();
      } else {
        this.alertsServ.errorMsg(resp.msg);
      }

    }, err => {
      this.alertsServ.errHttp(err);
    })

  }

  ngOnInit() {
  }

}
