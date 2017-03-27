import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateLocale, DefaultDateLocale } from './date-locale';
import { DateUtil } from './date-util';
import { Md2Datepicker } from './datepicker';
import { Md2Calendar } from './calendar';
import { Md2Clock } from './clock';
import { OverlayModule } from '../core/overlay/overlay-directives';
import { StyleModule } from '../core/style/index';

export * from './datepicker';
export * from './date-locale';
export * from './date-util';
export * from './calendar';
export * from './clock';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    StyleModule,
  ],
  exports: [
    Md2Datepicker,
  ],
  declarations: [
    Md2Calendar,
    Md2Clock,
    Md2Datepicker,
  ],
  providers: [{ provide: DateLocale, useClass: DefaultDateLocale }, DateUtil],
})
export class Md2DatepickerModule { }