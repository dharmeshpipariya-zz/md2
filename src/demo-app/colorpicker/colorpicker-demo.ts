import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'colorpicker-demo',
  templateUrl: 'colorpicker-demo.html'
})
export class ColorpickerDemo {
  private _color: string = null;
  handleChange(value: any) {
    console.log('Changed color: ', value);
  }
}
