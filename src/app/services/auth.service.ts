import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const helper = new JwtHelperService;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private _http: HttpClient) { }

  login(userData: FormGroup): Observable<any> {
    return this._http.post(`${environment.API_URL}auth/login`, userData);
  }

  checkAuth() {
    if(localStorage.getItem('userSession') != null && localStorage.getItem('userSession') != undefined) {
      let userSession = JSON.parse(<string>localStorage.getItem('userSession'));
      const token = userSession.token;
      const isExpired = helper.isTokenExpired(token);

      if(isExpired) return false;

      return token;
      
    }else return false;
  }
}
