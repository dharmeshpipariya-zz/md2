var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
export var Md2Slide = (function () {
    function Md2Slide(_element) {
        var _this = this;
        this._element = _element;
        this.slideChange = new EventEmitter();
        this.mouseMoveListener = function (event) { _this._handleMousemove(event); };
        this.mouseUpListener = function (event) { _this._handleMouseup(event); };
    }
    Md2Slide.prototype._handleMousedown = function (event) {
        this._emitChangeEvent(event);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
    };
    Md2Slide.prototype._handleMousemove = function (event) {
        event.preventDefault();
        this._emitChangeEvent(event);
    };
    Md2Slide.prototype._handleMouseup = function (event) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
    };
    Md2Slide.prototype._emitChangeEvent = function (event) {
        var trigger = this._element.nativeElement;
        var triggerRect = trigger.getBoundingClientRect();
        var width = trigger.offsetWidth;
        var height = trigger.offsetHeight;
        var x = Math.max(0, Math.min((event.pageX !== undefined ? event.pageX : event.touches[0].pageX)
            - triggerRect.left - window.pageXOffset, width));
        var y = Math.max(0, Math.min((event.pageY !== undefined ? event.pageY : event.touches[0].pageY)
            - triggerRect.top - window.pageYOffset, height));
        this.slideChange.emit({
            e: event,
            height: height,
            width: width,
            x: x,
            y: y
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], Md2Slide.prototype, "slide", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Slide.prototype, "slideChange", void 0);
    Md2Slide = __decorate([
        Directive({
            selector: '[slide]',
            host: {
                '(mousedown)': '_handleMousedown($event)',
                '(touchstart)': '_handleMousedown($event)'
            }
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], Md2Slide);
    return Md2Slide;
}());
//# sourceMappingURL=slide.js.map