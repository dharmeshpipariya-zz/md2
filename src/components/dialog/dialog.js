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
            if (e.srcElement.className == 'dialog open') {
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
            body.classList.add('dialog-open');
        }
        else {
            body.classList.remove('dialog-open');
            if (this.closeOnUnfocus) {
                this._el.childNodes[0].removeEventListener('click', function (e) {
                    if (e.srcElement.className == 'dialog open') {
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
            template: "\n    <div class=\"md2-dialog\" [class.open]=\"displayed\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myDialogLabel\" aria-hidden=\"true\" [style.display]=\"displayed ? 'block' : 'none'\">\n        <div class=\"md2-dialog-container\" role=\"document\">\n            <div class=\"md2-dialog-header\" *ngIf=\"dialogTitle\">\n                <button *ngIf=\"closeButton\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"show(false)\">&times;</button>\n                <h2 class=\"md2-dialog-title\" id=\"myDialogLabel\">{{dialogTitle}}</h2>\n            </div>\n            <ng-content></ng-content>\n        </div>\n    </div>\n    ",
            styles: ["\n    .md2-dialog { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; background-color: rgba(33, 33, 33, 0.48); display: none; overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch; outline: 0; }\n    .md2-dialog.open { display: block; }\n    .md2-dialog .md2-dialog-container { position: relative; width: auto; margin: 15px; background-color: #fff; -webkit-background-clip: padding-box; -moz-background-clip: padding-box; background-clip: padding-box; border-radius: 4px; outline: 0; -webkit-box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12); -webkit-transition: .3s; -o-transition: .3s; -moz-transition: .3s; transition: .3s; -webkit-transform: scale(0.1); -ms-transform: scale(0.1); -o-transform: scale(0.1); -moz-transform: scale(0.1); transform: scale(0.1); }\n    .md2-dialog.open .md2-dialog-container { -webkit-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -moz-transform: scale(1); transform: scale(1); }\n\n    @media (min-width: 768px) {\n        .md2-dialog .md2-dialog-container { width: 600px; margin: 30px auto; }\n    }\n\n    .md2-dialog-header { background: #2196f3; padding: 1rem; border-bottom: 1px solid #e5e5e5; }\n    .md2-dialog-header .close { position: relative;display: inline-block;width: 18px;height: 18px;margin-top: 4px;overflow: hidden;-webkit-appearance: none; padding: 0; cursor: pointer; background: 0 0; border: 0; float: right; opacity: 0.8; }\n    .md2-dialog-header .close::before,\n    .md2-dialog-header .close::after {content: '';position: absolute;height: 2px;width: 100%;top: 50%;left: 0;margin-top: -1px;background: #fff;border-radius: 2px;height: 2px;}\n    .md2-dialog-header .close::before {-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}\n    .md2-dialog-header .close::after {-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}\n    .md2-dialog-header .close:hover { opacity: 1; }\n    .md2-dialog-header .md2-dialog-title { margin: 0; color: #fff; }\n    .md2-dialog-body { position: relative; padding: 1rem; }\n    .md2-dialog-footer { padding: 1rem; text-align: right; border-top: 1px solid rgba(0,0,0,0.12); }\n"],
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