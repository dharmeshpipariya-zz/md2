import {Component} from 'angular2/core';

//import {Md2Collapse} from '../../../components/collapse/collapse';

@Component({
    selector: 'accordion',
    templateUrl: './app/components/accordion/accordion.html',
    //directives: [Md2Collapse]
})
export class Accordion {
    public oneAtATime: boolean = true;
    public items: Array<string> = ['Item 1', 'Item 2', 'Item 3'];

    public status: Object = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    public groups: Array<any> = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    public addItem(): void {
        this.items.push(`Items ${this.items.length + 1}`);
    }
}