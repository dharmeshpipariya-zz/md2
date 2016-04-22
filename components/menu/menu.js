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
var core_1 = require("angular2/core");
var Md2Menu = (function () {
    function Md2Menu(element) {
        this.element = element;
        this.isVisible = false;
    }
    Md2Menu.prototype.ngOnInit = function () {
        this.clickHandler = this.getClickHandler(this);
        document.addEventListener('click', this.clickHandler);
    };
    Md2Menu.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.clickHandler);
        this.clickHandler = null;
    };
    Md2Menu.prototype.getClickHandler = function (context) {
        return function (e) {
            if (e.target && e.target.className && e.target.className.indexOf('md2-menu') >= 0) {
                return;
            }
            if (context.element.nativeElement.contains(e.srcElement)
                && e.srcElement && e.srcElement.className &&
                e.srcElement.className.indexOf('md2-menu') >= 0) {
                return;
            }
            context.isVisible = false;
        };
    };
    Md2Menu.prototype.toggleMenu = function () {
        this.isVisible = !this.isVisible;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Md2Menu.prototype, "menuLabel", void 0);
    Md2Menu = __decorate([
        core_1.Component({
            selector: "md2-menu",
            template: "\n    <div class=\"md2-menu\" [class.open]=\"isVisible\">\n        <button class=\"md2-menu-button\" type=\"button\" (click)=\"toggleMenu()\"><span class=\"md2-menu-label\" [innerHtml]=\"menuLabel\"></span></button>\n        <div class=\"md2-menu-content\">\n            <ng-content></ng-content>\n        </div>\n    </div>",
            styles: ["\n    .md2-menu { position: relative; }\n    .md2-menu .md2-menu-button { border-radius: 3px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: currentColor; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; position: relative; outline: 0; border: 0; display: inline-block; padding: 0 6px; line-height: 36px; min-height: 36px; background: 0 0; white-space: nowrap; min-width: 88px; font-weight: 500; font-size: 14px; font-style: inherit; font-variant: inherit; font-family: inherit; text-decoration: none; cursor: pointer; overflow: hidden; }\n    .md2-menu .md2-menu-content { position: absolute; top: 0; left: 0; display: inline-block; background: #fff; list-style: none; min-width: 100px; max-height: 304px; overflow-y: auto; padding: 8px 0; margin: 0; -moz-transform: scale(0); -ms-transform: scale(0); -o-transform: scale(0); -webkit-transform: scale(0); transform: scale(0); -moz-transform-origin: left top; -ms-transform-origin: left top; -o-transform-origin: left top; -webkit-transform-origin: left top; transform-origin: left top; -moz-transition: all .4s linear; -o-transition: all .4s linear; -webkit-transition: all .4s linear; transition: all .4s linear; -moz-transition-duration: 0.2s; -o-transition-duration: 0.2s; -webkit-transition-duration: 0.2s; transition-duration: 0.2s; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12); z-index: 1; border-radius: 2px; }\n    .md2-menu.open .md2-menu-content { -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }\n    .md2-menu .md2-menu-item { position: relative; display: block; padding: 0 1rem; line-height: 36px; cursor: pointer; }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Md2Menu);
    return Md2Menu;
}());
exports.Md2Menu = Md2Menu;
//# sourceMappingURL=menu.js.map