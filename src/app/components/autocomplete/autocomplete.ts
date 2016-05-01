import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Md2Switch} from '../../../components/switch/switch';

@Component({
    selector: 'autocomplete',
    templateUrl: './app/components/autocomplete/autocomplete.html',
    directives: [Md2Switch]
})
export class Autocomplete {
    disabled:boolean=false;
    switchState:boolean=true;
 }
