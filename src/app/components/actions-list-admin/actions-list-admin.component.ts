import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions-list-admin',
  templateUrl: './actions-list-admin.component.html',
  styleUrls: ['./actions-list-admin.component.css']
})
export class ActionsListAdminComponent implements OnInit {

  @Input() id: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
