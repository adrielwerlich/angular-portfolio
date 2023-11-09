import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() onCommand = new EventEmitter<string | { command: string, arg: string }>();
  
  openPrompt(message: string): string | null {
    return window.prompt(message) || '';
  }
}