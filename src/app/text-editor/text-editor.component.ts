import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent {
  content = '';
  history = [''];
  stateIndex = 0;
  editor = document.getElementById('editor');
  execCommand(command: string | { command: string, arg: string }) {
    if (typeof command === 'string') {
      document.execCommand(command, false);
    } else {
      document.execCommand(command.command, false, command.arg);
    }
    this.saveState();
  }
  execCommandWithArg(command: string, arg: string) {
    document.execCommand(command, false, arg);
    this.saveState();
  }
  saveState() {
    if (this.editor) {
      this.history.push(this.editor.innerHTML);
      this.stateIndex++;
    }
  }
  undo() {
    if (this.stateIndex > 0 && this.editor) {
      this.stateIndex--;
      this.editor.innerHTML = this.history[this.stateIndex];
    }
  }
  redo() {
    if (this.stateIndex < this.history.length - 1 && this.editor) {
      this.stateIndex++;
      this.editor.innerHTML = this.history[this.stateIndex];
    }
  }
  copy(event: ClipboardEvent) {
    event.preventDefault();

    // Get the selected text
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    const selectedText = selection.toString();

    // Set the clipboard data
    event?.clipboardData?.setData('text/plain', selectedText);
  }

  paste(event: ClipboardEvent) {
    // You can manipulate the clipboard data here if necessary
    event.preventDefault();
    const text = event?.clipboardData?.getData('text/plain');
    document.execCommand('insertText', false, text);
  }
  save() {
    const text = this?.editor?.innerHTML;
    const blob = new Blob([text??""], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.txt';
    a.click();
  }
  load(files: FileList) {
    const file = files.item(0);
    const reader = new FileReader();
    reader.onload = () => {
      if (this.editor)
        this.editor.innerHTML = reader.result as string;
    };
    reader.readAsText(file??new Blob());
  }
}