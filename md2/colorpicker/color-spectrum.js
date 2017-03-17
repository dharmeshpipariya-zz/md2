var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ColorLocale, Hsva } from './color-locale';
export var Md2ColorSpectrum = (function () {
    function Md2ColorSpectrum(_locale) {
        this._locale = _locale;
        this.colorChange = new EventEmitter();
    }
    Object.defineProperty(Md2ColorSpectrum.prototype, "color", {
        get: function () { return this._color; },
        set: function (value) {
            if (this._color !== value) {
                this._color = value || this._locale.defaultValue;
                this.hsva = this._locale.stringToHsva(this.color);
                this.update(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2ColorSpectrum.prototype, "saturation", {
        get: function () {
            return {
                'left': this.hsva.s * 100 + "%",
                'top': (100 - this.hsva.v * 100) + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2ColorSpectrum.prototype, "hue", {
        get: function () {
            return {
                'left': this.hsva.h * 100 + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2ColorSpectrum.prototype, "alpha", {
        get: function () {
            return {
                'background': "linear-gradient(to right, transparent, " + this._alpha + ")"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2ColorSpectrum.prototype, "alphaPointer", {
        get: function () {
            return {
                'left': this.hsva.a * 100 + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    Md2ColorSpectrum.prototype._setSaturation = function (event) {
        this.hsva.s = event.x / event.width;
        this.hsva.v = 1 - event.y / event.height;
        this.update(true);
    };
    Md2ColorSpectrum.prototype._setHue = function (event) {
        this.hsva.h = event.x / event.width;
        this.update(true);
    };
    Md2ColorSpectrum.prototype._setAlpha = function (event) {
        this.hsva.a = event.x / event.width;
        this.update(true);
    };
    Md2ColorSpectrum.prototype.update = function (isInitialized) {
        var rgba = this._locale.denormalizeRGBA(this._locale.hsvaToRgba(this.hsva));
        var hueRgba = this._locale.denormalizeRGBA(this._locale.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));
        this._alpha = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this._hue = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        this._color = this._locale.outputFormat(this.hsva, this._locale.format);
        if (isInitialized) {
            this._emitChangeEvent();
        }
    };
    /** Emits an event when the user selects a color. */
    Md2ColorSpectrum.prototype._emitChangeEvent = function () {
        this.colorChange.emit(this.color);
    };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2ColorSpectrum.prototype, "colorChange", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2ColorSpectrum.prototype, "color", null);
    Md2ColorSpectrum = __decorate([
        Component({selector: 'md2-color-spectrum',
            template: "<div class=\"md2-color-saturation\" [style.background-color]=\"_hue\" slide (slideChange)=\"_setSaturation($event)\"> <span [ngStyle]=\"saturation\" class=\"pointer\"></span> </div> <div class=\"md2-color-hue\" slide (slideChange)=\"_setHue($event)\"> <span [ngStyle]=\"hue\" class=\"pointer\"></span> </div> <div class=\"md2-color-alpha\" slide (slideChange)=\"_setAlpha($event)\"> <span [ngStyle]=\"alpha\" class=\"alpha-gradient\"></span> <span [ngStyle]=\"alphaPointer\" class=\"pointer\"></span> </div> ",
            styles: ["md2-colorpicker { position: relative; display: block; outline: none; -webkit-backface-visibility: hidden; backface-visibility: hidden; } md2-colorpicker.md2-colorpicker-disabled { pointer-events: none; cursor: default; } .md2-colorpicker-trigger { display: flex; margin: 18px 0; cursor: pointer; } .md2-colorpicker-preview { position: relative; display: inline-block; width: 24px; height: 24px; margin-right: 8px; border: 2px solid white; border-radius: 50%; overflow: hidden; background-color: white; background-image: linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd); background-size: 12px 12px; background-position: 0 0, 6px 6px; box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084); } .md2-colorpicker-preview span { display: block; width: 100%; height: 100%; } .md2-colorpicker-input { position: relative; display: flex; flex: 1; color: rgba(0, 0, 0, 0.38); justify-content: space-between; align-items: center; height: 30px; line-height: 22px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; } .md2-colorpicker-disabled .md2-colorpicker-input { color: rgba(0, 0, 0, 0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; } md2-colorpicker:focus:not(.md2-colorpicker-disabled) .md2-colorpicker-input { color: #106cc8; border-color: #106cc8; } md2-colorpicker.ng-invalid.ng-touched:not(.md2-colorpicker-disabled) .md2-colorpicker-input { color: #f44336; border-color: #f44336; } .md2-colorpicker-placeholder { position: absolute; left: 0; padding: 0 2px; transform-origin: left top; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; } .md2-colorpicker-placeholder.md2-floating-placeholder { top: -16px; left: -2px; text-align: left; transform: scale(0.75); } [dir='rtl'] .md2-colorpicker-placeholder { transform-origin: right top; } [dir='rtl'] .md2-colorpicker-placeholder.md2-floating-placeholder { left: 2px; text-align: right; } [aria-required=true] .md2-colorpicker-placeholder::after { content: '*'; } .md2-colorpicker-value { position: relative; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-colorpicker-disabled .md2-colorpicker-value { color: rgba(0, 0, 0, 0.38); } .md2-colorpicker-clear { color: rgba(0, 0, 0, 0.54); } .md2-colorpicker-clear svg { fill: currentColor; } .md2-colorpicker-panel { max-width: 350px; border-radius: 3px; overflow: auto; -webkit-overflow-scrolling: touch; background: white; box-shadow: 0 0 3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); box-sizing: border-box; outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .md2-colorpicker-header { color: white; } .md2-colorpicker-header.dark { color: black; } .md2-colorpicker-header-input { font-size: 18px; font-weight: 700; text-align: center; line-height: 60px; } .md2-colorpicker-formats { display: flex; } .md2-colorpicker-formats span { flex: 1; padding: 8px 8px 6px; text-align: center; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; background: rgba(255, 255, 255, 0.25); box-sizing: border-box; } .dark .md2-colorpicker-formats span { background: rgba(0, 0, 0, 0.25); } .md2-colorpicker-formats span.active { cursor: default; background: transparent; border-color: rgba(255, 255, 255, 0.5); } .dark .md2-colorpicker-formats span.active { border-color: rgba(0, 0, 0, 0.5); } .md2-colorpicker-container { padding: 8px; } /* Spectrum */ md2-color-spectrum { display: block; } .md2-color-saturation { position: relative; width: 255px; height: 127.5px; border-radius: 3px; background: linear-gradient(to bottom, transparent, black), linear-gradient(to right, white, rgba(255, 255, 255, 0)); cursor: crosshair; } .md2-color-saturation .pointer { position: absolute; width: 16px; height: 16px; margin: -8px; border: 2px solid black; border-radius: 50%; box-sizing: border-box; } .md2-color-saturation .pointer::after { content: ''; position: absolute; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-sizing: border-box; } .md2-color-hue { position: relative; width: 255px; height: 30px; margin-top: 8px; border-radius: 3px; cursor: crosshair; background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00); } .md2-color-hue .pointer { position: absolute; top: -2px; bottom: -2px; margin-left: -3px; width: 6px; border: 2px solid black; border-radius: 2px; box-sizing: border-box; } .md2-color-alpha { position: relative; width: 255px; height: 30px; margin-top: 8px; border-radius: 3px; cursor: crosshair; background: linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd), linear-gradient(45deg, #ddd 25%, transparent 0, transparent 75%, #ddd 0, #ddd); background-size: 12px 12px, 12px 12px; background-position: 0 0, 6px 6px; } .md2-color-alpha .pointer { position: absolute; top: -2px; bottom: -2px; margin-left: -3px; width: 6px; border: 2px solid black; border-radius: 2px; box-sizing: border-box; } .md2-color-alpha .alpha-gradient { position: absolute; top: 0; right: 0; bottom: 0; left: 0; } /* Actions */ .md2-colorpicker-actions { text-align: right; } .md2-colorpicker-actions .md2-button { display: inline-block; min-width: 64px; margin: 4px 8px 8px 0; padding: 0 12px; font-size: 14px; color: #106cc8; line-height: 36px; text-align: center; text-transform: uppercase; border-radius: 2px; cursor: pointer; box-sizing: border-box; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1); } .md2-colorpicker-actions .md2-button:hover { background: #ebebeb; } /* Overlay */ .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-global-overlay-wrapper { display: flex; position: absolute; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } .cdk-overlay-dark-backdrop { background: rgba(0, 0, 0, 0.6); } /*# sourceMappingURL=colorpicker.css.map */ "],
            encapsulation: ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [ColorLocale])
    ], Md2ColorSpectrum);
    return Md2ColorSpectrum;
}());
//# sourceMappingURL=color-spectrum.js.map