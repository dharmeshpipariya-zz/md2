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
  private _displayDate: Date = null
  private _selectedDate: Date = null

}