import { AfterContentInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper/bundle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    new Swiper('.swiper');
  }  

}
