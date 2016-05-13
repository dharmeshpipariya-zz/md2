import {Component} from '@angular/core';

import {Md2Menu} from '../../../components/menu/menu';

@Component({
  selector: 'menu',
  templateUrl: './app/components/menu/menu.html',
  directives: [Md2Menu]
})
export class Menu {
  menuLabel: string = "<b>test</b> Menu Label"
}
