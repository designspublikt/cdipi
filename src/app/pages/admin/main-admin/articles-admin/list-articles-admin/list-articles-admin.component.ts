import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleFull } from 'src/app/interfaces/article';
import { ArticlesService } from 'src/app/services/articles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-articles-admin',
  templateUrl: './list-articles-admin.component.html',
  styleUrls: ['./list-articles-admin.component.css']
})
export class ListArticlesAdminComponent implements OnInit {

  articles: ArticleFull[] = [];
  loadingArticles: boolean = false;

  constructor(  private _ArticlesService: ArticlesService,
                private _ToastrService: ToastrService,
                private _Router: Router) { }

  async ngOnInit() {
    this.loadingArticles = true;
    await this.getArticles();
  }

  async getArticles() {    
    let articlesP = new Promise((reject, resolve) => {
      this._ArticlesService.getAll()
        .subscribe(articlesRes => {
          if(!articlesRes.status) reject(articlesRes);

          articlesRes.response.map((article: ArticleFull) => this.articles.push(article));
          this.loadingArticles = false;
          resolve(articlesRes.status);
        });
      });
      
    let result = await articlesP;
    return result;
  }


  async deleteArticle(idArticle: number) {

    Swal.fire({
      icon: 'question',
      title: '¿Está Seguro?',
      text: 'Va a eliminar un artículo y su contenido, esta acción no se puede deshacer',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#2b3483'
    })
    .then(async res => {
      if(res.isConfirmed) {
        let deleteArticle = await this.deleteArticleAsync(idArticle);

        if(deleteArticle == true) {
          this._ToastrService.success('ARTICULO ELIMINADO', 'EL ARTICULO Y SU CONTENIDO HA SIDO ELIMINADO CORRECTAMENTE');
          this._Router.navigateByUrl('/', {skipLocationChange: true})
            .then(() => {
              this._Router.navigate(['/admin/articles']);
            });
        } else {
          this._ToastrService.error('NO SE PUDO ELIMINAR EL ARTICULO', 'HUBO UN ERROR AL ELIMINAR EL ARTICULO');
          return;
        }
      }
    });
  }
    async deleteArticleAsync(idArticle: number) {
        let articleP = new Promise((resolve, reject) => {
          this._ArticlesService.delete(idArticle)
            .subscribe(articleRes => {
              if(!articleRes.status) reject(articleRes);
      
              resolve(articleRes.status);
            });
        });
      
        let result = await articleP;
        return result;
      }

}
