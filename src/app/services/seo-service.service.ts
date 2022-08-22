import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(  @Inject(DOCUMENT) private DOM: Document, 
                private _Title: Title,
                private _Meta: Meta) { }

    /* Update Title */
  updateTitle(title: string) {
    this._Title.setTitle(title);
  }

    /* Update Description */
  updateDescription(content: string) {
    this._Meta.updateTag({ name: 'description', content });
  }

    /* Create Canonical Link */ 
  createCanonicalLink(url: string) {
    let link: HTMLLinkElement = this.DOM.createElement('link');

    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.DOM.head.appendChild(link);
  }
}
