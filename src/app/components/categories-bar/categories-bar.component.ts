import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-bar',
  templateUrl: './categories-bar.component.html',
  styleUrls: ['./categories-bar.component.css']
})
export class CategoriesBarComponent implements OnInit {

  @Input() type: string = '';
  categoriesBar: Category[] = [];

  constructor(  private _CategoriesService: CategoriesService,
                private _Router: Router,
                private _ActivatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    await this.getCategoriesByType(this.type);
  }

  async getCategoriesByType(type: string) {
    let categoriesP = new Promise((resolve, reject) => {
      if(type == '') {
        this._CategoriesService.getAll()
          .subscribe(categoriesRes => {
            if(!categoriesRes.status) reject(categoriesRes);

            categoriesRes.response.map((category: Category) => this.categoriesBar.push(category));
            resolve(categoriesRes.status);
          });
      }
  
      this._CategoriesService.getByType(type) 
        .subscribe(categoriesRes => {
          if(!categoriesRes.status) reject(categoriesRes);

          categoriesRes.response.map((category: Category) => this.categoriesBar.push(category));
          resolve(categoriesRes.status);
        });
    });

    let result = await categoriesP;
    return result;
  }

}
