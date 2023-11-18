import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store'; // import Store from @ngrx/store
import { changeLanguage } from 'src/utils/language.actions';

interface ResourceKeys {
  [key: string]: string;
}

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterModule],
  // templateUrl: './app.component.html',
  template: `
  <mat-toolbar>
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon" (click)="sidenav.toggle()">
      <mat-icon>menu</mat-icon>
    </button>
    <span>
      <a mat-button routerLink="/">Adriel Angular Web Dev</a>  
    </span>
    <span class="example-spacer"></span>

    <span class="example-spacer"></span>
    <div fxShow="true" fxHide.lt-md="true">
      <!-- <a mat-button routerLink="/about">{{ getTranslation("about") }}</a> -->
      <a mat-button routerLink="/projects"> {{ getTranslation("projects") }} </a>
      <!-- <a mat-button routerLink="/contact">{{ getTranslation("contact") }}</a> -->
      <a mat-button routerLink="/snake-game">{{ getTranslation("snakeGame") }}</a>
      <!-- <a mat-button routerLink="/text-editor">{{ getTranslation("textEditor") }}</a> -->
    </div>
    <button *ngIf="browserLang != 'en'; else ptTemplate" 
      mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon" (click)="setLanguage('en')">
      <img class="brand-logo" src="/assets/images/flag-usa.png" alt="logo" aria-hidden="true">
    </button>
    <ng-template #ptTemplate>
    <button  
      mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon" (click)="setLanguage('pt')">
      <img class="brand-logo" src="/assets/images/flag-brazil.png" alt="logo" aria-hidden="true">
    </button>
    <!-- <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
      <mat-icon>share</mat-icon>
    </button> -->
    </ng-template>

  </mat-toolbar>
  <mat-sidenav-container fxFlexFill class="example-container">

  <mat-sidenav color="primary" #sidenav fxLayout="column" mode="side"  opened="true" fxHide.gt-sm="true">
      <div class="display-column" fxLayout="column">
        <!-- <a mat-button routerLink="/about">{{ getTranslation("about") }}</a> -->
        <a mat-button routerLink="/projects"> {{ getTranslation("projects") }} </a>
        <!-- <a mat-button routerLink="/contact">{{ getTranslation("contact") }}</a> -->
        <a mat-button routerLink="/snake-game">{{ getTranslation("snakeGame") }}</a>
        <!-- <a mat-button routerLink="/text-editor">{{ getTranslation("textEditor") }}</a> -->
      </div>
    </mat-sidenav>
    <mat-sidenav-content fxFlexFill>
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'adriel-angular-portfolio';
  browserLang: String = '';
  setLanguage(language: string) {
    this.store.dispatch(changeLanguage({ language }));
  }

  pt: ResourceKeys = {
    about: "Sobre mim",
    projects: "Projetos",
    contact: "Contato",
    snakeGame: "Jogo da cobrinha",
    textEditor: "Editor de texto",
  };
  en: ResourceKeys = {
    about: "About me",
    projects: "Projects",
    contact: "Contact",
    snakeGame: "Snake game",
    textEditor: "Text editor",
  };

  constructor(private store: Store<{ language: string }>, private cdr: ChangeDetectorRef) {
    // Subscribe to the language state
    this.store.select<string>(state => state.language).subscribe(language => {
      this.browserLang = language;
      // this.cdr.detectChanges();
    });
  }

  getTranslation(key: string) {
    if (this.browserLang === 'pt') {
      return this.pt[key];
    } else {
      return this.en[key];
    }
  }
}
