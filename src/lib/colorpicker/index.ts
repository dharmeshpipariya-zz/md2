import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule, PortalModule } from '../core';
import { Md2Colorpicker } from './colorpicker';
import { Md2ColorSpectrum } from './color-spectrum';
import { Md2ColorSpectrum1 } from './color-spectrum1';
import { Md2ColorpickerToggle, Md2ColorPanel } from './colorpicker-toggle';
import { Md2ColorpickerContent } from './colorpicker-content';
import { Md2Slide } from './slide';
import { ColorLocale, DefaultColorLocale } from './color-locale';
import { ColorUtil } from './color-util';
import { StyleModule } from '../core/style/index';

export * from './colorpicker';
export * from './color-locale';
export * from './color-util';
export * from './color-spectrum';
export * from './color-spectrum1';
export * from './slide';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    StyleModule,
  ],
  exports: [
    Md2Colorpicker,
    Md2ColorSpectrum,
    Md2ColorSpectrum1,
    Md2ColorpickerContent,
    Md2ColorpickerToggle,
    Md2ColorPanel
  ],
  declarations: [
    Md2Colorpicker,
    Md2ColorSpectrum,
    Md2ColorSpectrum1,
    Md2ColorpickerContent,
    Md2ColorpickerToggle,
    Md2ColorPanel,
    Md2Slide
  ],
  providers: [{ provide: ColorLocale, useClass: DefaultColorLocale }, ColorUtil],
  entryComponents: [
    Md2Colorpicker,
    Md2ColorPanel
  ]
})
export class Md2ColorpickerModule { }


