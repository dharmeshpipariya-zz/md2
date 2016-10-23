var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Directive, Renderer, ElementRef } from '@angular/core';
/** Selector that matches all elements that may have style collisions with material1. */
export var ELEMENTS_SELECTOR = "\n  md2-accordion,\n  md2-autocomplete,\n  md2-chips,\n  md2-collapse,\n  md2-colorpicker,\n  md2-data-table,\n  md2-datepicker,\n  md2-dialog,\n  md2-menu,\n  md2-multiselect,\n  md2-select,\n  md2-tabs,\n  md2-tags,\n  md2-toast,\n  md2-tooltip\n";
/**
 * Directive to apply to all material2 components that use the same element name as a
 * component in material2. It does two things:
 * 1) Adds the css class "md2" to the host element so that material1 can use this class with a
 *    :not() in order to avoid affecting material2 elements.
 * 2) Adds a css class to the element that is identical to the element's tag. E.g., the element
 *    `<md-card>` would be given a css class `md-card`. This is done so that material2 can style
 *    only these classes instead of defining element rules that would affect material1 components.
 */
export var StyleCompatibility = (function () {
    function StyleCompatibility(renderer, elementRef) {
        var element = elementRef.nativeElement;
        renderer.setElementClass(element, 'md2', true);
        renderer.setElementClass(element, element.nodeName.toLowerCase(), true);
    }
    StyleCompatibility = __decorate([
        Directive({
            selector: ELEMENTS_SELECTOR,
        }), 
        __metadata('design:paramtypes', [Renderer, ElementRef])
    ], StyleCompatibility);
    return StyleCompatibility;
}());
export var StyleCompatibilityModule = (function () {
    function StyleCompatibilityModule() {
    }
    StyleCompatibilityModule.forRoot = function () {
        return {
            ngModule: StyleCompatibilityModule,
            providers: [],
        };
    };
    StyleCompatibilityModule = __decorate([
        NgModule({
            declarations: [StyleCompatibility],
            exports: [StyleCompatibility],
        }), 
        __metadata('design:paramtypes', [])
    ], StyleCompatibilityModule);
    return StyleCompatibilityModule;
}());

//# sourceMappingURL=style-compatibility.js.map
