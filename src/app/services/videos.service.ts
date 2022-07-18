import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  httpHeaders;

  constructor(  private _http: HttpClient,
                private _AuthService: AuthService) {
    this.httpHeaders = new HttpHeaders({
      'Authorization-Token': `${this._AuthService.checkAuth()}`
    });
  }

    /* Create a Video */
  add(data: any): Observable<any> {
    return this._http.post(`${environment.API_URL}videos/add`, data, {headers: this.httpHeaders});
  }
    /* Edit a Video */
  edit(data: any): Observable<any> {
    return this._http.put(`${environment.API_URL}videos/edit`, data, {headers: this.httpHeaders});
  }
    /* Delete a Video */
  delete(idVideo: number): Observable<any> {
    return this._http.delete(`${environment.API_URL}videos/delete/${idVideo}`, {headers: this.httpHeaders});
  }
    /* Get All Videos */
  getAll(): Observable<any> {
    return this._http.get(`${environment.API_URL}videos`);
  }
    /* Get All Videos Desc */
  getAllDesc(): Observable<any> {
    return this._http.get(`${environment.API_URL}videos/desc`);
  }
    /* Get Video By Id */
  getById(idVideo: number): Observable<any> {
    return this._http.get(`${environment.API_URL}videos/${idVideo}`);
  }
    /* Get Videos By CategoryId */
  getByCategory(idCategory: number): Observable<any> {
    return this._http.get(`${environment.API_URL}videos/category/${idCategory}`);
  }
    /* Get Last Video */
  getLast(): Observable<any> {
    return this._http.get(`${environment.API_URL}videos/last`);
  }
    /* Get Last N Videos */
  getLastN(limit: number): Observable<any> {
    return this._http.get(`${environment.API_URL}videos/last/${limit}`);
  }
    /* Get Videos by Title */
  getByTitle(term: string): Observable<any> {
    return this._http.get(`${environment.API_URL}videos/title/${term}`);
  }
  
    /* Get Video from Youtube */
  getYoutubeVideo(idYoutubeVideo: string): Observable<any> {
    return this._http.get(`${environment.YOUTB_VID_URL}?key=${environment.YOUTB_KEY}&id=${idYoutubeVideo}&part=snippet`);
  }
  
}
