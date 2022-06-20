import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(  private _http: HttpClient) { }

    /* Create Category */
  add(form: any): Observable<any> {
    return this._http.post(`${environment.API_URL}categories/create`, form);
  }
    /* Edit Category */
  edit(form: any): Observable<any> {
    return this._http.put(`${environment.API_URL}categories/edit`, form);
  }
    /* Delete Category */
  delete(idCategory: number): Observable<any> {
    return this._http.delete(`${environment.API_URL}categories/delete/${idCategory}`);
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
