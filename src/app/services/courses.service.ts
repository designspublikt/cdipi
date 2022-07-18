import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(  private _http: HttpClient) { }

    /* Get All Courses */
  getAll(): Observable<any> {
    return this._http.get(`${environment.API_URL}courses`);
  }
}
