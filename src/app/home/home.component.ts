import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentMyNameComponent } from '../present-my-name/present-my-name.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PresentMyNameComponent],
  template: `
    <div id="home" >
      <app-present-my-name style="display: flex; flex-direction: column; align-self: center;"></app-present-my-name>
    </div>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
