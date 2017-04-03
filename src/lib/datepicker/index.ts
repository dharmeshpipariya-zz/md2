import { NgModule } from '@angular/core';
import { MdMonthView } from './month-view';
import { CommonModule } from '@angular/common';
import { MdCalendarTable } from './calendar-table';
import { MdYearView } from './year-view';
import { DateUtil, SimpleDate } from './date-util';
import { DateLocale } from './date-locale';
import { OverlayModule, PortalModule } from '../core';
import { Md2Datepicker } from './datepicker';
import { Md2Clock } from './clock';
import { Md2Calendar } from './calendar';
import { StyleModule } from '../core/style/index';


export * from './calendar';
export * from './calendar-table';
export * from './datepicker';
export * from './month-view';
export * from './year-view';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    StyleModule,
  ],
  exports: [
    Md2Datepicker,
    Md2Calendar,
    Md2Clock,
  ],
  declarations: [
    Md2Calendar,
    MdCalendarTable,
    Md2Datepicker,
    MdMonthView,
    MdYearView,
    Md2Clock
  ],
  providers: [DateLocale, DateUtil],
  entryComponents: [
    Md2Datepicker,
  ]
})
export class Md2DatepickerModule { }
