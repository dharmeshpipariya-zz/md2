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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var Md2Dialog = (function () {
    function Md2Dialog(el) {
        this.displayed = false;
        this.closeOnUnfocus = true;
        this.closeButton = true;
        this.dialogTitle = '';
        this._el = el.nativeElement;
    }
    Md2Dialog.prototype.clickElement = function (e) {
        if (this.closeOnUnfocus) {
            if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog') {
                this.show(false);
            }
        }
    };
    Md2Dialog.prototype.getElement = function () {
        return this._el;
    };
    Md2Dialog.prototype.hide = function () {
        return this.show(false);
    };
    Md2Dialog.prototype.show = function (isDisplayed) {
        var _this = this;
        var body = document.body;
        if (isDisplayed === undefined) {
            this.displayed = !this.displayed;
        }
        else {
            this.displayed = isDisplayed;
        }
        if (this.displayed) {
            body.classList.add('modal-open');
        }
        else {
            body.classList.remove('modal-open');
            if (this.closeOnUnfocus) {
                this._el.childNodes[0].removeEventListener('click', function (e) {
                    if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog') {
                        _this.show(false);
                    }
                });
            }
        }
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Md2Dialog.prototype, "closeOnUnfocus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Md2Dialog.prototype, "closeButton", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Md2Dialog.prototype, "dialogTitle", void 0);
    Md2Dialog = __decorate([
        core_1.Component({
            selector: 'md2-dialog',
            template: "\n    <div class=\"modal\" [ngClass]=\"{customFadeIn: displayed}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" [style.display]=\"displayed ? 'block' : 'none'\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button *ngIf=\"closeButton\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"show(false)\">\n                    <span aria-hidden=\"true\">&#215;</span>\n                    <span class=\"sr-only\">Close</span>\n                </button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">{{modalTitle}}</h4>\n            </div>\n            <ng-content></ng-content>\n        </div>\n    </div>\n</div>\n<div class=\"modal-backdrop\" [ngClass]=\"{fade: displayed, in: displayed}\" [style.display]=\"displayed ? 'block' : 'none'\"></div>\n    ",
            styles: [""],
            host: {
                '(click)': 'clickElement($event)'
            },
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Md2Dialog);
    return Md2Dialog;
}());
exports.Md2Dialog = Md2Dialog;
//# sourceMappingURL=dialog.js.map