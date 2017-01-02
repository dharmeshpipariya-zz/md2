import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'md2-calendar',
  templateUrl: 'calendar.html',
  styleUrls: ['calendar.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Md2Calendar {
   _weekDays: Array<string> = ['s', 'm', 't', 'w', 't', 'f', 's'];
  private _displayDate: Date = null
  private _selectedDate: Date = null

}