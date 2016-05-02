import {Component} from 'angular2/core';
import {Md2Select} from '../../../components/select/select';

@Component({
    selector: 'selectcomp',
    templateUrl: './app/components/select/select.html',
    directives: [Md2Select]
})
export class Select { }
