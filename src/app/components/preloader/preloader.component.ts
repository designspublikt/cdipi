import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {

  @Input() show: boolean = false;

  constructor(  private _NgxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this._NgxSpinnerService.show();
  }

}
