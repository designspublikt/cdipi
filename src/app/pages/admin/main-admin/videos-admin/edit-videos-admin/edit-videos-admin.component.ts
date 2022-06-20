import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { FullVideo, VideoYoutube } from 'src/app/interfaces/video';
import { CategoriesService } from 'src/app/services/categories.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-edit-videos-admin',
  templateUrl: './edit-videos-admin.component.html',
  styleUrls: ['./edit-videos-admin.component.css']
})
export class EditVideosAdminComponent implements OnInit {

  idVideo: number = 0;
  currentVideo: FullVideo = {} as FullVideo;
  editVideoForm: FormGroup;
  categories: Category[] = [];
  loading: boolean = false;
  infoYoutube: VideoYoutube = {} as VideoYoutube;

  constructor(  private _FormBuilder: FormBuilder,
                private _CategoriesService: CategoriesService,
                private _VideosService: VideosService,
                private _ToastrService: ToastrService,
                private _ActivatedRoute: ActivatedRoute,
                private _Router: Router) {

    this.editVideoForm = this._FormBuilder.group({
      videoId: [''],
      videoTitle: ['', Validators.required],
      videoShortDesc: ['', Validators.required],
      videoLongDesc: ['', Validators.required],
      videoIdSrc: ['', Validators.required],
      videoImage:[''],
      videoCategory: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this._ActivatedRoute.params.subscribe(params => {
      this.idVideo = params.id;
    });
    await this.getCategories();
    await this.getVideo();

    this.editVideoForm.controls.videoId.patchValue(this.currentVideo.id_video);
    this.editVideoForm.controls.videoTitle.patchValue(this.currentVideo.title);
    this.editVideoForm.controls.videoShortDesc.patchValue(this.currentVideo.desc_short);
    this.editVideoForm.controls.videoLongDesc.patchValue(this.currentVideo.desc_long);
    this.editVideoForm.controls.videoIdSrc.patchValue(this.currentVideo.src);
    this.editVideoForm.controls.videoImage.patchValue(this.currentVideo.image);
    this.editVideoForm.controls.videoCategory.patchValue(this.currentVideo.id_category);
  }



  async getCategories() {
    let categoriesP = new Promise((resolve, reject) => {
      this._CategoriesService.getByType('videos')
        .subscribe(categoriesRes => {
          if(!categoriesRes.status) reject(categoriesRes);

          categoriesRes.response.map((category: Category) => this.categories.push(category));
          resolve(categoriesRes.status);
        });
    });

    let result = await categoriesP;
    return result;
  }




  async getVideo() {
    let videoP = new Promise((resolve, reject) => {
      this._VideosService.getById(this.idVideo)
        .subscribe(videoRes => {
          if(!videoRes.status) reject(videoRes);

          videoRes.response.map((video: FullVideo) => this.currentVideo = video);
          resolve(videoRes.status);
        });
    });

    let result = await videoP;
    return result;
  }



  async edit() {

    if(this.editVideoForm.invalid) {
      this._ToastrService.error('CAMPOS INCOMPLETOS', 'ES NECESARIO COMPLETAR TODOS LOS CAMPOS PARA EDITAR UN VIDEO');
      return;
    }

    this.loading = true;

    await this.checkYoutubeVideo(this.editVideoForm.controls.videoIdSrc.value)
      .then(async() => {

        this.editVideoForm.controls.videoImage.setValue(this.infoYoutube.items[0].snippet.thumbnails.high.url);

        let editVideo = await this.editVideoAsync(this.editVideoForm.value);

        if(editVideo == true) {
          this._ToastrService.success('SE HA EDITADO UN VIDEO', 'EL VIDEO SE HA EDITADO CORRECTAMENTE');
          this._Router.navigate(['/admin/videos']);
        } else {
          this._ToastrService.error('NO SE EDITÓ EL VIDEO', 'HUBO UN ERROR AL EDITAR EL VIDEO');
        }
      })
      .catch(() => {
        this._ToastrService.error('EL ID NO ES CORRECTO', 'ESTE ID DE VIDEO EN YOUTUBE NO EXISTE');
      });

      this.loading = false;
  }
    async editVideoAsync(form: any) {
      let videoP = new Promise((resolve, reject) => {
        this._VideosService.edit(form)
          .subscribe(videoRes => {
            if(!videoRes.status) reject(videoRes);

            resolve(videoRes.status);
          });
      });

      let result = await videoP;
      return result;
    }

    async checkYoutubeVideo(id: string) {
      let videoP = new Promise((resolve, reject) => {
        this._VideosService.getYoutubeVideo(id)
          .subscribe(videoRes => {
            if(videoRes.items.length == 0)  reject(false);

            this.infoYoutube = videoRes;
            resolve(true);
          });
      });

      let result = await videoP;
      return result;
    }



}
