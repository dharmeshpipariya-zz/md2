import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ColorLocale, Hsva, Rgba, Hsla, SliderPosition, SliderDimension } from './color-locale';

@Component({
  moduleId: module.id,
  selector: 'md2-color-spectrum',
  templateUrl: 'color-spectrum.html',
  styleUrls: ['colorpicker.css'],
  encapsulation: ViewEncapsulation.None
})
export class Md2ColorSpectrum {

  private _color: string;
  _hue: string;
  _alpha: string;
  private hsva: Hsva;
  hexText: string;
  rgbaText: Rgba;
  hslaText: Hsla;
  private fontColor: string;

  constructor(private _locale: ColorLocale) { }

  @Output() colorChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  get color() { return this._color; }
  set color(value: string) {
    if (this._color !== value) {
      this._color = value || this._locale.defaultValue;
      this.hsva = this._locale.stringToHsva(this.color);
      this.update();
    }
  }

  get saturation(): any {
    return {
      'left': `${this.hsva.s * 100}%`,
      'top': `${100 - this.hsva.v * 100}%`,
      //'background-color': `${this._alpha}`
    };
  }

  get hue(): { [key: string]: string } {
    return {
      'top': `${this.hsva.h * 100}%`
    };
  }

  get alpha(): { [key: string]: string } {
    return {
      'top': `${this.hsva.a * 100}%`
      //'transform': `translate${axis}(-${offset}%)`
    };
  }

  _setSaturation(event: any) {
    this.hsva.s = event.x / event.width;
    this.hsva.v = (1 - event.y / event.height);
    this.update();
  }

  _setHue(event: any) {
    this.hsva.h = event.y / event.height;
    this.update();
  }

  _setAlpha(event: any) {
    this.hsva.a = event.y / event.height;
    this.update();
  }

  private update() {
    let hsla = this._locale.hsva2hsla(this.hsva);
    let rgba = this._locale.denormalizeRGBA(this._locale.hsvaToRgba(this.hsva));
    let hueRgba = this._locale.denormalizeRGBA(this._locale.hsvaToRgba(
      new Hsva(this.hsva.h, 1, 1, 1)));

    this._alpha = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
    this._hue = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
    this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100),
      Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
    this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
    this.hexText = this._locale.hexText(rgba);
    let colorCode = Math.round((this.rgbaText.r * 299 + this.rgbaText.g * 587 +
      this.rgbaText.b * 114) / 1000);
    //if (colorCode >= 128 || this.hsva.a < 0.35) {
    //  this.fontColor = 'black';
    //} else { this.fontColor = 'white'; }

    //if (this.format === 0 && this.hsva.a < 1) {
    //  this.format++;
    //}
    //this.slider = new SliderPosition((this.hsva.h) * this.sliderDim.h,
    //  this.hsva.s * this.sliderDim.s, (1 - this.hsva.v) * this.sliderDim.v,
    //  this.hsva.a * this.sliderDim.a);
    this._color = this._locale.outputFormat(this.hsva, this._locale.format);
    this._emitChangeEvent();
  }

  /** Emits an event when the user selects a color. */
  _emitChangeEvent(): void {
    this.colorChange.emit(this.color);
  }

}
