import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { CategoriesBarComponent } from './categories-bar/categories-bar.component';
import { CategoryTitleComponent } from './category-title/category-title.component';
import { FooterComponent } from './footer/footer.component';
import { FullNavBarComponent } from './full-nav-bar/full-nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SectionTitleComponent } from './section-title/section-title.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    CategoriesBarComponent,
    HeaderComponent,
    CategoryTitleComponent,
    FullNavBarComponent,
    FooterComponent,
    SectionTitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    HttpClientModule
  ],
  exports: [
    NavbarComponent,
    SearchBarComponent,
    CategoriesBarComponent,
    HeaderComponent,
    CategoryTitleComponent,
    FullNavBarComponent,
    FooterComponent,
    SectionTitleComponent
  ]
})
export class ComponentsModule { }
