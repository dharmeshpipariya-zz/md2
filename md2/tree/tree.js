var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export var Md2Tree = (function () {
    function Md2Tree() {
        this.value = [];
    }
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], Md2Tree.prototype, "value", void 0);
    Md2Tree = __decorate([
        Component({selector: 'md2-tree',
            template: "<md2-tree-item *ngFor=\"let v of value\" [value]=\"v\"></md2-tree-item> ",
            styles: [" /*# sourceMappingURL=tree.css.map */ "],
            host: {
                'role': 'tree',
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Md2Tree);
    return Md2Tree;
}());
export var Md2TreeItem = (function () {
    function Md2TreeItem() {
        this._isExpanded = false;
        this.value = null;
    }
    Object.defineProperty(Md2TreeItem.prototype, "isExpanded", {
        get: function () { return this._isExpanded; },
        enumerable: true,
        configurable: true
    });
    Md2TreeItem.prototype._handleClick = function (event) {
        this._isExpanded = !this._isExpanded;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2TreeItem.prototype, "value", void 0);
    Md2TreeItem = __decorate([
        Component({selector: 'md2-tree-item',
            template: "<div class=\"md2-tree-item\" (click)=\"_handleClick()\"> <span>icon</span> <span>{{ value.value }}</span> <ng-content></ng-content> </div> <md2-tree *ngIf=\"value.children\" [value]=\"value.children\"></md2-tree> ",
            styles: [" /*# sourceMappingURL=tree.css.map */ "],
            host: {
                'role': 'tree-item',
                '[class.md2-tree-expanded]': 'isExpanded',
                '(click)': '_handleClick($event)'
            },
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], Md2TreeItem);
    return Md2TreeItem;
}());
export var Md2TreeModule = (function () {
    function Md2TreeModule() {
    }
    Md2TreeModule.forRoot = function () {
        return {
            ngModule: Md2TreeModule,
            providers: []
        };
    };
    Md2TreeModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Md2Tree, Md2TreeItem],
            declarations: [Md2Tree, Md2TreeItem]
        }), 
        __metadata('design:paramtypes', [])
    ], Md2TreeModule);
    return Md2TreeModule;
}());
//# sourceMappingURL=tree.js.map