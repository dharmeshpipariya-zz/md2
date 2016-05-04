import {Component} from 'angular2/core';

import {Md2Collapse} from '../../../components/collapse/collapse';

@Component({
    selector: 'collapse',
    templateUrl: './app/components/collapse/collapse.html',
    directives: [Md2Collapse]
})
export class Collapse {
    public isCollapsedContent: boolean = false;
    public isCollapsedImage: boolean = true;
}