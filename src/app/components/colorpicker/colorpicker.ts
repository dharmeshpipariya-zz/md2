import {Component, OnInit } from '@angular/core';
import {Md2Colorpicker} from '../../../components/colorpicker/colorpicker';
import {ColorpickerService} from '../../../components/colorpicker/colorpicker.service';

@Component({
  selector: 'colorPicker',
  templateUrl: './app/components/colorpicker/colorpicker.html',
  directives: [Md2Colorpicker],
  providers: [ColorpickerService]
})
export class Colorpicker {
  private color: string = "#123456";
  private color2: string = "#654321";
}
