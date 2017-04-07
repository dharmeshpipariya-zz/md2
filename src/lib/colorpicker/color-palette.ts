import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'md2-color-palette',
  templateUrl: 'color-palette.html',
  styleUrls: ['color-palette.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdCalendarTable {

  /** The currently selected color. */
  //@Input()
  //get selected() { return this._selected; }
  //set selected(value: any) { this._selected = this._locale.parseDate(value); }
  //private _selected: string;// SimpleColor;

  /** Emits when the currently selected date changes. */
  //@Output() selectedChange = new EventEmitter<SimpleDate>();

  //constructor(private _locale: CalendarLocale) {
  //  this._weekdays = this._locale.narrowDays.slice(this._locale.firstDayOfWeek)
  //    .concat(this._locale.narrowDays.slice(0, this._locale.firstDayOfWeek));
  //}

  //ngAfterContentInit() {
  //  this._activeDate = this.startAt || SimpleDate.today();
  //  this._monthView = this.startView != 'year';
  //}

  ///** Handles date selection in the month view. */
  //_dateSelected(date: SimpleDate): void {
  //  if ((!date || !this.selected) && date != this.selected || date.compare(this.selected)) {
  //    this.selectedChange.emit(date);
  //  }
  //}

}
