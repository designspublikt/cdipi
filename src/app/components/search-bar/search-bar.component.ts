import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArticleFull } from 'src/app/interfaces/article';
import { FullVideo } from 'src/app/interfaces/video';
import { ArticlesService } from 'src/app/services/articles.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  showResults: boolean = false;
  loading: boolean = false;
  results: any = {
    'articles': [],
    'videos': []
  };

  constructor(  private _ArticlesService: ArticlesService,
                private _VideosService: VideosService,
                private _ToastrService: ToastrService) { }

  ngOnInit(): void {
  }


  async search(form: NgForm) {

    if(form.invalid) {
      this._ToastrService.error('DEBE INGRESAR UN PARÁMETRO', 'SE DEBE INGRESAR UN TEXTO PARA REALIZAR UNA BÚSQUEDA');
      return;
    }

    this.results.articles = [];
    this.results.videos = [];
    
    this.loading = true;
    this.showResults = true;

    await this.getArticles(form.controls.term.value);
    await this.getVideos(form.controls.term.value);

    this.loading = false;
    console.log(this.results);
  }

  closeBox() {
    this.showResults = false;
    this.loading = false;
  }


  async getArticles(term: string) {
    let articlesP = new Promise((resolve, reject) => {
      this._ArticlesService.getByTitle(term)
        .subscribe(articlesRes => {
          if(!articlesRes.status) reject(articlesRes);

          articlesRes.response.map((article: ArticleFull) => this.results.articles.push(article));
          resolve(articlesRes.status);
        });
    });

    let result = await articlesP;
    return result;
  }

  async getVideos(term: string) {
    let videosP = new Promise((resolve, reject) => {
      this._VideosService.getByTitle(term)
        .subscribe(videosRes => {
          if(!videosRes.status) reject(videosRes);

          videosRes.response.map((video: FullVideo) => this.results.videos.push(video));
          resolve(videosRes.status);
        });
    });

    let result = await videosP;
    return result;
  }

}