import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { ActionsListAdminComponent } from './actions-list-admin/actions-list-admin.component';
import { AdminSectionHeaderComponent } from './admin-section-header/admin-section-header.component';
import { CategoriesBarComponent } from './categories-bar/categories-bar.component';
import { CategoryTitleComponent } from './category-title/category-title.component';
import { FooterComponent } from './footer/footer.component';
import { FullNavBarComponent } from './full-nav-bar/full-nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';
import { TopBarAdminComponent } from './top-bar-admin/top-bar-admin.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    CategoriesBarComponent,
    HeaderComponent,
    CategoryTitleComponent,
    FullNavBarComponent,
    FooterComponent,
    SectionTitleComponent,
    SideBarAdminComponent,
    TopBarAdminComponent,
    AdminSectionHeaderComponent,
    ActionsListAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    SearchBarComponent,
    CategoriesBarComponent,
    HeaderComponent,
    CategoryTitleComponent,
    FullNavBarComponent,
    FooterComponent,
    SectionTitleComponent,
    SideBarAdminComponent,
    TopBarAdminComponent,
    AdminSectionHeaderComponent,
    ActionsListAdminComponent
  ]
})
export class ComponentsModule { }
