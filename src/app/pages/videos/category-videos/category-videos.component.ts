import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-videos',
  templateUrl: './category-videos.component.html',
  styleUrls: ['./category-videos.component.css']
})
export class CategoryVideosComponent implements OnInit {

  categoryVideo: Category = {} as Category;
  videos: any[] = [];

  constructor(  private _CategoriesService: CategoriesService,
                private _ActivatedRoute: ActivatedRoute) {
    this.videos = Array(12).fill('').map((x,i) => i);
  }

  ngOnInit(): void {
    let categoryName = '';
    this._ActivatedRoute.params.subscribe(params => {
      categoryName = params.name;
      this.getCategory(categoryName);
    });
  }

  getCategory(name: string) {
    this._CategoriesService.getByName(name).map(categoryRes => this.categoryVideo = categoryRes);
  }

}
