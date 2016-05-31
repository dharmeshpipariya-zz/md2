import {Component, Input} from '@angular/core';

@Component({
  selector: 'md-option',
  template: `
      <ng-content></ng-content>
  `
})
export class Md2Option {

  //@Input() header: string;

  //@Input() active: boolean;

  //@Input() disabled: boolean;

  //@Input('header-class') headerClass: string;
}