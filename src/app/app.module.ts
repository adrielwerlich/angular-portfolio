import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Add this line

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SnakeGameComponent,
    TextEditorComponent,
    ToolbarComponent
  ],
  imports: [
    NgIf,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add this line
    FormsModule,
    BrowserAnimationsModule,
    
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
