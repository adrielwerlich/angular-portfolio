import { projectsList } from './assets/Projects';

import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store'; // import Store from @ngrx/store

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent {
  projects = projectsList; // add this line to assign the imported projects array to a component property
  language: string = '';
  viewProject: string = '';
  madeWith: string = '';

  constructor(private store: Store<{ language: string }>, private cdr: ChangeDetectorRef) {
    // Subscribe to the language state
    this.store.select<string>(state => state.language).subscribe(language => {
      this.language = language;
      if (this.language === 'pt') {
        this.viewProject = 'Ver projeto';
        this.madeWith = 'Feito com';
    } else {
      this.viewProject = 'View Project';
      this.madeWith = 'Made with';
    }
    });
  }


}

