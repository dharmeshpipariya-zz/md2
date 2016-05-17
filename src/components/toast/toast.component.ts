import {Component, Input, ViewChild, ComponentResolver, ViewContainerRef, EventEmitter} from '@angular/core';

import {Toast, ClickHandler} from './toast';

@Component({
  selector: '[toastComp]',
  template: `
        <div *ngIf="toast.showCloseButton" (click)="click(toast)" [innerHTML]="toast.closeHtml"></div>
        <i class="toaster-icon" [ngClass]="iconClass"></i>
        <div [ngClass]="toast.toasterConfig.titleClass">{{toast.title}}</div>
        <div [ngClass]="toast.toasterConfig.messageClass">
            <div>{{toast.body}}</div>
        </div>`,
  outputs: ['clickEvent']
})

export class ToastComponent {

  @Input() toast: Toast;
  @Input() iconClass: string;
  @ViewChild('componentBody', { read: ViewContainerRef }) componentBody: ViewContainerRef;

  public clickEvent = new EventEmitter();

  constructor(private resolver: ComponentResolver) { }

  click(toast: Toast) {
    this.clickEvent.emit({
      value: { toast: toast, isCloseButton: true }
    });
  }
}