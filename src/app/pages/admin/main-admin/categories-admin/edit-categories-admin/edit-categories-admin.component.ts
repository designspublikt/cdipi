import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-categories-admin',
  templateUrl: './edit-categories-admin.component.html',
  styleUrls: ['./edit-categories-admin.component.css']
})
export class EditCategoriesAdminComponent implements OnInit {

  category: Category = {} as Category;
  editCategoryForm: FormGroup;
  color: string = '';
  imageCropperSrc: any = '';
  imageDestinationSrc: any = '';
  categoryImage: any;
  idCategory: number = 0;
  showImageCropperModal: boolean = false;
  loading: boolean = false;

  constructor(  private _FormBuilder: FormBuilder,
                private _CategoriesService: CategoriesService,
                private _ToastrService: ToastrService,
                private _ActivatedRoute: ActivatedRoute,
                private _Router: Router) {

    this.editCategoryForm = this._FormBuilder.group({
      categoryId: [''],
      categoryName: ['', Validators.required],
      categoryIcon: ['', Validators.required],
      categoryColor: ['', Validators.required],
      categoryType: ['', Validators.required],
      categoryVisible: ['', Validators.required]
    });
  }



  async ngOnInit() {
    this._ActivatedRoute.params.subscribe(params => {
      this.idCategory = params.id;
    });
    await this.getCategory(this.idCategory);

    this.imageDestinationSrc = 'assets/img/categories/' + this.category.icon;
    this.color = this.category.color;

    this.editCategoryForm.controls.categoryId.patchValue(this.idCategory);
    this.editCategoryForm.controls.categoryName.patchValue(this.category.name);
    this.editCategoryForm.controls.categoryIcon.patchValue(this.category.icon);
    this.editCategoryForm.controls.categoryColor.patchValue(this.category.color);
    this.editCategoryForm.controls.categoryType.patchValue(this.category.type);
    this.editCategoryForm.controls.categoryVisible.patchValue(this.category.visible);
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

        this.categoryImage = new File([u8arr], this.idCategory + '.png', {type:mime});
        this.editCategoryForm.controls.categoryIcon.setValue(this.idCategory + '.png');
    }



  setColor(colorHex: string) {
    this.editCategoryForm.controls.categoryColor.setValue(colorHex);
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



  async edit() {
      if(this.editCategoryForm.invalid) {
        this._ToastrService.error('CAMPOS INCOMPLETOS', 'TODOS LOS CAMPOS SON NECESARIOS PARA EDITAR UNA CATEGORÍA');
        return;
      }

      this.loading = true;
      this.editCategoryForm.controls.categoryId.setValue(this.idCategory);

      let categoryData;

      if(!this.categoryImage) {
        categoryData = this.editCategoryForm.value;
      } else {
        categoryData = new FormData();

        categoryData.append('iconCategory', this.categoryImage);
        categoryData.append('formCategory', JSON.stringify(this.editCategoryForm.value));
      }

      let editCategory = await this.editCategoryAsync(categoryData);

      if(editCategory == true) {
        this._ToastrService.success('CATEGORIA CREADA', 'SE HA CREADO UNA NUEVA CATEGORÍA CORRECTAMENTE');
        this._Router.navigate(['/admin/categories']);
      } else {
        this._ToastrService.success('NO SE PUDO EDITAR LA CATEGORIA', 'HUBO UN ERROR AL EDITAR LA CATEGORIA');
        return;
      }
    }
      async editCategoryAsync(form: any) {
        let categoryP = new Promise((resolve, reject) => {
          this._CategoriesService.edit(form)
            .subscribe(categoryRes => {
              this.loading = false;
              if(!categoryRes.status) reject(categoryRes);

              resolve(categoryRes.status);
            });
        });

        let result = await categoryP;
        return result;
      }

}
