import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-nav-bar',
  templateUrl: './full-nav-bar.component.html',
  styleUrls: ['./full-nav-bar.component.css']
})
export class FullNavBarComponent implements OnInit {

  @Input() categoryType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
