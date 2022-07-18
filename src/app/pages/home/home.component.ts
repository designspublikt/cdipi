import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ArticleFull } from 'src/app/interfaces/article';
import { Category } from 'src/app/interfaces/category';
import { Course } from 'src/app/interfaces/course';
import { FullVideo } from 'src/app/interfaces/video';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CoursesService } from 'src/app/services/courses.service';
import { SendMailService } from 'src/app/services/send-mail.service';
import { VideosService } from 'src/app/services/videos.service';
import { environment } from 'src/environments/environment';
import Swiper from 'swiper/bundle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit {

  showPreloader: boolean = true;
  sk: string = environment.GOOGLE_SITE_KEY;
  captchaTK: any;

  contactForm: FormGroup;
  sendingMail: boolean = false;

  lastArticles: ArticleFull[] = [];
  lastVideos: FullVideo[] = [];

  categories: Category[] = [];
  
  courses: Course[] = [];

  articlesByCategory1: ArticleFull[] = [];
  articlesByCategory2: ArticleFull[] = [];

  videosByCategory1: FullVideo[] = [];
  videosByCategory2: FullVideo[] = [];

  articlesCategories: Category[] = [];
  videosCategories: Category[] = [];

  constructor(  private _ArticlesService: ArticlesService,
                private _VideosService: VideosService,
                private _CoursesService: CoursesService,
                private _CategoriesService: CategoriesService,
                private _SendMailService: SendMailService,
                private _ToastrService: ToastrService,
                private _FormBuilder: FormBuilder,
                private _NgxSpinnerService: NgxSpinnerService,
                private _ReCaptchaV3Service: ReCaptchaV3Service) {

    this._NgxSpinnerService.show();

    this.contactForm = this._FormBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async ngOnInit() {

    await this.getLastArticles();
    await this.getLastVideos();

    await this.getArticlesByCategoryId(1, 1);
    await this.getArticlesByCategoryId(2, 2);

    await this.getVideosByCategoryId(4, 1);
    await this.getVideosByCategoryId(5, 2);

    await this.getCategories();
    await this.getArticlesCategories();
    await this.getVideosCategories();
    await this.getCourses();

    this._ReCaptchaV3Service.execute(this.sk, 'homepage', tk => this.captchaTK = tk, {useGlobalDomain: false});


    console.log(this.videosByCategory2);

    this.showPreloader = false;
  }

  ngAfterContentInit(): void {
    new Swiper('.swiper');
  }


  async getLastArticles() {
    let articlesP = new Promise((resolve, reject) => {
      this._ArticlesService.getLastN(2)
        .subscribe(articlesRes => {
          if(!articlesRes.status) reject(articlesRes);

          articlesRes.response.map((article: ArticleFull) => this.lastArticles.push(article));
          resolve(articlesRes.status);
        });
    });

    let result = await articlesP;
    return result;
  }




  async getLastVideos() {
    let videosP = new Promise((resolve, reject) => {
      this._VideosService.getLastN(2)
      .subscribe(videosRes => {
        if(!videosRes.status) reject(videosRes);

        videosRes.response.map((video: FullVideo) => this.lastVideos.push(video));
        resolve(videosRes.status);
      });
    });

    let result = await videosP;
    return result;
  }





  async getCourses() {
    let coursesP = new Promise((resolve, reject) => {
      this._CoursesService.getAll()
        .subscribe(coursesRes => {
          if(!coursesRes.status) reject(coursesRes);

          coursesRes.response.map((course: Course) => this.courses.push(course));
          resolve(coursesRes.status);
        });
    });

    let result = await coursesP;
    return result;
  }





  async getCategories() {
    let categoriesP = new Promise((resolve, reject) => {
      this._CategoriesService.getAll()
        .subscribe(categoriesRes => {
          if(!categoriesRes.status) reject(categoriesRes);

          categoriesRes.response.map((category: Category) => this.categories.push(category));
          resolve(categoriesRes.status);
        });
    });

    let result = await categoriesP;
    return result;
  }




  async getArticlesCategories() {
    let categoriesP = new Promise((resolve, reject) => {
      this.categories.map((category: Category) => {
        if(category.type == 'articles') this.articlesCategories.push(category);
      });
      resolve(true);
    });

    let result = await categoriesP;
    return result;
  }

  async getVideosCategories() {
    let categoriesP = new Promise((resolve, reject) => {
      this.categories.map((category: Category) => {
        if(category.type == 'videos') this.videosCategories.push(category);
      });

      resolve(true);
    });

    let result = await categoriesP;
    return result;
  }



  async getArticlesByCategoryId(categoryId: number, array: number) {
    let articlesP = new Promise((resolve, reject) => {
      this._ArticlesService.getByCategoryId(categoryId)
        .subscribe(articlesRes => {
          if(!articlesRes.status) reject(articlesRes);

          if(array < 2) articlesRes.response.map((article: ArticleFull) => this.articlesByCategory1.push(article));
          if(array > 1) articlesRes.response.map((article: ArticleFull) => this.articlesByCategory2.push(article));

          resolve(articlesRes.status);
        });
    });

    let result = await articlesP;
    return result;
  }




  async getVideosByCategoryId(categoryId: number, array: number) {
    let videosP = new Promise((resolve, reject) => {
      this._VideosService.getByCategory(categoryId)
        .subscribe(videosRes => {
          if(!videosRes.status) reject(videosRes);

          if(array < 2) videosRes.response.map((video: FullVideo) => this.videosByCategory1.push(video));
          if(array > 1) videosRes.response.map((video: FullVideo) => this.videosByCategory2.push(video));

          resolve(videosRes.status);
        });
    });

    let result = await videosP;
    return result;
  }



  async sendMail() {
    if(this.contactForm.invalid) {
      this._ToastrService.error('CAMPOS INCOMPLETOS', 'DEBES COMPLETAR TODOS LOS CAMPOS PARA ENVIAR UNA CONSULTA');
      return;
    }

    this.sendingMail = true;
    let sendMail = await this.sendMailAsync(this.contactForm.value);

    if(sendMail == true) {
      this._ToastrService.success('CONSULTA ENVIADA', 'HEMOS RECIBIDO TU CONSULTA, EN BREVE NOS PONDREMOS EN CONTACTO');
      this.contactForm.reset();
    } else {
      this._ToastrService.error('NO SE ENVIÓ LA CONSULTA', 'HUBO UN ERROR AL REALIZAR EL ENVÍO DE LA CONSULTA, INTENTE NUEVAMENTE');
      return;
    }
    
  }
    async sendMailAsync(data: any) {
      let sendMailP = new Promise((resolve, reject) => {
        this._SendMailService.sendMail(data)
          .subscribe(sendMailRes => {
            this.sendingMail = false;
            if(!sendMailRes.status) reject(sendMailRes);

            resolve(sendMailRes.status);
          });
      });

      let result = await sendMailP;
      return result;
    }

}
