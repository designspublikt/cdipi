import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(  private _http: HttpClient) { }

  categories = [
      {
        id: 1,
        color: '#d93637',
        name: 'Profesionales',
        icon: 'profesionales.png',
        type: 'articles',
        link: 'profesionales'
      },
      {
        id: 2,
        color: '#bba4ce',
        name: 'Inmigración',
        icon: 'inmigracion.png',
        type: 'videos',
        link: 'inmigracion'
      },
      {
        id: 3,
        color: '#6cafbf',
        name: 'Nuestros Cursos',
        icon: 'nuestros_cursos.png',
        type: 'general',
        link: ''
      },
      {
        id: 4,
        color: '#202020',
        name: 'Contacto',
        icon: 'contacto.png',
        type: 'general',
        link: ''
      },
      {
        id: 5,
        color: '#654315',
        name: 'Empleo',
        icon: 'empleo.png',
        type: 'articles',
        link: 'empleo'
      },      
      {
        id: 6,
        color: '#b75c2f',
        name: 'Innovación',
        icon: 'innovacion.png',
        type: 'videos',
        link: 'innovacion'
      },      
      {
        id: 7,
        color: '#98fa7a',
        name: 'Residencias',
        icon: 'residencias.png',
        type: 'articles',
        link: 'residencias'
      },      
      {
        id: 8,
        color: '#54124a',
        name: 'Política',
        icon: 'politica.png',
        type: 'articles',
        link: 'politica'
      },      
      {
        id: 9,
        color: '#7afaf6',
        name: 'Oportunidades',
        icon: 'oportunidades.png',
        type: 'videos',
        link: 'oportunidades'
      },      
      {
        id: 10,
        color: '#c8b0ff',
        name: 'Cultura',
        icon: 'cultura.png',
        type: 'articles',
        link: 'cultura'
      },      
      {
        id: 11,
        color: '#2c1fbf',
        name: 'Tecnología',
        icon: 'tecnologia.png',
        type: 'videos',
        link: 'tecnologia'
      },
      {
        id: 12,
        color: '#3fcaa7',
        name: 'Crecimiento',
        icon: 'crecimiento.png',
        type: 'videos',
        link: 'crecimiento'
      }
    ];
  
  getAll() {
    /* TODO: Get categories from DB */
    return this.categories;
  }

  getByType(type: string) {
    /* TODO: Get categories by type from DB */
    let categoriesFiltered: Category[] = [];
    categoriesFiltered = this.categories.filter(category => category.type == type);
    return categoriesFiltered;
  }

  getByName(name: string) {
    /* TODO: Get category by Name from DB */
    let categoriesFiltered: Category[] = [];
    categoriesFiltered = this.categories.filter(category => category.link == name);
    return categoriesFiltered;
  }
}
