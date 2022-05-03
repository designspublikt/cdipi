import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Centro de Innovación y Desarrollo';

  constructor(  private _Router: Router) {}

  ngOnInit(): void {
    this._Router.events.subscribe((events: any) => {
      scroll(0,0);
    });
  }  
}
