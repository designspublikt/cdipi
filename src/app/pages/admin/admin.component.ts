import { Component, OnInit } from '@angular/core';
import { GuardAccessGuard } from 'src/app/guards/guard-access.guard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(  private _AuthGuard: GuardAccessGuard) { }

  ngOnInit(): void {
    
  }

}
