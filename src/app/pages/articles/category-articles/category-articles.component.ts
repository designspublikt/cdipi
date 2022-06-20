import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleFull } from 'src/app/interfaces/article';
import { Category } from 'src/app/interfaces/category';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-articles',
  templateUrl: './category-articles.component.html',
  styleUrls: ['./category-articles.component.css']
})
export class CategoryArticlesComponent implements OnInit {

  idCategory: number = 0;
  categories: Category[] = [];
  categoryArticle: Category = {} as Category;
  articles: ArticleFull[] = [];

  constructor(  private _CategoriesService: CategoriesService,
                private _ArticlesService: ArticlesService,
                private _ActivatedRoute: ActivatedRoute) {
    
  }

  async ngOnInit() {
    this._ActivatedRoute.params.subscribe(async params => {
      this.idCategory = params.id;
      await this.getCategory();
      await this.getArticles();
    });
  }





  async getCategory() {
    let categoryP = new Promise((resolve, reject) => {
      this._CategoriesService.getById(this.idCategory)
        .subscribe(categoryRes => {
          if(!categoryRes.status) reject(categoryRes);

          categoryRes.response.map((category: Category) => this.categoryArticle = category);
          resolve(categoryRes.status);
        });
    });

    let result = await categoryP;
    return result;
  }


  

  async getArticles() {
    this.articles = [];
    let articlesP = new Promise((resolve, reject) => {
      this._ArticlesService.getByCategoryId(this.idCategory)
        .subscribe(articlesRes => {
          if(!articlesRes.status) reject(articlesRes);

          articlesRes.response.map((article: ArticleFull) => this.articles.push(article));
          resolve(articlesRes.status);
        });
    });

    let result = await articlesP;
    return result;
  }

}
