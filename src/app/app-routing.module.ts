import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import routeConfig from './routes';

// const routes: Routes = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routeConfig)
  ]
})
export class AppRoutingModule { }
