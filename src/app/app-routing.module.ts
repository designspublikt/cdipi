import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CategoryArticlesComponent } from './pages/articles/category-articles/category-articles.component';
import { MainArticlesComponent } from './pages/articles/main-articles/main-articles.component';
import { ViewArticleComponent } from './pages/articles/view-article/view-article.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CategoryVideosComponent } from './pages/videos/category-videos/category-videos.component';
import { MainVideosComponent } from './pages/videos/main-videos/main-videos.component';
import { VideosComponent } from './pages/videos/videos.component';
import { ViewVideoComponent } from './pages/videos/view-video/view-video.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'articles', component: ArticlesComponent,
    children: [
      { path: '', component: MainArticlesComponent },
      { path: 'view/:code', component: ViewArticleComponent },
      { path: 'category/:name', component: CategoryArticlesComponent }
    ]
  },
  { path: 'videos', component: VideosComponent,
    children: [
      { path: '', component: MainVideosComponent },
      { path: 'view/:code', component: ViewVideoComponent },
      { path: 'category/:name', component: CategoryVideosComponent }
    ]
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
