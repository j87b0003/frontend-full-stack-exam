import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/shared/auth/auth.service';
import { ReqModel } from 'app/service/coreModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    protected httpClient: HttpClient,
    protected authServ: AuthService
  ) { }

  info(): Observable<any> {
    return this.httpClient.get(
      environment.url + 'user/info',
      {
        headers: {
          'access-token': this.authServ.getUser().accessToken
        }
      }
    )
  }

  resetPassword(req: ReqModel): Observable<any> {
    return this.httpClient.post(
      environment.url + 'user/resetPassword',
      {
        data: req.body
      },
      {
        headers: {
          'access-token': this.authServ.getUser().accessToken
        }
      }
    )
  }

  sendVerifyEmail(): Observable<any> {
    return this.httpClient.get(
      environment.url + 'user/resetPassword',
      {
        headers: {
          'access-token': this.authServ.getUser().accessToken
        }
      }
    )

  }

}
