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
var control_value_accessor_1 = require('angular2/src/common/forms/directives/control_value_accessor');
var lang_1 = require('angular2/src/facade/lang');
var nextId = 0;
var MD_SWITCH_CONTROL_VALUE_ACCESSOR = lang_1.CONST_EXPR(new core_1.Provider(control_value_accessor_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Md2Switch; }),
    multi: true
}));
var TransitionCheckState;
(function (TransitionCheckState) {
    TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
    TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
    TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
    TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
})(TransitionCheckState || (TransitionCheckState = {}));
var Md2Switch = (function () {
    function Md2Switch(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.ariaLabel = '';
        this.id = "md-switch-" + ++nextId;
        this.align = 'start';
        this.disabled = false;
        this.tabindex = 0;
        this.change = new core_1.EventEmitter();
        this.onTouched = function () { };
        this._currentAnimationClass = '';
        this._currentCheckState = TransitionCheckState.Init;
        this._checked = false;
        this._indeterminate = false;
        this._changeSubscription = null;
    }
    Object.defineProperty(Md2Switch.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (checked) {
            this._indeterminate = false;
            this._checked = checked;
            this._transitionCheckState(this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            this.change.emit(this._checked);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Switch.prototype, "indeterminate", {
        get: function () {
            return this._indeterminate;
        },
        set: function (indeterminate) {
            this._indeterminate = indeterminate;
            if (this._indeterminate) {
                this._transitionCheckState(TransitionCheckState.Indeterminate);
            }
            else {
                this._transitionCheckState(this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Switch.prototype, "labelId", {
        get: function () {
            return this.id + "-label";
        },
        enumerable: true,
        configurable: true
    });
    Md2Switch.prototype.getAriaChecked = function () {
        if (this.indeterminate) {
            return 'mixed';
        }
        return this.checked ? 'true' : 'false';
    };
    Md2Switch.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    Md2Switch.prototype.onInteractionEvent = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        this.toggle();
    };
    Md2Switch.prototype.writeValue = function (value) {
        this.checked = !!value;
    };
    Md2Switch.prototype.registerOnChange = function (fn) {
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        this._changeSubscription = this.change.subscribe(fn);
    };
    Md2Switch.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    Md2Switch.prototype._transitionCheckState = function (newState) {
        var oldState = this._currentCheckState;
        var renderer = this._renderer;
        var elementRef = this._elementRef;
        if (oldState === newState) {
            return;
        }
        this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(oldState, newState);
        this._currentCheckState = newState;
    };
    Md2Switch.prototype._getAnimationClassForCheckStateTransition = function (oldState, newState) {
        var animSuffix;
        switch (oldState) {
            case TransitionCheckState.Init:
                return '';
            case TransitionCheckState.Unchecked:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'unchecked-checked' : 'unchecked-indeterminate';
                break;
            case TransitionCheckState.Checked:
                animSuffix = newState === TransitionCheckState.Unchecked ?
                    'checked-unchecked' : 'checked-indeterminate';
                break;
            case TransitionCheckState.Indeterminate:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'indeterminate-checked' : 'indeterminate-unchecked';
        }
        return "md-switch-anim-" + animSuffix;
    };
    __decorate([
        core_1.Input('aria-label'), 
        __metadata('design:type', String)
    ], Md2Switch.prototype, "ariaLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Md2Switch.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Md2Switch.prototype, "align", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Md2Switch.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Md2Switch.prototype, "tabindex", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Md2Switch.prototype, "change", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Md2Switch.prototype, "checked", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Md2Switch.prototype, "indeterminate", null);
    Md2Switch = __decorate([
        core_1.Component({
            selector: 'md2-switch',
            template: "<div class=\"md2-switch-container\">\n                <div class=\"md2-switch-bar\"></div>\n                <div class=\"md2-switch-thumb-container\">\n                  <div class=\"md2-switch-thumb\"></div>\n                </div>\n            </div>",
            styles: ["\n.md-switch:focus {\n  outline: none; }\n.md-switch .md2-switch-container {\n  cursor: pointer;\n  width: 36px;\n  height: 24px;\n  position: relative;\n  user-select: none;\n  margin-right: 8px; }\n.md-switch.md-switch-disabled .md2-switch-container {\n  cursor: not-allowed; }\n.md-switch.md-switch-disabled .md2-switch-bar {\n  background-color: rgba(0, 0, 0, 0.12); }\n.md-switch.md-switch-disabled .md2-switch-thumb {\n  background-color: #bdbdbd; }\n.md-switch .md2-switch-bar {\n  left: 1px;\n  width: 34px;\n  top: 5px;\n  height: 14px;\n  border-radius: 8px;\n  position: absolute;\n  background-color: #9e9e9e; }\n.md-switch.md-switch-checked .md2-switch-bar {\n  background-color: rgba(33, 150, 243, 0.5); }\n.md-switch.md-switch-checked .md2-switch-thumb-container {\n  transform: translate3d(100%, 0, 0); }\n.md-switch.md-switch-checked .md2-switch-thumb {\n  background-color: #2196f3; }\n.md-switch .md2-switch-thumb-container {\n  top: 2px;\n  left: 0;\n  width: 16px;\n  position: absolute;\n  transform: translate3d(0, 0, 0);\n  z-index: 1; }\n.md-switch .md2-switch-thumb {\n  position: absolute;\n  margin: 0;\n  left: 0;\n  top: 0;\n  outline: none;\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  background-color: #fafafa; }\n.md-switch:not(.md-switch-dragging) .md2-switch-bar {\n  transition-delay: 0.05s;\n  transition: all 0.08s linear;\n  transition-property: transform, background-color; }\n.md-switch:not(.md-switch-dragging) .md2-switch-thumb {\n  transition-delay: 0.05s;\n  transition: all 0.08s linear;\n  transition-property: transform, background-color; }\n.md-switch:not(.md-switch-dragging) .md2-switch-thumb-container {\n  transition: all 0.08s linear;\n  transition-property: transform, background-color; }\n    "],
            host: {
                'role': 'checkbox',
                '[id]': 'id',
                '[class.md-switch]': 'true',
                '[class.md-switch-indeterminate]': 'indeterminate',
                '[class.md-switch-checked]': 'checked',
                '[class.md-switch-disabled]': 'disabled',
                '[class.md-switch-align-end]': 'align == "end"',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-label]': 'ariaLabel',
                '[attr.aria-labelledby]': 'labelId',
                '[attr.aria-checked]': 'getAriaChecked()',
                '[attr.aria-disabled]': 'disabled',
                '(click)': 'onInteractionEvent($event)',
                '(keyup.space)': 'onInteractionEvent($event)',
                '(blur)': 'onTouched()'
            },
            providers: [MD_SWITCH_CONTROL_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], Md2Switch);
    return Md2Switch;
}());
exports.Md2Switch = Md2Switch;
//# sourceMappingURL=switch.js.map