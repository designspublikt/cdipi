import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-section-header',
  templateUrl: './admin-section-header.component.html',
  styleUrls: ['./admin-section-header.component.css']
})
export class AdminSectionHeaderComponent implements OnInit {

  @Input() title: string = '';
  @Input() addLink: string = '';
  @Input() listLink: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
