import { Injectable } from '@angular/core';


/** Whether the browser supports the Intl API. */
const SUPPORTS_INTL_API = !!Intl;


/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  return Array.apply(null, Array(length)).map((v: undefined, i: number) => valueFunction(i));
}

/** Date locale info. TODO(mmalerba): Integrate with i18n solution once we know what we're doing. */
@Injectable()
export abstract class DateLocale {

  /** Labels to use for the long form of the month. (e.g. 'January') */
  months: string[];

  /** Labels to use for the short form of the month. (e.g. 'Jan') */
  shortMonths: string[];

  /** Labels to use for the narrow form of the month. (e.g. 'J') */
  narrowMonths: string[];

  /** Labels to use for the long form of the week days. (e.g. 'Sunday') */
  days: string[];

  /** Labels to use for the short form of the week days. (e.g. 'Sun') */
  shortDays: string[];

  /** Labels to use for the narrow form of the week days. (e.g. 'S') */
  narrowDays: string[];

  /**
   * Labels to use for the dates of the month. (e.g. null, '1', '2', ..., '31').
   * Note that the 0th index is null, since there is no January 0th.
   */
  dates: string[];

  /** The first day of the week. (e.g. 0 = Sunday, 6 = Saturday). */
  firstDayOfWeek: number;

  /** A label for the calendar popup (used by screen readers). */
  calendarLabel: string;

  /** A label for the button used to open the calendar popup (used by screen readers). */
  openCalendarLabel: string;

  /**
   * Parses a Date from a value.
   * @param value The value to parse.
   */
  parseDate: (value: any) => Date;

  /**
   * Formats a Date to a string.
   * @param date The date to format.
   */
  formatDate: (date: Date) => string;

  /**
   * Gets a label to display as the heading for the specified calendar month.
   * @param date A date that falls within the month to be labeled.
   */
  getCalendarMonthHeaderLabel: (date: Date) => string;

  /**
   * Gets a label to display as the heading for the specified calendar year.
   * @param date A date that falls within the year to be labeled.
   */
  getCalendarYearHeaderLabel: (date: Date) => string;


  //months = [
  //  { full: 'January', short: 'Jan' },
  //  { full: 'February', short: 'Feb' },
  //  { full: 'March', short: 'Mar' },
  //  { full: 'April', short: 'Apr' },
  //  { full: 'May', short: 'May' },
  //  { full: 'June', short: 'Jun' },
  //  { full: 'July', short: 'Jul' },
  //  { full: 'August', short: 'Aug' },
  //  { full: 'September', short: 'Sep' },
  //  { full: 'October', short: 'Oct' },
  //  { full: 'November', short: 'Nov' },
  //  { full: 'December', short: 'Dec' },
  //];

  //days = [
  //  { full: 'Sunday', short: 'Sun', xshort: 'S' },
  //  { full: 'Monday', short: 'Mon', xshort: 'M' },
  //  { full: 'Tuesday', short: 'Tue', xshort: 'T' },
  //  { full: 'Wednesday', short: 'Wed', xshort: 'W' },
  //  { full: 'Thursday', short: 'Thu', xshort: 'T' },
  //  { full: 'Friday', short: 'Fri', xshort: 'F' },
  //  { full: 'Saturday', short: 'Sat', xshort: 'S' },
  //];

  getDays: () => any;

  getDayLabel: (d: number) => string;

  getDateLabel: (d: Date) => string;

  getMonthLabel: (m: number, y: number) => string;

  getYearLabel: (y: number) => string;

}

/**
 * The default implementation of CalendarLocale. This implementation is a best attempt at
 * localization using only the functionality natively available in JS. If more robust localization
 * is needed, an alternate class can be provided as the CalendarLocale for the app.
 */
export class DefaultDateLocale implements DateLocale {
  months = SUPPORTS_INTL_API ? this._createMonthsArray('long') :
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

  shortMonths = SUPPORTS_INTL_API ? this._createMonthsArray('short') :
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  narrowMonths = SUPPORTS_INTL_API ? this._createMonthsArray('narrow') :
    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  days = SUPPORTS_INTL_API ? this._createDaysArray('long') :
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  shortDays = SUPPORTS_INTL_API ? this._createDaysArray('short') :
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  narrowDays = SUPPORTS_INTL_API ? this._createDaysArray('narrow') :
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  dates = [null].concat(
    SUPPORTS_INTL_API ? this._createDatesArray('numeric') : range(31, i => String(i + 1)));

  firstDayOfWeek = 0;

  calendarLabel = 'Calendar';

  openCalendarLabel = 'Open calendar';

  parseDate(value: any) {
    if (value instanceof Date) {
      return value;
    }
    let timestamp = typeof value == 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  formatDate = this._createFormatFunction(undefined) ||
  ((date: Date) => date.toDateString());

  getCalendarMonthHeaderLabel = this._createFormatFunction({ month: 'short', year: 'numeric' }) ||
  ((date: Date) => this.shortMonths[date.getMonth()] + ' ' + date.getFullYear());

  getCalendarYearHeaderLabel = this._createFormatFunction({ year: 'numeric' }) ||
  ((date: Date) => String(date.getFullYear()));

  private _createMonthsArray(format: string) {
    let dtf = new Intl.DateTimeFormat(undefined, { month: format });
    return range(12, i => dtf.format(new Date(2017, i, 1)));
  }

  private _createDaysArray(format: string) {
    let dtf = new Intl.DateTimeFormat(undefined, { weekday: format });
    return range(7, i => dtf.format(new Date(2017, 0, i + 1)));
  }

  private _createDatesArray(format: string) {
    let dtf = new Intl.DateTimeFormat(undefined, { day: format });
    return range(31, i => dtf.format(new Date(2017, 0, i + 1)));
  }

  /**
   * Creates a function to format Dates as strings using Intl.DateTimeFormat.
   * @param options The options to use for Intl.DateTimeFormat.
   * @returns The newly created format function, or null if the Intl API is not available.
   * @private
   */
  private _createFormatFunction(options: Object): (date: Date) => string {
    if (SUPPORTS_INTL_API) {
      let dtf = new Intl.DateTimeFormat(undefined, options);
      return (date: Date) => dtf.format(date);
    }
    return null;
  }

  getDays() {
    return this.days.slice(this.firstDayOfWeek, this.days.length)
      .concat(this.days.slice(0, this.firstDayOfWeek));
  }

  getDayLabel(d: number) { return `${d}`; }

  getDateLabel(d: Date) {
    return `${this.shortDays[d.getDay()]}, ${this.shortMonths[d.getMonth()]} ${d.getDate()}`;
  }

  getMonthLabel(m: number, y: number) { return `${this.months[m]} ${y}`; }

  getYearLabel(y: number) { return `${y}`; }
}
