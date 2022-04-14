import { Component, Input, OnInit } from '@angular/core';
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

  constructor(  private _CategoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories(this.type);
  }

  getCategories(type: string) {
    if(type == '') {
      this.categoriesBar = this._CategoriesService.getAll();
      return;
    }

    this.categoriesBar = this._CategoriesService.getByType(type);
  }

}
