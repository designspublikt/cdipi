import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { VideoYoutube } from 'src/app/interfaces/video';
import { CategoriesService } from 'src/app/services/categories.service';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-add-videos-admin',
  templateUrl: './add-videos-admin.component.html',
  styleUrls: ['./add-videos-admin.component.css']
})
export class AddVideosAdminComponent implements OnInit {

  addVideoForm: FormGroup;
  categories: Category[] = [];
  loading: boolean = false;
  infoYoutube: VideoYoutube = {} as VideoYoutube;

  constructor(  private _FormBuilder: FormBuilder,
                private _CategoriesService: CategoriesService,
                private _VideosService: VideosService,
                private _ToastrService: ToastrService,
                private _Router: Router) {

    this.addVideoForm = this._FormBuilder.group({
      videoTitle: ['', Validators.required],
      videoShortDesc: ['', Validators.required],
      videoLongDesc: ['', Validators.required],
      videoIdSrc: ['', Validators.required],
      videoImage:[''],
      videoCategory: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.getCategories();
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



  async add() {

    if(this.addVideoForm.invalid) {
      this._ToastrService.error('CAMPOS INCOMPLETOS', 'ES NECESARIO COMPLETAR TODOS LOS CAMPOS PARA AGREGAR UN VIDEO');
      return;
    }

    this.loading = true;

    await this.checkYoutubeVideo(this.addVideoForm.controls.videoIdSrc.value)
      .then(async() => {

        this.addVideoForm.controls.videoImage.setValue(this.infoYoutube.items[0].snippet.thumbnails.high.url);

        let addVideo = await this.addVideoAsync(this.addVideoForm.value);

        if(addVideo == true) {
          this._ToastrService.success('NUEVO VIDEO AGREGADO', 'EL VIDEO SE HA AGREGADO CORRECTAMENTE');
          this._Router.navigate(['/admin/videos']);
        } else {
          this._ToastrService.error('NO SE AGREGÓ EL VIDEO', 'HUBO UN ERROR AL AGREGAR EL VIDEO');
        }
      })
      .catch(() => {
        this._ToastrService.error('EL ID NO ES CORRECTO', 'ESTE ID DE VIDEO EN YOUTUBE NO EXISTE');
      });

      this.loading = false;
  }
    async addVideoAsync(form: any) {
      let videoP = new Promise((resolve, reject) => {
        this._VideosService.add(form)
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
