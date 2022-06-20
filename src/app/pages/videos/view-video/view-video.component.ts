import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullVideo } from 'src/app/interfaces/video';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {

  idVideo: number = 0;
  video: FullVideo = {} as FullVideo;
  videosCat: FullVideo[] = [];

  constructor(  private _ActivatedRoute: ActivatedRoute,
                private _Router: Router,
                private _VideosService: VideosService) {

  }


  async ngOnInit() {
    this._ActivatedRoute.params.subscribe(async params => {
      this.idVideo = params.id;
      await this.getVideo();
      await this.getVideosCat(this.video.category_id);
    });
  }




  async getVideo() {
    let videoP = new Promise((resolve, reject) => {
      this._VideosService.getById(this.idVideo)
        .subscribe(videoRes => {
          if(!videoRes.status) reject(videoRes);

          videoRes.response.map((video: FullVideo) => this.video = video);
          resolve(videoRes);
        });
    });

    let result = await videoP;
    return result;
  }




  async getVideosCat(idCategory: number) {
    this.videosCat = [];
    let videosP = new Promise((resolve, reject) => {
      this._VideosService.getByCategory(idCategory)
        .subscribe(videosRes => {
          if(!videosRes.status) reject(videosRes);

          videosRes.response.map((video: FullVideo) => this.videosCat.push(video));
          resolve(videosRes.status);
        });
    });

    let result = await videosP;
    return result;
  }

}
