import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getLanguage, getTranslation, setLanguage } from 'src/utils/state';

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
    <button *ngIf="browserLang != 'en'; else ptTemplate" 
      mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon" (click)="setLanguage('en')">
      <img class="brand-logo" src="/assets/images/flag-usa.png" alt="logo" aria-hidden="true">
    </button>
    <ng-template #ptTemplate>
    <button  
      mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon" (click)="setLanguage('pt')">
      <img class="brand-logo" src="/assets/images/flag-brazil.png" alt="logo" aria-hidden="true">
    </button>
    </ng-template>

    <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
      <mat-icon>share</mat-icon>
    </button>
    <span class="example-spacer"></span>
    <div fxShow="true" fxHide.lt-md="true">
      <a mat-button routerLink="/about">{{ getTranslation("about") }}</a>
      <a mat-button routerLink="/projects"> {{ getTranslation("projects") }} </a>
      <a mat-button routerLink="/contact">{{ getTranslation("contact") }}</a>
      <a mat-button routerLink="/snake-game">{{ getTranslation("snakeGame") }}</a>
      <a mat-button routerLink="/text-editor">{{ getTranslation("textEditor") }}</a>
    </div>
  </mat-toolbar>
  <mat-sidenav-container fxFlexFill class="example-container">

  <mat-sidenav color="primary" #sidenav fxLayout="column" mode="side"  opened="true" fxHide.gt-sm="true">
      <div class="display-column" fxLayout="column">
        <a mat-button routerLink="/about">{{ getTranslation("about") }}</a>
        <a mat-button routerLink="/projects"> {{ getTranslation("projects") }} </a>
        <a mat-button routerLink="/contact">{{ getTranslation("contact") }}</a>
        <a mat-button routerLink="/snake-game">{{ getTranslation("snakeGame") }}</a>
        <a mat-button routerLink="/text-editor">{{ getTranslation("textEditor") }}</a>
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
  browserLang = getLanguage();
  getTranslation = getTranslation;
  setLanguage(language: string) {
    setLanguage(language)
    this.browserLang = getLanguage();
  }

}
