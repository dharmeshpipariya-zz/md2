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
let Md2SelectDispatcher = class Md2SelectDispatcher {
    constructor() {
        this._listeners = [];
    }
    notify(id, name) {
        for (let listener of this._listeners) {
            listener(id, name);
        }
    }
    listen(listener) {
        this._listeners.push(listener);
    }
};
Md2SelectDispatcher = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], Md2SelectDispatcher);
exports.Md2SelectDispatcher = Md2SelectDispatcher;

//# sourceMappingURL=select_dispatcher.js.map
