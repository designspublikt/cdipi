import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';



@NgModule({
  declarations: [
    HomeComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    NotfoundComponent,
    RouterModule
  ]
})
export class PagesModule { }
