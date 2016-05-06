import {Component, ElementRef, Input, Output, EventEmitter, Query, QueryList, ViewEncapsulation} from 'angular2/core';
import {Md2Tab} from './tab';

@Component({
    selector: 'md2-tabs',
    template: `
        <ul class="md2-tabs-wrapper">
            <li *ngFor="let tab of tabs" [class]="tab.headerStyleClass" [class]="'md2-tab-item'" [class.active]="tab.active" [class.hover]="tab.hovered && !tab.disabled" [class.disabled]="tab.disabled"
                (mouseenter)="tab.hovered=true" (mouseleave)="tab.hovered=false" (click)="open($event,tab)" *ngIf="!tab.removed">
                <span>{{tab.header}}</span>
                <button *ngIf="tab.removable" type="button" class="close" aria-label="Close" (click)="remove($event,tab)">&times;</button>
            </li>
        </ul>
        <div class="md2-tabs-content-wrapper">
            <ng-content></ng-content>
        </div>
    `,
    styles: [``],
    host: {
        '[class]': 'styleClass',
        '[class.md2-tabs]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class Md2Tabs {

    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    tabs: Md2Tab[];

    constructor(private el: ElementRef, @Query(Md2Tab) tabs: QueryList<Md2Tab>) {
        tabs.changes.subscribe(_ => {
            this.tabs = tabs.toArray();
            let activeTab: Md2Tab = this.findActiveTab();
            if (!activeTab && this.tabs.length) {
                this.tabs[0].active = true;
            }
        });
    }

    open(event, tab: Md2Tab) {
        if (tab.disabled) {
            event.preventDefault();
            return;
        }

        if (!tab.active) {
            let activeTab: Md2Tab = this.findActiveTab();
            if (activeTab) {
                activeTab.active = false
            }
            tab.active = true;
            this.onChange.emit({ originalEvent: event, index: this.findTabIndex(tab) });
        }
        event.preventDefault();
    }

    remove(event, tab: Md2Tab) {
        if (tab.active) {
            tab.active = false;
            for (let i = 0; i < this.tabs.length; i++) {
                let tab = this.tabs[i];
                if (!tab.removed && !tab.disabled) {
                    tab.active = true;
                    break;
                }
            }
        }

        tab.removed = true;
        this.onRemove.emit({ originalEvent: event, index: this.findTabIndex(tab) });
        event.stopPropagation();
    }

    findActiveTab() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].active) {
                return this.tabs[i];
            }
        }
        return null;
    }

    findTabIndex(tab: Md2Tab) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }
}