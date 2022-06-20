import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-categories-admin',
  templateUrl: './add-categories-admin.component.html',
  styleUrls: ['./add-categories-admin.component.css']
})
export class AddCategoriesAdminComponent implements OnInit {

  addCategoryForm: FormGroup;
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
                private _Router: Router) {

    this.addCategoryForm = this._FormBuilder.group({
      categoryId: [''],
      categoryName: ['', Validators.required],
      categoryIcon: ['', Validators.required],
      categoryColor: ['', Validators.required],
      categoryType: ['', Validators.required],
      categoryVisible: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.getLastCategory();
  }



  async getLastCategory() {
    let categoryP = new Promise((resolve, reject) => {
      this._CategoriesService.getLast()
        .subscribe(categoryRes => {
          if(!categoryRes.status) reject(categoryRes);

          categoryRes.response.map((category: Category) => this.idCategory = category.id + 1);
          resolve(categoryRes.status);
        });
    });

    let result = await categoryP;
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

        this.categoryImage = new File([u8arr], this.idCategory + '.png', {type:mime});
        this.addCategoryForm.controls.categoryIcon.setValue(this.idCategory + '.png');
    }




    setColor(colorHex: string) {
      this.addCategoryForm.controls.categoryColor.setValue(colorHex);
    }




    async add() {
      if(this.addCategoryForm.invalid) {
        this._ToastrService.error('CAMPOS INCOMPLETOS', 'TODOS LOS CAMPOS SON NECESARIOS PARA CREAR UNA CATEGORÍA');
        return;
      }

      this.loading = true;
      this.addCategoryForm.controls.categoryId.setValue(this.idCategory);

      let categoryData = new FormData();

      categoryData.append('iconCategory', this.categoryImage);
      categoryData.append('formCategory', JSON.stringify(this.addCategoryForm.value));

      let addCategory: any = await this.addCategoryAsync(categoryData);

      if(addCategory == true) {
        this._ToastrService.success('CATEGORIA CREADA', 'SE HA CREADO UNA NUEVA CATEGORÍA CORRECTAMENTE');
        this._Router.navigate(['/admin/categories']);
      } else {
        this._ToastrService.error('NO SE CREÓ LA CATEGORÍA', addCategory.response.message);
        return;
      }
    }
      async addCategoryAsync(form: any) {
        let categoryP = new Promise((resolve, reject) => {
          this._CategoriesService.add(form)
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
