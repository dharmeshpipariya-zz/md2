# md2-colorpicker

Native Angular2 Material Colorpicker directive

## API

Example:
 
 ```html
//HTML
<div [(colorpicker)]="color"
     position="right"
     offset="0"
     format="hex"
     (change)="change($event)">
</div>
 ```
 ```ts
//TypeScript
//Add ColorpickerService in your main.ts:
import {ColorpickerService} from 'md2/colorpicker.service'
bootstrap(AppComponent, [ColorpickerService]);


//Add Md2Colorpicker Your Component:
...

import {Md2Colorpicker} from 'md2/colorpicker';

@Component({
    selector: "...",
    directives: [Md2Colorpicker]
})

export class ... {
    
    ...
    
    private color: string = "#123456";

    ...

}
 ```


### Properties

  - `[(colorpicker)]` _- string - (Default: `null`)_ To bind color value with colorpicker.
  - `[position]` _- string - (Default: `bottom`)(Optional)_ - position of colorpicker dialog, supported positions: 'right', 'left', 'top', 'bottom'.
  - `[offset]` _- string - (Default: `0`)(Optional)_ - offset of colorpicker dialog.
  - `[format]` _- string - (Default: `hex`)(Optional)_ - color format, supported formats: 'hex', 'rgba', 'hsla'.


### Events

  - `(change)` - it fires after select a new color; returns color value.
