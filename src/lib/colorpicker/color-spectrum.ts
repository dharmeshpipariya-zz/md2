import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ColorLocale } from './color-locale';
import { ColorUtil, Hsva } from './color-util';

@Component({
  moduleId: module.id,
  selector: 'md2-color-spectrum',
  templateUrl: 'color-spectrum.html',
  styleUrls: ['color-spectrum.css'],
  exportAs: 'md2ColorSpectrum'
})
export class Md2ColorSpectrum {

  private _color: string;
  private hsva: Hsva;
  _hue: string;
  _alpha: string;

  constructor(private _locale: ColorLocale, private _util: ColorUtil) { }

  @Output() colorChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  get color() { return this._color; }
  set color(value: string) {
    if (this._color !== value) {
      this._color = value || this._locale.defaultColor;
      this.hsva = this._util.stringToHsva(this.color);
      this.update(false);
    }
  }

  get saturation(): any {
    return {
      'left': `${this.hsva.s * 100}%`,
      'top': `${100 - this.hsva.v * 100}%`
    };
  }

  get hue(): { [key: string]: string } {
    return {
      'left': `${this.hsva.h * 100}%`
    };
  }

  get alpha(): { [key: string]: string } {
    return {
      'background': `linear-gradient(to right, transparent, ${this._alpha})`
    };
  }

  get alphaPointer(): { [key: string]: string } {
    return {
      'left': `${this.hsva.a * 100}%`
    };
  }

  _setSaturation(event: any) {
    this.hsva.s = event.x / event.width;
    this.hsva.v = 1 - event.y / event.height;
    this.update(true);
  }

  _setHue(event: any) {
    this.hsva.h = event.x / event.width;
    this.update(true);
  }

  _setAlpha(event: any) {
    this.hsva.a = event.x / event.width;
    this.update(true);
  }

  private update(isInitialized: boolean) {
    let rgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(this.hsva));
    let hueRgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));

    this._alpha = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
    this._hue = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
    this._color = this._util.outputFormat(this.hsva, this._locale.formatColor);
    if (isInitialized) {
      this._emitChangeEvent();
    }
  }

  /** Emits an event when the user selects a color. */
  _emitChangeEvent(): void {
    this.colorChange.emit(this.color);
  }

}
