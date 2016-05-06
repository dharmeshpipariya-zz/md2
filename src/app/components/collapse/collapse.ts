import {Component} from 'angular2/core';

import {Md2Collapse} from '../../../components/collapse/collapse';

@Component({
    selector: 'collapse',
    templateUrl: './app/components/collapse/collapse.html',
    styles: [`
        .collapse {
    display: none;
}

.collapse.in {
    display: block;
}

.collapsing {
    position: relative;
    height: 0;
    overflow: hidden;
    -webkit-transition-timing-function: ease;
    -o-transition-timing-function: ease;
    transition-timing-function: ease;
    -webkit-transition-duration: .35s;
    -o-transition-duration: .35s;
    transition-duration: .35s;
    -webkit-transition-property: height, visibility;
    -o-transition-property: height, visibility;
    transition-property: height, visibility;
}
    `],
    directives: [Md2Collapse]
})
export class Collapse {
    public isCollapsedContent: boolean = false;
    public isCollapsedImage: boolean = true;
}