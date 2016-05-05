import { Directive} from 'angular2/core';

@Directive({
    selector: '[collapse]',
    properties: ['collapse'],
    host: {
        '[class.in]': 'isExpanded',
        '[class.collapse]': '!isCollapsing',
        '[class.collapsing]': 'isCollapsing',
        '[attr.aria-expanded]': 'isExpanded',
        '[attr.aria-hidden]': '!isExpanded',
        '[style.height]': 'height'
    }
})

export class Md2Collapse {
    private height: string;
    private isExpanded: boolean = true;
    private isCollapsing: boolean = false;

    private get collapse(): boolean {
        return this.isExpanded;
    }

    private set collapse(value: boolean) {
        this.isExpanded = value;
        this.toggle();
    }

    toggle() {
        if (this.isExpanded) {
            this.hide();
        } else {
            this.show();
        }
    }

    hide() {
        this.isCollapsing = true;
        this.isExpanded = false;
        setTimeout(() => {
            this.height = '0';
            this.isCollapsing = false;
        }, 4);
    }

    show() {
        this.isCollapsing = true;
        this.isExpanded = true;
        setTimeout(() => {
            this.height = 'auto';
            this.isCollapsing = false;
        }, 4);
    }
}