import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-top-bar-admin',
  templateUrl: './top-bar-admin.component.html',
  styleUrls: ['./top-bar-admin.component.css']
})
export class TopBarAdminComponent implements OnInit {

  constructor(  private _Router: Router,
                private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  reload() {
    location.reload();
  }

  logout() {
    let localStorage = this.localStorage;

    localStorage.clear();
    this._Router.navigate(['/admin/login']);
  }

}
