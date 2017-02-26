import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'colorpicker-demo',
  templateUrl: 'colorpicker-demo.html'
})
export class ColorpickerDemo {
  isRequired = false;
  isDisabled = false;
  _color: string = null;
}
