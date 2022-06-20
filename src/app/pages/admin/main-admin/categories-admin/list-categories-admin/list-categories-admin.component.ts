import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleFull } from 'src/app/interfaces/article';
import { Category } from 'src/app/interfaces/category';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-categories-admin',
  templateUrl: './list-categories-admin.component.html',
  styleUrls: ['./list-categories-admin.component.css']
})
export class ListCategoriesAdminComponent implements OnInit {

  categories: Category[] = [];
  category: Category = {} as Category;
  existentArticles: ArticleFull[] = [];
  loadingCategories: boolean = false;

  constructor(  private _CategoriesService: CategoriesService,
                private _ArticlesService: ArticlesService,
                private _ToastrService: ToastrService,
                private _Router: Router) { }

  async ngOnInit() {
    await this.getCategories();
  }


  async getCategories() {
    this.loadingCategories = true;
    let categoryP = new Promise((resolve, reject) => {
      this._CategoriesService.getAll()
        .subscribe(categoriesRes => {
          this.loadingCategories = false;
          if(!categoriesRes.status) reject(categoriesRes);

          categoriesRes.response.map((category: Category) => this.categories.push(category));
          resolve(categoriesRes.status);
        });
    });

    let result = await categoryP;
    return result;
  }


  async deleteCategory(idCategory: number) {

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
        await this.getArticlesByCat(idCategory);

        if(this.existentArticles.length > 0) {
          this._ToastrService.error('HAY ARTICULOS EXISTENTES', 'LA CATEGORIA NO PUEDE SER ELIMINADA, MIENTRAS ESTA CONTENGA ARTICULOS');
          return;
        } else {
          let categoryDelete = await this.deleteCategoryAsync(idCategory);

          if(categoryDelete == true) {
            this._ToastrService.success('CATEGORIA ELIMINADA', 'UNA CATEGORIA SE HA ELIMINADO CORRECTAMENTE');
            this._Router.navigateByUrl('/', {skipLocationChange: true})
              .then(() => {
                this._Router.navigate(['/admin/categories']);
              });
          } else {
            this._ToastrService.error('NO SE PUEDO ELIMINAR LA CATEGORIA', 'HUBO UN ERROR AL ELIMINAR LA CATEGORIA');
            return;
          }
        }
      }
    });
  }
    async deleteCategoryAsync(idCategory: number) {
      let categoryP = new Promise((resolve, reject) => {
        this._CategoriesService.delete(idCategory)
          .subscribe(categoryRes => {
            if(!categoryRes.status) reject(categoryRes);

            resolve(categoryRes.status);
          });
      });

      let result = await categoryP;
      return result;
    }



  async getArticlesByCat(idCategory: number) {
    let articlesP = new Promise((resolve, reject) => {
      this._ArticlesService.getByCategoryId(idCategory)
        .subscribe(articlesRes => {
          if(!articlesRes.status) reject(articlesRes);

          articlesRes.response.map((article: ArticleFull) => this.existentArticles.push(article));
          resolve(articlesRes.status);
        });
    });

    let result = await articlesP;
    return result;
  }



  async getCategory(id: number) {
    let categoryP = new Promise((resolve, reject) => {
      this._CategoriesService.getById(id)
      .subscribe(categoryRes => {
        if(!categoryRes.status) reject(categoryRes);

        categoryRes.response.map((category: Category) => this.category = category);
        resolve(categoryRes.status);
      });
    });

    let result = await categoryP;
    return result;
  }

}
