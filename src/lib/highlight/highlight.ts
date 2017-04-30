import {
  Component,
  Input,
  AfterContentInit,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';

declare var hljs: any;

@Component({
  selector: 'highlight',
  templateUrl: 'highlight.html',
  styleUrls: ['highlight.css'],
  encapsulation: ViewEncapsulation.None
})
export class Md2Highlight implements AfterContentInit {
  get type(): string { return this._type; }

  @Input()
  set type(value: string) {
    this._type = value;
    this.render();
  }
  private _type: string = 'typescript';

  @Input()
  get text(): string { return this._text; }
  set text(value: string) {
    this._text = value;
    this.render();
  }
  private _text: string = '';

  _content: Array<string> = [];

  constructor(private _element: ElementRef) { }

  ngAfterContentInit() {
    // If there is no text binding, use the body of the element.
    if (this._text === '' && this._element) {
      this.text = this._element.nativeElement.innerText;
    }
  }

  render() {
    var lines = this._text.split('\n');
    if (this._text.trim().length === 0 || lines.length === 0) {
      return;
    }
    // Remove empty lines
    lines = lines.filter((line) => line.trim().length > 0);

    // Make it so each line starts at 0 whitespace
    var firstLineWhitespace = lines[0].match(/^\s*/)[0];
    var startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
    lines = lines.map(function (line) {
      return line.replace(startingWhitespaceRegex, '').replace(/\s+$/, '');
    });

    this._content = (this.highlight(this._type, lines.join('\n')) || this.text).split('\n');
  }

  private highlight(language: string, code: string): string {
    return hljs.highlight(language, code, true)
      .value.replace(/=<span class="hljs-value">""<\/span>/gi, '')
      .replace('<head>', '')
      .replace('<head/>', '');
  }

  addLineComment(event: Event, lineNumber: number) {
    let trLine = this._element.nativeElement.querySelector('#line' + lineNumber);
    trLine.insertAfter('tr');
    console.log(lineNumber);
  }
}
