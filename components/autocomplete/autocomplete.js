"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var autocomplete_pipes_1 = require('./autocomplete-pipes');
var MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Md2Autocomplete; }),
    multi: true
});
var Md2Autocomplete = (function () {
    function Md2Autocomplete(element) {
        this.element = element;
        this.options = [];
        this.inputMode = false;
        this.isSuggestions = false;
        this.inputValue = '';
        this._items = [];
        this._disabled = false;
        this.placeholder = '';
        this.itemText = '';
        this.change = new core_1.EventEmitter();
        this.cleard = new core_1.EventEmitter();
        this.onTouched = function () { };
    }
    Object.defineProperty(Md2Autocomplete.prototype, "items", {
        set: function (value) {
            this._items = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "disabled", {
        set: function (value) {
            this._disabled = value;
            if (this._disabled === true) {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Autocomplete.prototype.focusToInput = function (value) {
        var _this = this;
        if (value === void 0) { value = ''; }
        setTimeout(function () {
            var el = _this.element.nativeElement.querySelector('div.md2-autocomplete-container input');
            if (el) {
                el.focus();
                el.value = value;
            }
        }, 0);
    };
    Md2Autocomplete.prototype.matchClick = function (e) {
        if (this._disabled === true) {
            return;
        }
        this.inputMode = !this.inputMode;
        if (this.inputMode === true) {
            this.focusToInput();
            this.open();
        }
    };
    Md2Autocomplete.prototype.open = function () {
        var _this = this;
        this.options = this._items.map(function (item) { return new AutocompleteItem(item, _this.itemText); });
        if (this.options.length > 0) {
            this.behavior.first();
        }
        this.isSuggestions = true;
    };
    Md2Autocomplete.prototype.ngOnInit = function () {
        if (this._items) {
            this.behavior = new GenericBehavior(this);
        }
        this.offSideClickHandler = this.getOffSideClickHandler(this);
        document.addEventListener('click', this.offSideClickHandler);
    };
    Md2Autocomplete.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.offSideClickHandler);
        this.offSideClickHandler = null;
    };
    Md2Autocomplete.prototype.getOffSideClickHandler = function (context) {
        return function (e) {
            if (e.target && e.target.nodeName === 'INPUT'
                && e.target.className && e.target.className.indexOf('md2-autocomplete') >= 0) {
                return;
            }
            if (context.element.nativeElement.contains(e.srcElement)
                && e.srcElement && e.srcElement.className &&
                e.srcElement.className.indexOf('md2-autocomplete') >= 0) {
                if (e.target.nodeName !== 'INPUT') {
                    context.matchClick(null);
                }
                return;
            }
            context.inputMode = false;
            context.isSuggestions = false;
        };
    };
    Md2Autocomplete.prototype.clear = function (item) {
        if (this._disabled === true) {
            return;
        }
        this.active.name = '';
        this.active.value = '';
    };
    Md2Autocomplete.prototype.doEvent = function (type, value) {
        if (this[type] && value) {
            this[type].next(value);
        }
    };
    Md2Autocomplete.prototype.hide = function () {
        this.inputMode = false;
        this.isSuggestions = false;
    };
    Md2Autocomplete.prototype.inputEvent = function (e, isUpMode) {
        if (isUpMode === void 0) { isUpMode = false; }
        if (e.keyCode === 9) {
            return;
        }
        if (isUpMode && (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 ||
            e.keyCode === 40 || e.keyCode === 13)) {
            e.preventDefault();
            return;
        }
        if (!isUpMode && e.keyCode === 27) {
            this.hide();
            this.element.nativeElement.children[0].focus();
            e.preventDefault();
            return;
        }
        if (!isUpMode && e.keyCode === 37 && this._items.length > 0) {
            this.behavior.first();
            e.preventDefault();
            return;
        }
        if (!isUpMode && e.keyCode === 39 && this._items.length > 0) {
            this.behavior.last();
            e.preventDefault();
            return;
        }
        if (!isUpMode && e.keyCode === 38) {
            this.behavior.prev();
            e.preventDefault();
            return;
        }
        if (!isUpMode && e.keyCode === 40) {
            this.behavior.next();
            e.preventDefault();
            return;
        }
        if (!isUpMode && e.keyCode === 13) {
            if (this.active !== this.activeOption) {
                this.selectActiveMatch();
                this.behavior.next();
            }
            e.preventDefault();
            return;
        }
        if (e.srcElement) {
            this.inputValue = e.srcElement.value;
            this.behavior.filter(new RegExp(this.inputValue, 'ig'));
        }
    };
    Md2Autocomplete.prototype.selectActiveMatch = function () {
        this.matchItem(this.activeOption);
    };
    Md2Autocomplete.prototype.matchItem = function (value, e) {
        if (e === void 0) { e = null; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (this.options.length <= 0) {
            return;
        }
        this.active = value;
        this.doEvent('change', value);
        this.hide();
        this.element.nativeElement.querySelector('.md2-autocomplete-container input').focus();
    };
    Md2Autocomplete.prototype.isActive = function (value) {
        return this.activeOption.name === value.name;
    };
    Md2Autocomplete.prototype.writeValue = function (value) {
        this.active = value;
    };
    Md2Autocomplete.prototype.registerOnChange = function (fn) {
        this.onTouched = fn;
    };
    Md2Autocomplete.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Md2Autocomplete.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Md2Autocomplete.prototype, "itemText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], Md2Autocomplete.prototype, "items", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], Md2Autocomplete.prototype, "disabled", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Md2Autocomplete.prototype, "change", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Md2Autocomplete.prototype, "cleard", void 0);
    Md2Autocomplete = __decorate([
        core_1.Component({
            selector: 'md2-autocomplete',
            pipes: [autocomplete_pipes_1.HightlightPipe],
            template: "\n    <div tabindex=\"0\" class=\"md2-autocomplete-container\" [class.disabled]=\"_disabled\">\n        <div class=\"md2-autocomplete-value\">\n            <input type=\"text\" autocomplete=\"false\" tabindex=\"0\" (click)=\"matchClick()\" (keydown)=\"inputEvent($event)\" (keyup)=\"inputEvent($event, true)\" [disabled]=\"_disabled\" class=\"md2-autocomplete-input\" [placeholder]=\"placeholder\">\n            <i *ngIf=\"active.length>0\" (click)=\"clear(activeOption)\" class=\"md2-autocomplete-icon-clear\"></i>\n        </div>\n        <ul *ngIf=\"isSuggestions && options && options.length > 0\" class=\"md2-autocomplete-suggestions\">\n            <li class=\"md2-item\" *ngFor=\"#o of options\" [class.active]=\"isActive(o)\" (click)=\"matchItem(o, $event)\">\n                <div class=\"md2-text\" [innerHtml]=\"o.name | hightlight:inputValue\"></div>\n            </li>\n        </ul>\n    </div>\n    ",
            styles: ["\n        .md2-autocomplete-container { position: relative; display: block; outline: none; }\n        .md2-autocomplete-container .md2-autocomplete-value { display: flex; width: 100%; outline: none; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }\n        .md2-autocomplete-container:focus .md2-autocomplete-value { padding-bottom: 0; border-bottom: 2px solid #106cc8; }\n        .md2-autocomplete-container.disabled .md2-autocomplete-value { color: rgba(0,0,0,0.38); }\n        .md2-autocomplete-container.disabled:focus .md2-autocomplete-value { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-input { width: 100%; height: 26px; outline: none; background: transparent; border: 0; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box;}\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear { position: relative; display: inline-block; width: 18px; height: 18px; margin: 0 4px; overflow: hidden; }\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::before,\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::after { content: ''; position: absolute; height: 2px; width: 100%; top: 50%; left: 0; margin-top: -1px; background: #888; border-radius: 2px; height: 2px; }\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::before { -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); transform: rotate(45deg); }\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::after { -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); }\n        .md2-autocomplete-container .md2-autocomplete-suggestions { position: absolute; left: 0; top: 100%; display: block; z-index: 10; padding: 0; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }\n        .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }\n        .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item:hover, .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item.active { background: #eeeeee; }\n        .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 1rem; }\n    "],
            providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Md2Autocomplete);
    return Md2Autocomplete;
}());
exports.Md2Autocomplete = Md2Autocomplete;
var AutocompleteItem = (function () {
    function AutocompleteItem(source, itemText) {
        if (typeof source === 'string') {
            this.value = this.name = source;
        }
        if (typeof source === 'object') {
            if (itemText) {
                this.value = source.value || source[itemText];
                this.name = source[itemText];
            }
            else {
                this.value = source.value || source.name;
                this.name = source.name;
            }
        }
    }
    return AutocompleteItem;
}());
var Behavior = (function () {
    function Behavior(actor) {
        this.actor = actor;
        this.optionsMap = new Map();
    }
    Behavior.prototype.getActiveIndex = function (optionsMap) {
        if (optionsMap === void 0) { optionsMap = null; }
        var ai = this.actor.options.indexOf(this.actor.activeOption);
        if (ai < 0 && optionsMap !== null) {
            ai = optionsMap.get(this.actor.activeOption.value);
        }
        return ai;
    };
    Behavior.prototype.ensureHighlightVisible = function (optionsMap) {
        if (optionsMap === void 0) { optionsMap = null; }
        var container = this.actor.element.nativeElement.querySelector('.md2-autocomplete-suggestions');
        if (!container) {
            return;
        }
        var choices = container.querySelectorAll('.md2-item');
        if (choices.length < 1) {
            return;
        }
        var activeIndex = this.getActiveIndex(optionsMap);
        if (activeIndex < 0) {
            return;
        }
        var highlighted = choices[activeIndex];
        if (!highlighted) {
            return;
        }
        var posY = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
        var height = container.offsetHeight;
        if (posY > height) {
            container.scrollTop += posY - height;
        }
        else if (posY < highlighted.clientHeight) {
            container.scrollTop -= highlighted.clientHeight - posY;
        }
    };
    return Behavior;
}());
var GenericBehavior = (function (_super) {
    __extends(GenericBehavior, _super);
    function GenericBehavior(actor) {
        _super.call(this, actor);
        this.actor = actor;
    }
    GenericBehavior.prototype.first = function () {
        this.actor.activeOption = this.actor.options[0];
        _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.last = function () {
        this.actor.activeOption = this.actor.options[this.actor.options.length - 1];
        _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.prev = function () {
        var index = this.actor.options.indexOf(this.actor.activeOption);
        this.actor.activeOption = this.actor
            .options[index - 1 < 0 ? this.actor.options.length - 1 : index - 1];
        _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.next = function () {
        var index = this.actor.options.indexOf(this.actor.activeOption);
        this.actor.activeOption = this.actor
            .options[index + 1 > this.actor.options.length - 1 ? 0 : index + 1];
        _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.filter = function (query) {
        var options = this.actor._items
            .filter(function (option) { return query.test(option.name); });
        this.actor.options = options;
        if (this.actor.options.length > 0) {
            this.actor.activeOption = this.actor.options[0];
            _super.prototype.ensureHighlightVisible.call(this);
        }
    };
    return GenericBehavior;
}(Behavior));
//# sourceMappingURL=autocomplete.js.map