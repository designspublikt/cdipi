import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { AddArticlesAdminComponent } from './admin/main-admin/articles-admin/add-articles-admin/add-articles-admin.component';
import { ArticlesAdminComponent } from './admin/main-admin/articles-admin/articles-admin.component';
import { DeleteArticlesAdminComponent } from './admin/main-admin/articles-admin/delete-articles-admin/delete-articles-admin.component';
import { EditArticlesAdminComponent } from './admin/main-admin/articles-admin/edit-articles-admin/edit-articles-admin.component';
import { ListArticlesAdminComponent } from './admin/main-admin/articles-admin/list-articles-admin/list-articles-admin.component';
import { ViewArticlesAdminComponent } from './admin/main-admin/articles-admin/view-articles-admin/view-articles-admin.component';
import { AddCategoriesAdminComponent } from './admin/main-admin/categories-admin/add-categories-admin/add-categories-admin.component';
import { CategoriesAdminComponent } from './admin/main-admin/categories-admin/categories-admin.component';
import { DeleteCategoriesAdminComponent } from './admin/main-admin/categories-admin/delete-categories-admin/delete-categories-admin.component';
import { EditCategoriesAdminComponent } from './admin/main-admin/categories-admin/edit-categories-admin/edit-categories-admin.component';
import { ListCategoriesAdminComponent } from './admin/main-admin/categories-admin/list-categories-admin/list-categories-admin.component';
import { ViewCategoriesAdminComponent } from './admin/main-admin/categories-admin/view-categories-admin/view-categories-admin.component';
import { HomeAdminComponent } from './admin/main-admin/home-admin/home-admin.component';
import { MainAdminComponent } from './admin/main-admin/main-admin.component';
import { AddVideosAdminComponent } from './admin/main-admin/videos-admin/add-videos-admin/add-videos-admin.component';
import { DeleteVideosAdminComponent } from './admin/main-admin/videos-admin/delete-videos-admin/delete-videos-admin.component';
import { EditVideosAdminComponent } from './admin/main-admin/videos-admin/edit-videos-admin/edit-videos-admin.component';
import { ListVideosAdminComponent } from './admin/main-admin/videos-admin/list-videos-admin/list-videos-admin.component';
import { VideosAdminComponent } from './admin/main-admin/videos-admin/videos-admin.component';
import { ViewVideosAdminComponent } from './admin/main-admin/videos-admin/view-videos-admin/view-videos-admin.component';
import { ArticlesComponent } from './articles/articles.component';
import { CategoryArticlesComponent } from './articles/category-articles/category-articles.component';
import { MainArticlesComponent } from './articles/main-articles/main-articles.component';
import { ViewArticleComponent } from './articles/view-article/view-article.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CategoryVideosComponent } from './videos/category-videos/category-videos.component';
import { MainVideosComponent } from './videos/main-videos/main-videos.component';
import { VideosComponent } from './videos/videos.component';
import { ViewVideoComponent } from './videos/view-video/view-video.component';
import { CoachingComponent } from './coaching/coaching.component';

@NgModule({
  declarations: [
    HomeComponent,
    NotfoundComponent,
    ArticlesComponent,
    MainArticlesComponent,
    ViewArticleComponent,
    CategoryArticlesComponent,
    VideosComponent,
    MainVideosComponent,
    ViewVideoComponent,
    CategoryVideosComponent,
    AboutUsComponent,
    AdminComponent,
    LoginComponent,
    MainAdminComponent,
    HomeAdminComponent,
    ArticlesAdminComponent,
    AddArticlesAdminComponent,
    ListArticlesAdminComponent,
    ViewArticlesAdminComponent,
    EditArticlesAdminComponent,
    DeleteArticlesAdminComponent,
    VideosAdminComponent,
    AddVideosAdminComponent,
    ListVideosAdminComponent,
    EditVideosAdminComponent,
    ViewVideosAdminComponent,
    DeleteVideosAdminComponent,
    CategoriesAdminComponent,
    AddCategoriesAdminComponent,
    ListCategoriesAdminComponent,
    EditCategoriesAdminComponent,
    ViewCategoriesAdminComponent,
    DeleteCategoriesAdminComponent,
    CoachingComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    SwiperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    CKEditorModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ColorPickerModule,
    PipesModule,
    NgxSpinnerModule,
    NgxCaptchaModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    HomeComponent,
    NotfoundComponent,
    ArticlesComponent,
    MainArticlesComponent,
    ViewArticleComponent,
    CategoryArticlesComponent,
    VideosComponent,
    MainVideosComponent,
    ViewVideoComponent,
    CategoryVideosComponent,
    AboutUsComponent,
    AdminComponent,
    LoginComponent,
    MainAdminComponent,
    HomeAdminComponent,
    ArticlesAdminComponent,
    AddArticlesAdminComponent,
    ListArticlesAdminComponent,
    ViewArticlesAdminComponent,
    EditArticlesAdminComponent,
    DeleteArticlesAdminComponent,
    VideosAdminComponent,
    AddVideosAdminComponent,
    ListVideosAdminComponent,
    EditVideosAdminComponent,
    DeleteVideosAdminComponent,
    ViewVideosAdminComponent,
    CategoriesAdminComponent,
    AddCategoriesAdminComponent,
    ListCategoriesAdminComponent,
    ViewCategoriesAdminComponent,
    EditCategoriesAdminComponent,
    DeleteCategoriesAdminComponent
  ]
})
export class PagesModule { }
