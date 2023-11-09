import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { TextEditorComponent } from './text-editor/text-editor.component';


const routeConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    {
        path: '',
        loadComponent: () => import('./app.component').then(c => c.AppComponent)
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About page'
    },
    {
        path: 'snake-game',
        component: SnakeGameComponent,
        title: 'Snake game'
    },
    {
        path: 'text-editor',
        component: TextEditorComponent,
        title: 'Text editor'
    }
];

export default routeConfig;