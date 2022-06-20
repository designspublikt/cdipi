import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { FullVideo } from 'src/app/interfaces/video';
import { CategoriesService } from 'src/app/services/categories.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-category-videos',
  templateUrl: './category-videos.component.html',
  styleUrls: ['./category-videos.component.css']
})
export class CategoryVideosComponent implements OnInit {

  idCategory: number = 0;
  categoryVideo: Category = {} as Category;
  videos: FullVideo[] = [];

  constructor(  private _CategoriesService: CategoriesService,
                private _VideosService: VideosService,
                private _ActivatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this._ActivatedRoute.params.subscribe(async params => {
      this.idCategory = params.id;
      await this.getCategory();
      await this.getVideos();
    });
  }


  async getCategory() {
    let categoryP = new Promise((resolve, reject) => {
      this._CategoriesService.getById(this.idCategory)
        .subscribe(categoryRes => {
          if(!categoryRes.status) reject(categoryRes);

          categoryRes.response.map((category: Category) => this.categoryVideo = category);
          resolve(categoryRes);
        });
    });

    let result = await categoryP;
    return result;
  }


  async getVideos() {
    this.videos = [];
    let videosP = new Promise((resolve, reject) => {
      this._VideosService.getByCategory(this.idCategory)
        .subscribe(videosRes => {
          if(!videosRes.status) reject(videosRes);

          videosRes.response.map((video: FullVideo) => this.videos.push(video));
          resolve(videosRes.status);
        });
    });

    let result = await videosP;
    return result;
  }

}
