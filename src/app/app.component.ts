import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Centro de Innovación y Desarrollo';

  static isBrowser = new BehaviorSubject<boolean>(false);
  
  constructor(  @Inject(PLATFORM_ID) private platformId: any,
                private _Router: Router) {
                  AppComponent.isBrowser.next(isPlatformBrowser(platformId));
                }

  ngOnInit(): void {
    this._Router.events.subscribe((events: any) => {
      scroll(0,0);
    });
  }  
}
