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
var core_1 = require('@angular/core');
var TreeDemo = (function () {
    function TreeDemo() {
        this.tree = [
            {
                value: 'Node 1',
                children: [
                    { value: 'Child 1' },
                    { value: 'Child 2' },
                    { value: 'Child 3' }
                ]
            },
            {
                value: 'Node 2',
                children: [
                    { value: 'Child 11' },
                    { value: 'Child 12' },
                    { value: 'Child 13' }
                ]
            }
        ];
    }
    TreeDemo = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tree-demo',
            templateUrl: 'tree-demo.html'
        }), 
        __metadata('design:paramtypes', [])
    ], TreeDemo);
    return TreeDemo;
}());
exports.TreeDemo = TreeDemo;
//# sourceMappingURL=tree-demo.js.map