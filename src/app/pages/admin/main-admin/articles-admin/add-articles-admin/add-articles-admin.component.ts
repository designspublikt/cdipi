import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import Editor from '@ckeditor5custom/build/ckeditor';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { ArticleFull } from 'src/app/interfaces/article';
import { Category } from 'src/app/interfaces/category';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-add-articles-admin',
  templateUrl: './add-articles-admin.component.html',
  styleUrls: ['./add-articles-admin.component.css']
})
export class AddArticlesAdminComponent implements OnInit {

  @ViewChild(CKEditorComponent) myEditorComponent: CKEditorComponent = {} as CKEditorComponent;

  editor = Editor;
  addArticlesForm: FormGroup;
  categories: Category[] = [];
  imageCropperSrc: any = '';
  imageDestinationSrc: any = '';
  articleImage: any;
  idArticle: number = 0;
  showImageCropperModal: boolean = false;
  loading: boolean = false;

  constructor(  private _FormBuilder: FormBuilder,
                private _ToastrService: ToastrService,
                private _ArticlesService: ArticlesService,
                private _AuthService: AuthService,
                private _CategoriesService: CategoriesService,
                private _Router: Router) {
    this.addArticlesForm = this._FormBuilder.group({
      id: [''],
      title:['', Validators.required],
      desc_short:['', Validators.required],
      desc_long:['', Validators.required],
      content:[''],
      image: [''],
      category_id:['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.getLastArticle();
    await this.getArticlesCategories();
  }


  async getArticlesCategories() {
    let categoriesP = new Promise((resolve, reject) => {
      this._CategoriesService.getByType('articles')
        .subscribe(categoriesRes => {
          if(!categoriesRes.status) reject(categoriesRes);

          categoriesRes.response.map((category: Category) => this.categories.push(category));
          resolve(categoriesRes.status);
        });
    });

    let result = await categoriesP;
    return result;
  }

  async getLastArticle() {
    let articleP = new Promise((resolve, reject) => {
      this._ArticlesService.getLast()
        .subscribe(articleRes => {
          if(!articleRes.status) reject(articleRes);

          this.idArticle = (articleRes.response.length > 0) ? articleRes.response.map((article: ArticleFull) => (article.id_article + 1)) : articleRes.response.length + 1;

          resolve(articleRes.status);
        });
    });

    let result = await articleP;
    return result;
  }


  /* Cropper */
    changeImage(event: any) {
      this.imageCropperSrc = event;
      this.showImageCropperModal = true;
    }
    
    closeCropperModal() {
      this.showImageCropperModal = false;
    }

    cropImage(event: ImageCroppedEvent) {
      this.imageDestinationSrc = event.base64;

      /* Convertir a tipo file desde base64 */
        let arr = this.imageDestinationSrc.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        this.articleImage = new File([u8arr], this.idArticle + '.jpg', {type:mime});
        this.addArticlesForm.controls.image.setValue(this.idArticle + '.jpg');
    }

  async add() {
    let addArticle = await this.addArticles();

    if(addArticle == true) {
      this._ToastrService.success('ARTICULO AGREGADO', 'SE AGREGÓ UN NUEVO ARTÍCULO CORRECTAMENTE');
      this._Router.navigate(['/admin/articles']);
    }
  }
    async addArticles() {
      if(this.addArticlesForm.invalid) {
        this._ToastrService.error('HAY CAMPOS INCOMPLETOS', 'TODOS LOS CAMPOS SON OBLIGATORIOS');
        return;
      }

      if(this.addArticlesForm.controls.image.value == '') {
        this._ToastrService.error('SE DEBE SELECCIONAR UNA IMAGEN PARA EL ARTICULO', 'NO HAY UNA IMAGEN SELECCIONADA');
        return;
      }

      this.loading = true;

      let addArticleData = new FormData();

      this.addArticlesForm.controls.id.setValue(this.idArticle);
      this.addArticlesForm.controls.content.setValue(this.myEditorComponent.editorInstance?.getData());

      addArticleData.append('articleImage', this.articleImage);
      addArticleData.append('articleForm', JSON.stringify(this.addArticlesForm.value));

      let addArticleP = new Promise((resolve, reject) => {
        this._ArticlesService.add(addArticleData)
          .subscribe(articleAddedRes => {
            this.loading = false;

            if(!articleAddedRes.status) reject(articleAddedRes);

            resolve(articleAddedRes.status);
          });
      });

      let result = await addArticleP;
      return result;
    }

}
