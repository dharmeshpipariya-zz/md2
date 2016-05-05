import { Component, Input, ViewEncapsulation} from 'angular2/core';

import {Md2Panel} from './panel';

@Component({
    selector: 'md2-accordion',
    template: `<ng-content></ng-content>`,
    host: {
        '[class.md2-accordion]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})

export class Md2Accordion {

    @Input() closeOthers: boolean = false;

    private panels: Array<Md2Panel> = [];

    public closeOtherPanels(openPanel: Md2Panel): void {
        if (!this.closeOthers) {
            return;
        }
        this.panels.forEach((panel: Md2Panel) => {
            if (panel !== openPanel) {
                panel.isOpen = false;
            }
        });
    }

    public addPanel(panel: Md2Panel): void {
        this.panels.push(panel);
    }

    public removePanel(panel: Md2Panel): void {
        let index = this.panels.indexOf(panel);
        if (index !== -1) {
            this.panels.splice(index, 1);
        }
    }
}