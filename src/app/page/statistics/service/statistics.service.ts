import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/shared/auth/auth.service';
import { ReqModel } from 'app/service/coreModel';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    protected httpClient: HttpClient
  ) { }

  signedUpTotal(): Observable<any> {
    return this.httpClient.get(
      environment.url + 'statistics/signedUpTotal'
    )

  }

  activeSessionTotal(): Observable<any> {
    return this.httpClient.get(
      environment.url + 'statistics/activeSessionTotal'
    )

  }

  activeSessionAverage(): Observable<any> {
    return this.httpClient.get(
      environment.url + 'statistics/activeSessionAverage'
    )

  }
}
