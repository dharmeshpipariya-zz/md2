import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HTTP_PROVIDERS} from 'angular2/http';

import { Accordion } from './components/accordion/accordion';
import { Autocomplete } from './components/autocomplete/autocomplete';
import { Collapse } from './components/collapse/collapse';
import { Dialog } from './components/dialog/dialog';
import { Menu } from './components/menu/menu';
import { Multiselect } from './components/multiselect/multiselect';
import { Select } from './components/select/select';
import { Switch } from './components/switch/switch';
import { Tabs } from './components/tabs/tabs';

@Component({
    selector: 'md2-app',
    templateUrl: './app/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})
@RouteConfig([
    {
        path: '/Accordion',
        name: 'Accordion',
        component: Accordion
    },
    {
        path: '/Autocomplete',
        name: 'Autocomplete',
        component: Autocomplete
    },
    {
        path: '/',
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
        path: '/Multiselect',
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
    },
    {
        path: '/Tabs',
        name: 'Tabs',
        component: Tabs
    }
])
export class AppComponent { }