import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[slide]',
  host: {
    '(mousedown)': '_handleMousedown($event)',
    '(touchstart)': '_handleMousedown($event)'
  }
})
export class Md2Slide {

  private mouseMoveListener: any;
  private mouseUpListener: any;

  @Input() slide: string;

  @Output() slideChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _element: ElementRef) {
    this.mouseMoveListener = (event: any) => { this._handleMousemove(event); };
    this.mouseUpListener = (event: any) => { this._handleMouseup(event); };
  }

  _handleMousedown(event: any) {
    this._emitChangeEvent(event);
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('touchmove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
    document.addEventListener('touchend', this.mouseUpListener);
  }

  _handleMousemove(event: any) {
    event.preventDefault();
    this._emitChangeEvent(event);
  }

  _handleMouseup(event: any) {
    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('touchmove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
    document.removeEventListener('touchend', this.mouseUpListener);
  }

  _emitChangeEvent(event: any): void {
    let trigger = this._element.nativeElement;
    let triggerRect = trigger.getBoundingClientRect();
    let width = trigger.offsetWidth;
    let height = trigger.offsetHeight;
    let x = Math.max(0, Math.min((event.pageX !== undefined ? event.pageX : event.touches[0].pageX)
      - triggerRect.left - window.pageXOffset, width));
    let y = Math.max(0, Math.min((event.pageY !== undefined ? event.pageY : event.touches[0].pageY)
      - triggerRect.top - window.pageYOffset, height));
    this.slideChange.emit({
      e: event,
      height: height,
      width: width,
      x: x,
      y: y
    });
  }

}
