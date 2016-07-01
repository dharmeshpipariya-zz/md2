"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
let Md2Collapse = class Md2Collapse {
    constructor() {
        this.isExpanded = true;
        this.isCollapsing = false;
    }
    get collapse() { return this.isExpanded; }
    set collapse(value) {
        this.isExpanded = value;
        this.toggle();
    }
    /**
     * toggle collapse
     */
    toggle() {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /**
     * hide collapse
     */
    hide() {
        this.isCollapsing = true;
        this.isExpanded = false;
        setTimeout(() => {
            this.isCollapsing = false;
        }, 4);
    }
    /**
     * show collapse
     */
    show() {
        this.isCollapsing = true;
        this.isExpanded = true;
        setTimeout(() => {
            this.isCollapsing = false;
        }, 4);
    }
};
Md2Collapse = __decorate([
    core_1.Directive({
        selector: '[collapse]',
        properties: ['collapse'],
        host: {
            '[class.in]': 'isExpanded',
            '[class.collapse]': 'true',
            '[class.collapsing]': 'isCollapsing',
            '[attr.aria-expanded]': 'isExpanded',
            '[attr.aria-hidden]': '!isExpanded',
        }
    }), 
    __metadata('design:paramtypes', [])
], Md2Collapse);
exports.Md2Collapse = Md2Collapse;

//# sourceMappingURL=collapse.js.map
