import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ActionsListAdminComponent } from './actions-list-admin/actions-list-admin.component';
import { AdminSectionHeaderComponent } from './admin-section-header/admin-section-header.component';
import { CategoriesBarComponent } from './categories-bar/categories-bar.component';
import { CategoryTitleComponent } from './category-title/category-title.component';
import { ContactFormModalComponent } from './contact-form-modal/contact-form-modal.component';
import { FooterComponent } from './footer/footer.component';
import { FullNavBarComponent } from './full-nav-bar/full-nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { SideBarAdminComponent } from './side-bar-admin/side-bar-admin.component';
import { SpinnerComponent } from './spinner/spinner.component';
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
    ActionsListAdminComponent,
    SpinnerComponent,
    PreloaderComponent,
    ContactFormModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ColorPickerModule,
    PipesModule,
    NgxSpinnerModule,
    NgxCaptchaModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
    ActionsListAdminComponent,
    SpinnerComponent,
    PreloaderComponent,
    ContactFormModalComponent
  ]
})
export class ComponentsModule { }
