import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HTTP_PROVIDERS} from 'angular2/http';

import { Autocomplete } from './components/autocomplete/autocomplete';
import { Dialog } from './components/dialog/dialog';
import { Menu } from './components/menu/menu';

@Component({
    selector: 'md2-app',
    templateUrl: './app/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})
@RouteConfig([
    {
        path: '/',
        name: 'Autocomplete',
        component: Autocomplete,
        useAsDefault: true
    },
    {
        path: '/Dialog',
        name: 'Dialog',
        component: Dialog,
    },
    {
        path: '/Menu',
        name: 'Menu',
        component: Menu,
    }
])
export class AppComponent { }