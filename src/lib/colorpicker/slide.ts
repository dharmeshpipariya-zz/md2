import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  Renderer,
  Self,
  ViewEncapsulation,
} from '@angular/core';

@Directive({
  selector: '[slide]',
  host: {
    '(mousedown)': '_handleMousedown($event)',
  }
})
export class Md2Slide {

  private mouseMoveListener: any;
  private mouseUpListener: any;

  //@Input('rgX') rgX: number;
  //@Input('rgY') rgY: number;

  @Output() slideChange: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private _element: ElementRef) {
    this.mouseMoveListener = (event: any) => { this._handleMousemove(event) };
    this.mouseUpListener = (event: any) => { this._handleMouseup(event) };
  }

  _handleMousedown(event: any) {
    this._emitChangeEvent(event);
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
  }

  _handleMousemove(event: any) {
    event.preventDefault();
    this._emitChangeEvent(event);
  }

  _handleMouseup(event: any) {
    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
  }

  //private getX(event: any): number {
  //  return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this._element.nativeElement.getBoundingClientRect().left - window.pageXOffset;
  //}

  //private getY(event: any): number {
  //  return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this._element.nativeElement.getBoundingClientRect().top - window.pageYOffset;
  //}

  //private setPointer(event: Event): void {
  //  let height = this._element.nativeElement.offsetHeight;
  //  let width = this._element.nativeElement.offsetWidth;
  //  let x = Math.max(0, Math.min(this.getX(event), width));
  //  let y = Math.max(0, Math.min(this.getY(event), height));

  //  if (this.rgX !== undefined && this.rgY !== undefined) {
  //    this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
  //  } else if (this.rgX === undefined && this.rgY !== undefined) {
  //    this.newValue.emit({ v: y / height, rg: this.rgY });
  //  } else {
  //    this.newValue.emit({ v: x / width, rg: this.rgX });
  //  }
  //}

  _emitChangeEvent(event: Event): void {
    this.slideChange.emit(event);
  }

}
