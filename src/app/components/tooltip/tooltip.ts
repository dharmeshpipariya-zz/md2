import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'tooltip',
    template: './app/components/tooltip/tooltip.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
    /* Specify styling for tooltip contents */
    .tooltip.customClass .tooltip-inner {
        color: #880000;
        background-color: #ffff66;
        box-shadow: 0 6px 12px rgba(0,0,0,.175);
    }
    /* Hide arrow */
    .tooltip.customClass .tooltip-arrow {
        display: none;
    }
  `]
})
export class Tooltip {
    public dynamicTooltip: string = 'Hello, World!';
    public dynamicTooltipText: string = 'dynamic';
    public htmlTooltip: string = 'I\'ve been made <b>bold</b>!';
}
