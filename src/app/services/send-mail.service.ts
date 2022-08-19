import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(  private _http: HttpClient) { }

  sendMail(data: any): Observable<any> {
    return this._http.post(`${environment.API_URL}sendmail/send`, data);
  }

  sendCoachMail(data: any): Observable<any> {
    return this._http.post(`${environment.API_URL}sendmail/sendcoaching`, data);
  }
}
