import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store'; // import Store from @ngrx/store

@Component({
  selector: 'app-present-my-name',
  templateUrl: './present-my-name.component.html',
  standalone: true,
  styleUrls: ['./present-my-name.component.css']
})
export class PresentMyNameComponent {
  @ViewChild('nameEl') nameEl!: ElementRef;
  language: string = '';
  postGreeting: string = '';
  greeting: string = '';

  constructor(private store: Store<{ language: string }>, private cdr: ChangeDetectorRef) {
    // Subscribe to the language state
    this.store.select<string>(state => state.language).subscribe(language => {
      this.language = language;
      if (this.language === 'pt') {
        this.greeting = 'Olá, eu sou o';
        this.postGreeting = "Desenvolvedor Web e Unity";
      } else {
        this.greeting = "Hello, I'm";
        this.postGreeting = "Web and Unity Developer";
      }
    });
  }

  ngAfterViewInit() {
    this.colorTransition(this.nameEl.nativeElement)
  }

  colorTransition(nameEl: HTMLElement) {

    const values = [
      'rgba(9, 5, 254, 0.984)',
      'rgba(254, 22, 5, 0.986)',
      'rgba(254, 217, 5, 0.986)',
      'rgba(254, 250, 5, 0.986)',
      'rgba(217, 254, 5, 0.986)',
      'rgba(84, 254, 5, 0.986)',
      'rgba(5, 254, 179, 0.986)',
      'rgba(5, 254, 242, 0.986)',
      'rgba(5, 175, 254, 0.986)',
      'rgba(183, 5, 254, 0.986)',
      'rgba(254, 5, 5, 0.986)',
      'rgba(5, 254, 5, 0.986)',
      'rgba(5, 5, 254, 0.986)',
      'rgba(254, 5, 254, 0.986)',
      'rgba(5, 254, 254, 0.986)',
      'rgba(254, 254, 5, 0.986)',
      'rgba(254, 5, 183, 0.986)',
      'rgba(5, 183, 254, 0.986)',
      'rgba(183, 254, 5, 0.986)'
    ]

    let index = 1, ls = this

    setInterval(() => {

      if (nameEl?.style) {

        nameEl.style.textShadow =
          `rgb(255, 255, 255) 0px 0px 7.6px, ${values[index]} 0px 0px 30.4px, rgb(254, 5, 225) 0px 0px 45.6px`
        nameEl.style.color = values[index];

        index++

        if (index == values.length) index = 0

      }

    }, 500);

  }
}
