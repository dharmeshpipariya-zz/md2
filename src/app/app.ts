import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HTTP_PROVIDERS} from 'angular2/http';

import { Autocomplete } from './components/autocomplete/autocomplete';
import { Collapse } from './components/collapse/collapse';
import { Dialog } from './components/dialog/dialog';
import { Menu } from './components/menu/menu';
import { Multiselect } from './components/multiselect/multiselect';
import { Select } from './components/select/select';
import { Switch } from './components/switch/switch';

@Component({
    selector: 'md2-app',
    templateUrl: './app/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})
@RouteConfig([
    {
        path: '/Autocomplete',
        name: 'Autocomplete',
        component: Autocomplete
    },
    {
        path: '/Collapse',
        name: 'Collapse',
        component: Collapse,
        useAsDefault: true
    },
    {
        path: '/Dialog',
        name: 'Dialog',
        component: Dialog
    },
    {
        path: '/Menu',
        name: 'Menu',
        component: Menu
    },
    {
        path: '/',
        name: 'Multiselect',
        component: Multiselect
    },
    {
        path: '/Select',
        name: 'Select',
        component: Select
    },
    {
        path: '/Switch',
        name: 'Switch',
        component: Switch
    }
])
export class AppComponent { }