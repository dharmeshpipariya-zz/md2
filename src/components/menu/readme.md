# md2-menu

Native Angular2 Material Menu component

### Selector

```html
<md2-menu></md2-menu>
```

## API

Example:
 
 ```html
<md2-menu [menu-label]="menuLabel">
  <a class="md2-menu-item" href="#/Accordion">Accordion</a>
  <a class="md2-menu-item" href="#/Autocomplete">Autocomplete</a>
  <a class="md2-menu-item" href="#/Multiselect">Multiselect</a>
  <a class="md2-menu-item" href="#/Select">Select</a>
  <a class="md2-menu-item" href="#/Switch">Switch</a>
</md2-menu>

...

<md2-menu>
  <menu-label>
    <b>Bold</b> Header Menu
  </menu-label>
  <a class="md2-menu-item" href="#/Accordion">Accordion</a>
  <a class="md2-menu-item" href="#/Autocomplete">Autocomplete</a>
  <a class="md2-menu-item" href="#/Multiselect">Multiselect</a>
  <a class="md2-menu-item" href="#/Select">Select</a>
  <a class="md2-menu-item" href="#/Switch">Switch</a>
</md2-menu>
 ```
 ```ts

...

import {Md2Menu} from 'md2/menu';

@Component({
    selector: "...",
    directives: [Md2Menu]
})

export class ... {
    
    ...
    
    private menuLabel: string = 'Lorum Ipsum';

    ...

}
 ```


### Properties

  - `[menuLabel]` _- string - (Default: `null`)(Optional)_ -
    The heading or title of the menu

### Referenced From
Fuel UI (see the repo [https://github.com/FuelInteractive/fuel-ui](https://github.com/FuelInteractive/fuel-ui) repository for the angular2 based dropdown component)
