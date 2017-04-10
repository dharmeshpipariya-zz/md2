import { Component } from '@angular/core';

@Component({
  selector: 'colorpicker-demo',
  templateUrl: '../colorpicker/colorpicker-demo.html'
})
export class ColorpickerDemo {
  _color: string = null;
  isRequired = false;
  isDisabled = false;
}
