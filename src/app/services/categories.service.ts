import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  httpHeaders;

  constructor(  private _http: HttpClient,
                private _AuthService: AuthService) {
    this.httpHeaders = new HttpHeaders({
      'Authorization-Token': `${this._AuthService.checkAuth()}`
    });
  }

    /* Create Category */
  add(form: any): Observable<any> {
    return this._http.post(`${environment.API_URL}categories/create`, form, {headers: this.httpHeaders});
  }
    /* Edit Category */
  edit(form: any): Observable<any> {
    return this._http.put(`${environment.API_URL}categories/edit`, form, {headers: this.httpHeaders});
  }
    /* Delete Category */
  delete(idCategory: number): Observable<any> {
    return this._http.delete(`${environment.API_URL}categories/delete/${idCategory}`, {headers: this.httpHeaders});
  }
    /* Get All Categories */
  getAll(): Observable<any> {
    return this._http.get(`${environment.API_URL}categories`);
  }
    /* Get All Categories By type */
  getByType(type: string): Observable<any> {
    return this._http.get(`${environment.API_URL}categories/type/${type}`);
  }
    /* Get Category By Id */
  getById(id: number): Observable<any> {
    return this._http.get(`${environment.API_URL}categories/${id}`);
  }
    /* Get Category By Name */
  getByName(name: string): Observable<any> {
    return this._http.get(`${environment.API_URL}categories/name/${name}`);
  }
    /* Get Last Category */
  getLast(): Observable<any> {
    return this._http.get(`${environment.API_URL}categories/last`);
  }
}
