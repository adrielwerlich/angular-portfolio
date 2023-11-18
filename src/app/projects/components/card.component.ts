import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() date: string;
  @Input() snippet: string;
  @Input() body: string;
  @Input() image: string;
  @Input() slug: string;
  @Input() link: string;

  lang: string;

  ngOnInit() {
    this.lang = sessionStorage.getItem('lan') || 'pt';
  }

  setLang(lang: string) {
    this.lang = lang;
  }

  checkImage(title: string) {
    if (this.image.indexOf('krishna-said.png') > -1) {
      setTimeout(() => {
        let el = document.getElementById(`image-${title}`);
        el ? el.classList.add('less-width') : null;
      }, 2000);
    }
  }

  translate(section: string) {
    if (section === 'view-project') {
      return this.lang === 'pt' ? 'Ver projeto' : 'View Project';
    }
  }
}