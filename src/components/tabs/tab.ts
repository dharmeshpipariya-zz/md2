import {Component, Input} from 'angular2/core';

@Component({
    selector: 'md2-tab',
    template: `
        <div class="md2-tab-content" [style.display]="active ? 'block' : 'none'" *ngIf="!removed">
            <ng-content></ng-content>
        </div>
    `
})
export class Md2Tab {

    @Input() header: string;

    @Input() active: boolean;

    @Input() disabled: boolean;

    @Input() removable: boolean;

    @Input() headerStyleClass: string;

    public hovered: boolean;

    public removed: boolean;
}