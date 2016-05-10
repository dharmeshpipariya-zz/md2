import {Component} from 'angular2/core';

import {Md2Accordion} from '../../../components/accordion/accordion';
import {Md2AccordionTab} from '../../../components/accordion/accordiontab';

@Component({
  selector: 'accordion',
  templateUrl: './app/components/accordion/accordion.html',
  directives: [Md2Accordion, Md2AccordionTab]
})
export class Accordion {
  public accordions: Array<any> = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3', active: true }
  ];
  multiple: boolean = false;
}