import {Component} from 'angular2/core';

import {Md2Tabs} from '../../../components/tabs/tabs';
import {Md2Tab} from '../../../components/tabs/tab';

@Component({
    selector: 'tabs',
    templateUrl: './app/components/tabs/tabs.html',
    directives: [Md2Tabs, Md2Tab]
})
export class Tabs {
    public tabs: Array<any> = [
        { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
        { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
        { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true }
    ];

    public alertMe(): void {
        setTimeout(function (): void {
            alert('You\'ve selected the alert tab!');
        });
    };

    public setActiveTab(index: number): void {
        this.tabs[index].active = true;
    };

    public removeTabHandler(/*tab:any*/): void {
        console.log('Remove Tab handler');
    };
}