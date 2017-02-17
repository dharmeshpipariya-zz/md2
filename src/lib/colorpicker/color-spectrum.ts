import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ColorLocale } from './color-locale';

@Component({
  moduleId: module.id,
  selector: 'md2-color-spectrum',
  templateUrl: 'color-spectrum.html',
  styleUrls: ['colorpicker.css'],
  encapsulation: ViewEncapsulation.None
})
export class Md2ColorSpectrum {

  private _color: string;

  constructor(private _locale: ColorLocale) { }

  @Output() colorChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  get color() { return this._color; }
  set color(value: string) { this._color = value || this._locale.defaultValue; }

  /** Emits an event when the user selects a color. */
  _emitChangeEvent(): void {
    this.colorChange.emit(this.color);
  }

  _onSaturationSlide(event: Event) {
    event.preventDefault();
    console.log(event);
    //this._updateValueFromPosition({ x: event.center.x, y: event.center.y });
    //this._emitInputEvent();
  }

}
