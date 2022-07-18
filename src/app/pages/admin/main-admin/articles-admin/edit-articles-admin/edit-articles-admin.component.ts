import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import Editor from '@ckeditor5custom/build/ckeditor';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { ArticleFull } from 'src/app/interfaces/article';
import { Category } from 'src/app/interfaces/category';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-articles-admin',
  templateUrl: './edit-articles-admin.component.html',
  styleUrls: ['./edit-articles-admin.component.css']
})
export class EditArticlesAdminComponent implements OnInit {

  @ViewChild(CKEditorComponent) myEditorComponent: CKEditorComponent = {} as CKEditorComponent;

  editor = Editor;
  editArticleForm: FormGroup;
  article: ArticleFull = {} as ArticleFull;
  idArticle: number = 0;
  articleImage: any;
  categories: Category[] = [];
  loading: boolean = false;

  showImageCropperModal: boolean = false;
  imageCropperSrc: any = '';
  imageDestinationSrc: any = '';
    

  constructor(  private _ArticlesService: ArticlesService,
                private _CategoriesService: CategoriesService,
                private _FormBuilder: FormBuilder,
                private _ToastrService: ToastrService,
                private _ActivatedRoute: ActivatedRoute,
                private _Router: Router) {
    this.editArticleForm = this._FormBuilder.group({
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
    this._ActivatedRoute.params.subscribe(params => {
      this.idArticle = params.id;
    });

    await this.getArticle();
    await this.getCategories();

    this.editArticleForm.controls.id.setValue(this.article.id_article);
    this.editArticleForm.controls.title.setValue(this.article.title);
    this.editArticleForm.controls.desc_short.setValue(this.article.desc_short);
    this.editArticleForm.controls.desc_long.setValue(this.article.desc_long);
    this.editArticleForm.controls.content.setValue(this.article.content);
    this.editArticleForm.controls.image.setValue(this.article.image);
    this.editArticleForm.controls.category_id.setValue(this.article.id_category);

    this.imageDestinationSrc = 'assets/img/articles/' + this.article.image;
  }

  
  async getArticle() {
    let articleP = new Promise((resolve, reject) => {
      this._ArticlesService.getById(this.idArticle)
        .subscribe(articleRes => {
          if(!articleRes.status) reject(articleRes);

          articleRes.response.map((article: ArticleFull) => this.article = article);
          resolve(articleRes.status);
        });
    });

    let result = await articleP;
    return result;
  }

  async getCategories() {
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
        this.editArticleForm.controls.image.setValue(this.idArticle + '.jpg');
    }



  async edit() {
    if(this.editArticleForm.invalid) {
      this._ToastrService.error('HAY CAMPOS INCOMPLETOS', 'NO ES POSIBLE EDITAR EL ARTICULO HASTA QUE ESTEN TODOS LOS CAMPOS COMPLETADOS');
      return;
    }

    this.loading = true;

    let editArticleData;

    this.editArticleForm.controls.content.setValue(this.myEditorComponent.editorInstance?.getData());

    if(this.articleImage) {
      editArticleData = new FormData();

      editArticleData.append('articleImage', this.articleImage);
      editArticleData.append('articleForm', JSON.stringify(this.editArticleForm.value));
    } else {
      editArticleData = this.editArticleForm.value;
    }

    let editArticle = await this.editArticle(editArticleData);

    this.loading = false;

    if(editArticle == true) {
      this._ToastrService.success('ARTICULO ACUTALIZADO', 'SE HA ACTUALIZADO EL ARTICULO CORRECTAMENTE');
      this._Router.navigateByUrl('/', {skipLocationChange: true})
        .then(() => {
          this._Router.navigate(['/admin/articles/edit', this.idArticle]);
        });
    } else {
      this._ToastrService.error('NO SE PUDO EDITAR EL ARTICULO', 'HUBO UN ERROR AL INTENTAR EDITAR EL ARTICULO');
      return;
    }
  }
    async editArticle(data: any) {
      let articleP = new Promise((resolve, reject) => {
        this._ArticlesService.edit(data)
          .subscribe(articleRes => {
            console.log(articleRes);
            if(!articleRes.status) reject(articleRes);

            resolve(articleRes.status);
          });
      });

      let result = await articleP;
      return result;
    }

}
