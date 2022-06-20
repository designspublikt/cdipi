import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FullVideo } from 'src/app/interfaces/video';
import { VideosService } from 'src/app/services/videos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-videos-admin',
  templateUrl: './list-videos-admin.component.html',
  styleUrls: ['./list-videos-admin.component.css']
})
export class ListVideosAdminComponent implements OnInit {

  videos: FullVideo[] = [];
  loadingVideos: boolean = true;

  constructor(  private _VideosService: VideosService,
                private _ToastrService: ToastrService,
                private _Router: Router) { }

  async ngOnInit() {
    await this.getVideos();
  }



  async getVideos() {
    let videosP = new Promise((resolve, reject) => {
      this._VideosService.getAll()
        .subscribe(videosRes => {
          this.loadingVideos = false;
          if(!videosRes.status) reject(videosRes);

          videosRes.response.map((video: FullVideo) => this.videos.push(video));
          resolve(videosRes.status);
        });
    });

    let result = await videosP;
    return result;
  }



  async deleteVideo(idVideo: number) {

    Swal.fire({
      icon: 'question',
      title: '¿Está Seguro?',
      text: 'Va a eliminar un video, esta acción no se puede deshacer',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#2b3483'
    })
    .then(async res => {
      if(res.isConfirmed) {
        let deleteVideo = await this.deleteVideoAsync(idVideo);

        if(deleteVideo == true) {
          this._ToastrService.success('VIDEO ELIMINADO', 'UN VIDEO HA SIDO ELIMINADO CORRECTAMENTE');
          this._Router.navigateByUrl('/', {skipLocationChange: true})
            .then(() => {
              this._Router.navigate(['/admin/videos']);
            });
        } else {
          this._ToastrService.error('NO SE PUDO ELIMINAR EL VIDEO', 'HUBO UN ERROR AL ELIMINAR EL VIDEO');
          return;
        }
      }
    })
  }
    async deleteVideoAsync(idVideo: number) {
      let videoP = new Promise((resolve, reject) => {
        this._VideosService.delete(idVideo)
          .subscribe(videoRes => {
            if(!videoRes.status) reject(videoRes);

            resolve(videoRes.status);
          });
      });

      let result = await videoP;
      return result;
    }  

}
