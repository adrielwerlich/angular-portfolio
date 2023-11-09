import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getTranslation } from 'src/utils/state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="home">
      <div id="name-container" style="display: flex; flex-direction: column; align-self: center;">
        <h1 #nameEl id="my-name" style="color: #64c9e0; margin: 0 0 8rem 0">
          {{ getTranslation('greeting') }} Adriel. {{ getTranslation('greeting2') }}
        </h1>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('nameEl') nameEl!: ElementRef;
  getTranslation = getTranslation;

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

    // this.colorTransition = 
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
