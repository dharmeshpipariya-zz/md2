import {Component} from 'angular2/core';
import {Md2Switch} from '../../../components/switch/switch';

@Component({
    selector: 'switch',
    templateUrl: './app/components/switch/switch.html',
    directives: [Md2Switch]
})
export class Switch {
    disabled: boolean = false;
    switchState: boolean = true;
}
