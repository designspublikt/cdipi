import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { ComponentsModule } from '../components/components.module';
import { ArticlesComponent } from './articles/articles.component';
import { CategoryArticlesComponent } from './articles/category-articles/category-articles.component';
import { MainArticlesComponent } from './articles/main-articles/main-articles.component';
import { ViewArticleComponent } from './articles/view-article/view-article.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { VideosComponent } from './videos/videos.component';
import { MainVideosComponent } from './videos/main-videos/main-videos.component';
import { ViewVideoComponent } from './videos/view-video/view-video.component';
import { CategoryVideosComponent } from './videos/category-videos/category-videos.component';

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
    CategoryVideosComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    SwiperModule,
    HttpClientModule
  ],
  exports: [
    HomeComponent,
    NotfoundComponent,
    RouterModule,
    ArticlesComponent,
    ViewArticleComponent,
    CategoryArticlesComponent
  ]
})
export class PagesModule { }
