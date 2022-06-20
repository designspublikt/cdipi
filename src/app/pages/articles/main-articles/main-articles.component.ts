import { Component, OnInit } from '@angular/core';
import { ArticleFull } from 'src/app/interfaces/article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-main-articles',
  templateUrl: './main-articles.component.html',
  styleUrls: ['./main-articles.component.css']
})
export class MainArticlesComponent implements OnInit {

  articles: ArticleFull[] = [];

  constructor(  private _ArticlesSerivce: ArticlesService) { }

  async ngOnInit() {
    await this.getArticles();
  }



  async getArticles() {
    let articleP = new Promise((resolve, reject) => {
      this._ArticlesSerivce.getAllDesc()
        .subscribe(articlesRes => {
          if(!articlesRes.status) reject(articlesRes);

          articlesRes.response.map((article: ArticleFull) => this.articles.push(article));
          resolve(articlesRes.status);
        });
    });

    let result = await articleP;
    return result;
  }

}
