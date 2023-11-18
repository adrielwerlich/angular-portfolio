import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent {
  @ViewChild('editor') editor!: ElementRef;

  text = 'Hello world'; // the text to be styled
  styles = {
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none'
  }; // the object to store the styles



  toggleStyle(style: string) {

    // toggle the style property based on the button clicked`

    if (style === 'bold') {
      this.styles = { ...this.styles, fontWeight: this.styles.fontWeight === 'bold' ? 'normal' : 'bold' };
    } else if (style === 'italic') {
      this.styles = { ...this.styles, fontStyle: this.styles.fontStyle === 'italic' ? 'normal' : 'italic' };
    } else if (style === 'underline') {
      this.styles = { ...this.styles, textDecoration: this.styles.textDecoration === 'underline' ? 'none' : 'underline' };
    }

  }

  content = '';
  history = [''];
  stateIndex = 0;
  // editor = document.getElementById('editor');
  execCommand(command: string | { command: string, arg: string }) {
    if (typeof command === 'string') {
      document.execCommand(command, false);
    } else {
      document.execCommand(command.command, false, command.arg);
    }
    this.saveState();
  }

  applyStyle(style: string) {
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      let range = selection.getRangeAt(0);
      let span = document.createElement('span');

      switch (style) {
        case 'bold':
          span.style.fontWeight = 'bold';
          break;
        case 'italic':
          span.style.fontStyle = 'italic';
          break;
        case 'underline':
          span.style.textDecoration = 'underline';
          break;
      }

      span.appendChild(range.extractContents());
      range.insertNode(span);
    }
  }

  execCommandWithArg(command: string, arg: string) {
    document.execCommand(command, false, arg);
    this.saveState();
  }
  saveState() {
    if (this.editor) {
      this.history.push(this.editor.nativeElement.innerHTML);
      this.stateIndex++;
    }
  }
  undo() {
    if (this.stateIndex > 0 && this.editor) {
      this.stateIndex--;
      this.editor.nativeElement.innerHTML = this.history[this.stateIndex];
    }
  }
  redo() {
    if (this.stateIndex < this.history.length - 1 && this.editor) {
      this.stateIndex++;
      this.editor.nativeElement.innerHTML = this.history[this.stateIndex];
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
    const text = this.editor.nativeElement.innerHTML;
    const blob = new Blob([text ?? ""], { type: 'text/plain' });
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
        this.editor.nativeElement.innerHTML = reader.result as string;
    };
    reader.readAsText(file ?? new Blob());
  }
}