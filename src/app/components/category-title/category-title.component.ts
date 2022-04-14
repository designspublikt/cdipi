import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-title',
  templateUrl: './category-title.component.html',
  styleUrls: ['./category-title.component.css']
})
export class CategoryTitleComponent implements OnInit {

  @Input() categoryName = '';
  @Input() colorHex = '';

  constructor() { }

  ngOnInit(): void {
  }

}
