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
var nextId = 0;
var MD2_SWITCH_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Md2Switch; }),
    multi: true
});
var TransitionCheckState;
(function (TransitionCheckState) {
    TransitionCheckState[TransitionCheckState["Init"] = 0] = "Init";
    TransitionCheckState[TransitionCheckState["Checked"] = 1] = "Checked";
    TransitionCheckState[TransitionCheckState["Unchecked"] = 2] = "Unchecked";
    TransitionCheckState[TransitionCheckState["Indeterminate"] = 3] = "Indeterminate";
})(TransitionCheckState || (TransitionCheckState = {}));
var Md2Switch = (function () {
    function Md2Switch() {
        this.ariaLabel = '';
        this.id = "md-switch-" + ++nextId;
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
            template: "\n        <div class=\"md2-switch-layout\">\n            <div class=\"md2-switch-container\">\n                <div class=\"md2-switch-bar\"></div>\n                <div class=\"md2-switch-thumb-container\">\n                    <div class=\"md2-switch-thumb\"></div>\n                </div>\n            </div>\n            <label [id]=\"labelId\">\n                <ng-content></ng-content>\n            </label>\n        </div>\n    ",
            styles: ["\n        .md2-switch-layout { margin: 16px; margin-left: inherit; white-space: nowrap; cursor: pointer; outline: 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; min-height: 30px; line-height: 28px; -webkit-align-items: center; -ms-flex-align: center; align-items: center; display: -webkit-flex; display: -ms-flexbox; display: flex; }\n        .md2-switch-layout label { border-color: transparent; border-width: 0; cursor: pointer; float: left; word-wrap: break-word; max-width: 100%; white-space: normal; line-height: normal; }\n        .md-switch:focus { outline: none; }\n        .md-switch .md2-switch-container { display: inline-block; cursor: pointer; width: 36px; min-width: 36px; height: 24px; position: relative; user-select: none; margin-right: 8px; }\n        .md-switch.md-switch-disabled .md2-switch-container { cursor: not-allowed; }\n        .md-switch.md-switch-disabled .md2-switch-bar { background-color: rgba(0, 0, 0, 0.12); }\n        .md-switch.md-switch-disabled .md2-switch-thumb { background-color: #bdbdbd; }\n        .md-switch .md2-switch-bar { left: 1px; width: 34px; top: 5px; height: 14px; border-radius: 8px; position: absolute; background-color: #9e9e9e; }\n        .md-switch.md-switch-checked .md2-switch-bar { background-color: rgba(33, 150, 243, 0.5); }\n        .md-switch.md-switch-checked .md2-switch-thumb-container { transform: translate3d(100%, 0, 0); }\n        .md-switch.md-switch-checked .md2-switch-thumb { background-color: #2196f3; }\n        .md-switch .md2-switch-thumb-container { top: 2px; left: 0; width: 16px; position: absolute; transform: translate3d(0, 0, 0); z-index: 1; }\n        .md-switch .md2-switch-thumb { position: absolute; margin: 0; left: 0; top: 0; outline: none; height: 20px; width: 20px; border-radius: 50%; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); background-color: #fafafa; }\n        .md-switch:not(.md-switch-dragging) .md2-switch-bar { transition-delay: 0.05s; transition: all 0.08s linear; transition-property: transform, background-color; }\n        .md-switch:not(.md-switch-dragging) .md2-switch-thumb { transition-delay: 0.05s; transition: all 0.08s linear; transition-property: transform, background-color; }\n        .md-switch:not(.md-switch-dragging) .md2-switch-thumb-container { transition: all 0.08s linear; transition-property: transform, background-color; }\n    "],
            host: {
                'role': 'checkbox',
                '[id]': 'id',
                '[class.md2-switch]': 'true',
                '[class.md2-switch-indeterminate]': 'indeterminate',
                '[class.md2-switch-checked]': 'checked',
                '[class.md2-switch-disabled]': 'disabled',
                '[tabindex]': 'disabled ? -1 : tabindex',
                '[attr.aria-label]': 'ariaLabel',
                '[attr.aria-labelledby]': 'labelId',
                '[attr.aria-checked]': 'getAriaChecked()',
                '[attr.aria-disabled]': 'disabled',
                '(click)': 'onInteractionEvent($event)',
                '(keyup.space)': 'onInteractionEvent($event)',
                '(blur)': 'onTouched()'
            },
            providers: [MD2_SWITCH_CONTROL_VALUE_ACCESSOR],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], Md2Switch);
    return Md2Switch;
}());
exports.Md2Switch = Md2Switch;
//# sourceMappingURL=switch.js.map