import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {

  auth: boolean;

  constructor(  private _AuthService: AuthService,
                private _Router: Router) {

    this.auth = this._AuthService.checkAuth();

    if(!this.auth) this._Router.navigate(['/admin/login']);
  }

  ngOnInit(): void {
  }

}
