import {Component, ElementRef, Input, Output, EventEmitter, Query, QueryList, ViewEncapsulation} from '@angular/core';
import {Md2Option} from './option';

@Component({
  selector: 'md-select',
  template: `
Test
      <ng-content></ng-content>
    
  `
})
export class Md2Select {

  //@Input('md-class') mdClass: string;

  //@Output() change: EventEmitter<any> = new EventEmitter<any>();

  //initialized: boolean;

  //tabs: Md2Tab[];

  //constructor(private el: ElementRef, @Query(Md2Tab) tabs: QueryList<Md2Tab>) {
  //  tabs.changes.subscribe(_ => {
  //    this.tabs = tabs.toArray();
  //    let activeTab: Md2Tab = this.findActiveTab();
  //    if (!activeTab && this.tabs.length) {
  //      this.tabs[0].active = true;
  //    }
  //  });
  //}

  //open(event: Event, tab: Md2Tab) {
  //  if (tab.disabled) {
  //    event.preventDefault();
  //    return;
  //  }

  //  if (!tab.active) {
  //    let activeTab: Md2Tab = this.findActiveTab();
  //    if (activeTab) {
  //      activeTab.active = false
  //    }
  //    tab.active = true;
  //    this.change.emit({ originalEvent: event, index: this.findTabIndex(tab) });
  //  }
  //  event.preventDefault();
  //}

  //findActiveTab() {
  //  for (let i = 0; i < this.tabs.length; i++) {
  //    if (this.tabs[i].active) {
  //      return this.tabs[i];
  //    }
  //  }
  //  return null;
  //}

  //findTabIndex(tab: Md2Tab) {
  //  let index = -1;
  //  for (let i = 0; i < this.tabs.length; i++) {
  //    if (this.tabs[i] == tab) {
  //      index = i;
  //      break;
  //    }
  //  }
  //  return index;
  //}
}

export const SELECT_DIRECTIVES: Array<any> = [Md2Select, Md2Option];