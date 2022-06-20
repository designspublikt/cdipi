import { Component, OnInit } from '@angular/core';
import { FullVideo } from 'src/app/interfaces/video';
import { CategoriesService } from 'src/app/services/categories.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-main-videos',
  templateUrl: './main-videos.component.html',
  styleUrls: ['./main-videos.component.css']
})
export class MainVideosComponent implements OnInit {

  videos: FullVideo[] = [];

  constructor(  private _CategoriesServices: CategoriesService,
                private _VideosService: VideosService) {
    
  }

  async ngOnInit() {
    await this.getVideos();
  }



  async getVideos() {
    let videosP = new Promise((resolve, reject) => {
      this._VideosService.getAllDesc()
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
