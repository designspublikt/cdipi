import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { AddArticlesAdminComponent } from './pages/admin/main-admin/articles-admin/add-articles-admin/add-articles-admin.component';
import { ArticlesAdminComponent } from './pages/admin/main-admin/articles-admin/articles-admin.component';
import { EditArticlesAdminComponent } from './pages/admin/main-admin/articles-admin/edit-articles-admin/edit-articles-admin.component';
import { ListArticlesAdminComponent } from './pages/admin/main-admin/articles-admin/list-articles-admin/list-articles-admin.component';
import { ViewArticlesAdminComponent } from './pages/admin/main-admin/articles-admin/view-articles-admin/view-articles-admin.component';
import { AddCategoriesAdminComponent } from './pages/admin/main-admin/categories-admin/add-categories-admin/add-categories-admin.component';
import { CategoriesAdminComponent } from './pages/admin/main-admin/categories-admin/categories-admin.component';
import { EditCategoriesAdminComponent } from './pages/admin/main-admin/categories-admin/edit-categories-admin/edit-categories-admin.component';
import { ListCategoriesAdminComponent } from './pages/admin/main-admin/categories-admin/list-categories-admin/list-categories-admin.component';
import { ViewCategoriesAdminComponent } from './pages/admin/main-admin/categories-admin/view-categories-admin/view-categories-admin.component';
import { HomeAdminComponent } from './pages/admin/main-admin/home-admin/home-admin.component';
import { MainAdminComponent } from './pages/admin/main-admin/main-admin.component';
import { AddVideosAdminComponent } from './pages/admin/main-admin/videos-admin/add-videos-admin/add-videos-admin.component';
import { EditVideosAdminComponent } from './pages/admin/main-admin/videos-admin/edit-videos-admin/edit-videos-admin.component';
import { ListVideosAdminComponent } from './pages/admin/main-admin/videos-admin/list-videos-admin/list-videos-admin.component';
import { VideosAdminComponent } from './pages/admin/main-admin/videos-admin/videos-admin.component';
import { ViewVideosAdminComponent } from './pages/admin/main-admin/videos-admin/view-videos-admin/view-videos-admin.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CategoryArticlesComponent } from './pages/articles/category-articles/category-articles.component';
import { MainArticlesComponent } from './pages/articles/main-articles/main-articles.component';
import { ViewArticleComponent } from './pages/articles/view-article/view-article.component';
import { CoachPaymentComponent } from './pages/coach-payment/coach-payment.component';
import { CoachingComponent } from './pages/coaching/coaching.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { CategoryVideosComponent } from './pages/videos/category-videos/category-videos.component';
import { MainVideosComponent } from './pages/videos/main-videos/main-videos.component';
import { VideosComponent } from './pages/videos/videos.component';
import { ViewVideoComponent } from './pages/videos/view-video/view-video.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'coaching', component: CoachingComponent },
  { path: 'coaching-payment/:type', component: CoachPaymentComponent },
  { path: 'articles', component: ArticlesComponent,
    children: [
      { path: '', component: MainArticlesComponent },
      { path: 'view/:id', component: ViewArticleComponent },
      { path: 'category/:id', component: CategoryArticlesComponent }
    ]
  },
  { path: 'videos', component: VideosComponent,
    children: [
      { path: '', component: MainVideosComponent },
      { path: 'view/:id', component: ViewVideoComponent },
      { path: 'category/:id', component: CategoryVideosComponent }
    ]
  },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: MainAdminComponent,
        children: [
          { path: '', component: HomeAdminComponent },
          { path: 'home', component: HomeAdminComponent },
          { path: 'articles', component: ArticlesAdminComponent,
            children: [
              { path: '', component: ListArticlesAdminComponent },
              { path: 'list', component: ListArticlesAdminComponent },
              { path: 'add', component: AddArticlesAdminComponent },
              { path: 'edit/:id', component: EditArticlesAdminComponent },
              { path: 'view/:id', component: ViewArticlesAdminComponent }
            ]
          },
          { path: 'videos', component: VideosAdminComponent,
            children: [
              { path: '', component: ListVideosAdminComponent },
              { path: 'list', component: ListVideosAdminComponent },
              { path: 'add', component: AddVideosAdminComponent },
              { path: 'edit/:id', component: EditVideosAdminComponent },
              { path: 'view/:id', component: ViewVideosAdminComponent },
            ]
          },
          { path: 'categories', component: CategoriesAdminComponent,
            children: [
              { path: '', component: ListCategoriesAdminComponent },
              { path: 'list', component: ListCategoriesAdminComponent },
              { path: 'add', component: AddCategoriesAdminComponent },
              { path: 'edit/:id', component: EditCategoriesAdminComponent },
              { path: 'view/:id', component: ViewCategoriesAdminComponent },
            ]
          }
        ]
      },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
