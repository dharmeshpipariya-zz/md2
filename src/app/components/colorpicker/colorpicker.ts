import {Component,OnInit } from '@angular/core';
import {Md2Colorpicker} from '../../../components/colorpicker/colorpicker';

@Component({
  selector: 'colorPicker',
  templateUrl: './app/components/colorpicker/colorpicker.html',
  directives: [Md2Colorpicker]
})
export class Colorpicker {
    private color: string = "#127bdc";
    private color2: string = "#fff500";

}
