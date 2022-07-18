import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  httpHeaders;

  constructor(  private _http: HttpClient,
                private _AuthService: AuthService) {
    this.httpHeaders = new HttpHeaders({
      'Authorization-Token': `${this._AuthService.checkAuth()}`
    });
  }

    /* Create New Article */
  add(articleData: any): Observable<any> {
    return this._http.post(`${environment.API_URL}articles/create`, articleData, { headers: this.httpHeaders });
  }
    /* Edit Article */
  edit(articleData: any): Observable<any> {
    return this._http.put(`${environment.API_URL}articles/edit`, articleData, {headers: this.httpHeaders});
  }
    /* Delete Article */
  delete(idArticle: number): Observable<any> {
    return this._http.delete(`${environment.API_URL}articles/delete/${idArticle}`, {headers: this.httpHeaders});
  }
    /* Get All Articles */
  getAll(): Observable<any> {
    return this._http.get(`${environment.API_URL}articles`);
  }
    /* Get All Articles Desc */
  getAllDesc(): Observable<any> {
    return this._http.get(`${environment.API_URL}articles/desc`);
  }
    /* Get Last Article */
  getLast(): Observable<any> {
    return this._http.get(`${environment.API_URL}articles/last`);
  }
    /* Get Last N Articles */
  getLastN(limit: number): Observable<any> {
    return this._http.get(`${environment.API_URL}articles/last/${limit}`);
  }
    /* Get By Id */
  getById(id: number): Observable<any> {
    return this._http.get(`${environment.API_URL}articles/${id}`);
  }
    /* Get Articles By Category Id */
  getByCategoryId(categoryId: number): Observable<any> {
    return this._http.get(`${environment.API_URL}articles/category/${categoryId}`);
  }
    /* Get Articles By Title */
  getByTitle(term: string): Observable<any> {
    return this._http.get(`${environment.API_URL}articles/title/${term}`);
  }
}