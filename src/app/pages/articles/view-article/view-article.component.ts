import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleFull } from 'src/app/interfaces/article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewArticleComponent implements OnInit {

  article: ArticleFull = {} as ArticleFull;
  articlesByCategory: ArticleFull[] = [];
  idArticle: number = 0;

  constructor(  private _ArticlesService: ArticlesService,
                private _ActivatedRoute: ActivatedRoute,
                private _Router: Router) { }

  async ngOnInit() {
    this._ActivatedRoute.params.subscribe(async params => {
      this.idArticle = params.id;
      
      await this.getArticle();
      await this.getArticlesByCategory(this.article.id_category);
    });
  }

  async getArticle() {
    let articleP = new Promise((resolve, reject) => {
      this.article = {} as ArticleFull;

      this._ArticlesService.getById(this.idArticle)
        .subscribe(articleRes => {
          if(!articleRes.status) reject(articleRes);

          articleRes.response.map((article: ArticleFull) => this.article = article);
          resolve(articleRes.status);
        });
    });

    let result = await articleP;
    return result;
  }

  async getArticlesByCategory(idCategory: number) {
    this.articlesByCategory = [];
    
    let articlesP = new Promise((resolve, reject) => {
      this._ArticlesService.getByCategoryId(idCategory)
        .subscribe(articlesRes => {
          if(!articlesRes.status) reject(articlesRes);

          articlesRes.response.map((article: ArticleFull) => this.articlesByCategory.push(article));
          resolve(articlesRes.status);
        });
    });

    let result = await articlesP;
    return result;
  }

}
