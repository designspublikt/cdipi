import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar-admin',
  templateUrl: './top-bar-admin.component.html',
  styleUrls: ['./top-bar-admin.component.css']
})
export class TopBarAdminComponent implements OnInit {

  constructor(  private _Router: Router) { }

  ngOnInit(): void {
  }

  reload() {
    location.reload();
  }

  logout() {
    localStorage.clear();
    this._Router.navigate(['/admin/login']);
  }

}
