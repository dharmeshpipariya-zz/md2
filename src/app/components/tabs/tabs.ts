import {Component} from '@angular/core';

import {Md2Tabs} from '../../../components/tabs/tabs';
import {Md2Tab} from '../../../components/tabs/tab';

@Component({
  selector: 'tabs',
  templateUrl: './app/components/tabs/tabs.html',
  directives: [Md2Tabs, Md2Tab]
})
export class Tabs {
  public tabs: Array<any> = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true }
  ];

  public change(tab) {
    console.log('Changed Tab' + tab);
  };
}