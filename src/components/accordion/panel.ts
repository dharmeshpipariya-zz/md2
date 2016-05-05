import {Component, OnInit, OnDestroy, Input, ViewEncapsulation, Inject} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Md2Collapse} from '../collapse/collapse';
import {Md2Accordion} from './accordion';

@Component({
    selector: 'md2-panel',
    template: `
    <div class="panel" [ngClass]="panelClass">
      <div class="panel-heading" (click)="toggleOpen($event)">
        <h4 class="panel-title">
          <a href tabindex="0" class="accordion-toggle">
            <span *ngIf="heading" [ngClass]="{'text-muted': isDisabled}">{{heading}}</span>
            <ng-content select="[accordion-heading]"></ng-content>
          </a>
        </h4>
      </div>
      <div class="panel-collapse collapse" [collapse]="!isOpen">
        <div class="panel-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
    directives: [Md2Collapse, NgClass],
    host: {
        '[class.md2-panel]': 'true',
        '[class.open]': '_isOpen'
    },
    encapsulation: ViewEncapsulation.None

})
export class Md2Panel implements OnInit, OnDestroy {

    @Input() heading: string;
    @Input() panelClass: string;
    @Input() isDisabled: boolean;

    @Input() get isOpen(): boolean {
        return this._isOpen;
    }
    set isOpen(value: boolean) {
        this._isOpen = value;
        if (value) {
            this.accordion.closeOtherPanels(this);
        }
    }

    _isOpen: boolean;

    accordion: Md2Accordion;

    constructor( @Inject(Md2Accordion) accordion: Md2Accordion) {
        this.accordion = accordion;
    }

    ngOnInit(): any {
        this.panelClass = this.panelClass || 'panel-default';
        this.accordion.addPanel(this);
    }

    ngOnDestroy(): any {
        this.accordion.removePanel(this);
    }

    toggleOpen(event: MouseEvent): any {
        event.preventDefault();
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
}
