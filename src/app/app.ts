import {Component, OnInit} from "@angular/core";
import {RouteConfig, RouterLink, ROUTER_DIRECTIVES} from "@angular/router-deprecated";

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
  selector: "md2-app",
  templateUrl: "./app/app.html",
  directives: [Accordion, Autocomplete, Collapse, Dialog, Menu, Multiselect, Select, Switch, Tabs, RouterLink, ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/', name: 'Accordion', component: Accordion },
  { path: '/Autocomplete', name: 'Autocomplete', component: Autocomplete },
  { path: '/Collapse', name: 'Collapse', component: Collapse },
  { path: '/Dialog', name: 'Dialog', component: Dialog },
  { path: '/Menu', name: 'Menu', component: Menu },
  { path: '/Multiselect', name: 'Multiselect', component: Multiselect },
  { path: '/Select', name: 'Select', component: Select },
  { path: '/Switch', name: 'Switch', component: Switch },
  { path: '/Tabs', name: 'Tabs', component: Tabs }
])
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log("Application component initialized ...");
  }
}