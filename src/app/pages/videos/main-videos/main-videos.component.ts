import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-main-videos',
  templateUrl: './main-videos.component.html',
  styleUrls: ['./main-videos.component.css']
})
export class MainVideosComponent implements OnInit {

  videos: any[] = [];
  categories: Category[] = [];

  constructor(  private _CategoriesServices: CategoriesService) {
    this.videos = Array(12).fill('').map((x,i) => i);
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories = this._CategoriesServices.getAll();
  }

}
