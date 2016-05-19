# md2-tooltip

Native Angular2 Material Tooltip directive

## API

Example:
 
 ```html
<a href="#" tooltip-direction="left" tooltip="On the Left!">Left</a> <br />
<a href="#" tooltip-direction="right" tooltip="On the Right!">Right</a> <br />
<a href="#" tooltip-direction="bottom" tooltip="On the Bottom!">Bottom</a> <br />
<a href="#" tooltip-direction="top" tooltip="On the Top!">Top</a> <br />
<a href="#" tooltip-delay='1000' tooltip='appears with delay'>Delayed</a>
 ```
 ```ts

...

import {TOOLTIP_DIRECTIVES} from 'md2/tooltip';

@Component({
    selector: "...",
    directives: [TOOLTIP_DIRECTIVES]
})

export class ... {
    
    ...

}
 ```

### Properties

  - `tooltip` (`string`) - text of tooltip
  - `tooltip-direction` (`?string='bottom'`) - tooltip direction instruction, supported positions: 'top', 'bottom', 'left', 'right'
  - `tooltip-delay` (`?numer=0`) - time in milliseconds before tooltip occurs
