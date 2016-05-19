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
const collapse_1 = require('../../../components/collapse/collapse');
let Collapse = class Collapse {
    constructor() {
        this.isCollapsedContent = false;
        this.isCollapsedImage = true;
    }
};
Collapse = __decorate([
    core_1.Component({
        selector: 'collapse',
        templateUrl: './app/components/collapse/collapse.html',
        styles: [`
        .collapse {
    display: none;
}

.collapse.in {
    display: block;
}

.collapsing {
    position: relative;
    height: 0;
    overflow: hidden;
    -webkit-transition-timing-function: ease;
    -o-transition-timing-function: ease;
    transition-timing-function: ease;
    -webkit-transition-duration: .35s;
    -o-transition-duration: .35s;
    transition-duration: .35s;
    -webkit-transition-property: height, visibility;
    -o-transition-property: height, visibility;
    transition-property: height, visibility;
}
    `],
        directives: [collapse_1.Md2Collapse]
    }), 
    __metadata('design:paramtypes', [])
], Collapse);
exports.Collapse = Collapse;

//# sourceMappingURL=collapse.js.map
