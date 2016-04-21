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
var select_item_1 = require('./select-item');
var select_pipes_1 = require('./select-pipes');
var optionsTemplate = "\n    <ul *ngIf=\"optionsOpened && options && options.length > 0 && !itemObjects[0].hasChildren()\" class=\"md2-select-menu\">\n        <li class=\"md2-option\" *ngFor=\"#o of options\" [class.active]=\"isActive(o)\" (mouseenter)=\"selectActive(o)\" (click)=\"selectMatch(o, $event)\">\n            <div class=\"md2-text\" [innerHtml]=\"o.name | hightlight:inputValue\"></div>\n        </li>\n    </ul>\n    <div *ngIf=\"optionsOpened && options && options.length > 0 && itemObjects[0].hasChildren()\" class=\"md2-select-menu\">\n        <div class=\"md2-optgroup\" *ngFor=\"#c of options; #index=index\">\n            <label>{{c.name}}</label>\n            <div class=\"md2-option\" *ngFor=\"#o of c.children\" [class.active]=\"isActive(o)\" (mouseenter)=\"selectActive(o)\" (click)=\"selectMatch(o, $event)\">\n                <div class=\"md2-text\" [innerHtml]=\"o.name | hightlight:inputValue\"></div>\n            </div>\n        </div>\n    </div>\n";
var Select = (function () {
    function Select(element) {
        this.element = element;
        this.placeholder = '';
        this.initItem = [];
        this.multiple = false;
        this.data = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
        this.typed = new core_1.EventEmitter();
        this.options = [];
        this.itemObjects = [];
        this.active = [];
        this.inputMode = false;
        this.optionsOpened = false;
        this.inputValue = '';
        this._items = [];
        this._disabled = false;
    }
    Object.defineProperty(Select.prototype, "items", {
        set: function (value) {
            this._items = value;
            this.itemObjects = this._items.map(function (item) { return new select_item_1.SelectItem(item); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "disabled", {
        set: function (value) {
            this._disabled = value;
            if (this._disabled === true) {
                this.hideOptions();
            }
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.focusToInput = function (value) {
        var _this = this;
        if (value === void 0) { value = ''; }
        setTimeout(function () {
            var el = _this.element.nativeElement.querySelector('div.md2-select-container input');
            if (el) {
                el.focus();
                el.value = value;
            }
        }, 0);
    };
    Select.prototype.matchClick = function (e) {
        if (this._disabled === true) {
            return;
        }
        this.inputMode = !this.inputMode;
        if (this.inputMode === true && ((this.multiple === true && e) || this.multiple === false)) {
            this.focusToInput();
            this.open();
        }
    };
    Select.prototype.mainClick = function (e) {
        if (this.inputMode === true || this._disabled === true) {
            return;
        }
        if (e.keyCode === 46) {
            e.preventDefault();
            this.inputEvent(e);
            return;
        }
        if (e.keyCode === 8) {
            e.preventDefault();
            this.inputEvent(e, true);
            return;
        }
        if (e.keyCode === 9 || e.keyCode === 13 ||
            e.keyCode === 27 || (e.keyCode >= 37 && e.keyCode <= 40)) {
            e.preventDefault();
            return;
        }
        this.inputMode = true;
        var value = String
            .fromCharCode(96 <= e.keyCode && e.keyCode <= 105 ? e.keyCode - 48 : e.keyCode)
            .toLowerCase();
        this.focusToInput(value);
        this.open();
        e.srcElement.value = value;
        this.inputEvent(e);
    };
    Select.prototype.open = function () {
        var _this = this;
        this.options = this.itemObjects
            .filter(function (option) { return (_this.multiple === false ||
            _this.multiple === true && !_this.active.find(function (o) { return option.name === o.name; })); });
        if (this.options.length > 0) {
            this.behavior.first();
        }
        this.optionsOpened = true;
    };
    Select.prototype.ngOnInit = function () {
        this.behavior = this.itemObjects[0].hasChildren() ?
            new ChildrenBehavior(this) : new GenericBehavior(this);
        this.offSideClickHandler = this.getOffSideClickHandler(this);
        document.addEventListener('click', this.offSideClickHandler);
        if (this.initItem) {
            this.active = this.initItem.map(function (d) { return new select_item_1.SelectItem(d); });
            this.data.emit(this.active);
        }
    };
    Select.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.offSideClickHandler);
        this.offSideClickHandler = null;
    };
    Select.prototype.getOffSideClickHandler = function (context) {
        return function (e) {
            if (e.target && e.target.nodeName === 'INPUT'
                && e.target.className && e.target.className.indexOf('md2-select') >= 0) {
                return;
            }
            if (e.srcElement && e.srcElement.className &&
                e.srcElement.className.indexOf('md2-select') >= 0) {
                if (e.target.nodeName !== 'INPUT') {
                    context.matchClick(null);
                }
                return;
            }
            context.inputMode = false;
            context.optionsOpened = false;
        };
    };
    Select.prototype.remove = function (item) {
        if (this._disabled === true) {
            return;
        }
        if (this.multiple === true && this.active) {
            var index = this.active.indexOf(item);
            this.active.splice(index, 1);
            this.data.next(this.active);
            this.doEvent('removed', item);
        }
        if (this.multiple === false) {
            this.active = [];
            this.data.next(this.active);
            this.doEvent('removed', item);
        }
    };
    Select.prototype.doEvent = function (type, value) {
        if (this[type] && value) {
            this[type].next(value);
        }
    };
    Select.prototype.hideOptions = function () {
        this.inputMode = false;
        this.optionsOpened = false;
    };
    Select.prototype.inputEvent = function (e, isUpMode) {
        if (isUpMode === void 0) { isUpMode = false; }
        if (e.keyCode === 9) {
            return;
        }
        if (isUpMode && (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 ||
            e.keyCode === 40 || e.keyCode === 13)) {
            e.preventDefault();
            return;
        }
        if (!isUpMode && e.keyCode === 8) {
            var el = this.element.nativeElement
                .querySelector('div.md2-select-container input');
            if (!el.value || el.value.length <= 0) {
                if (this.active.length > 0) {
                    this.remove(this.active[this.active.length - 1]);
                }
                e.preventDefault();
            }
        }
        if (!isUpMode && e.keyCode === 27) {
            this.hideOptions();
            this.element.nativeElement.children[0].focus();
            e.preventDefault();
            return;
        }
        if (!isUpMode && e.keyCode === 46) {
            if (this.active.length > 0) {
                this.remove(this.active[this.active.length - 1]);
            }
            e.preventDefault();
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
            if (this.active.indexOf(this.activeOption) == -1) {
                this.selectActiveMatch();
                this.behavior.next();
            }
            e.preventDefault();
            return;
        }
        if (e.srcElement) {
            this.inputValue = e.srcElement.value;
            this.behavior.filter(new RegExp(this.inputValue, 'ig'));
            this.doEvent('typed', this.inputValue);
        }
    };
    Select.prototype.selectActiveMatch = function () {
        this.selectMatch(this.activeOption);
    };
    Select.prototype.selectMatch = function (value, e) {
        if (e === void 0) { e = null; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (this.options.length <= 0) {
            return;
        }
        if (this.multiple === true) {
            this.active.push(value);
            this.data.next(this.active);
        }
        if (this.multiple === false) {
            this.active[0] = value;
            this.data.next(this.active[0]);
        }
        this.doEvent('selected', value);
        this.hideOptions();
        if (this.multiple === true) {
            this.focusToInput('');
        }
        else {
            this.element.nativeElement.querySelector('.md2-select-container').focus();
        }
    };
    Select.prototype.selectActive = function (value) {
        this.activeOption = value;
    };
    Select.prototype.isActive = function (value) {
        return this.activeOption.name === value.name;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Select.prototype, "initItem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Select.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], Select.prototype, "items", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], Select.prototype, "disabled", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Select.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Select.prototype, "selected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Select.prototype, "removed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Select.prototype, "typed", void 0);
    Select = __decorate([
        core_1.Component({
            selector: 'md2-select',
            pipes: [select_pipes_1.HightlightPipe],
            template: "\n<div tabindex=\"0\" *ngIf=\"multiple === false\" (keyup)=\"mainClick($event)\" class=\"md2-select-container\">\n    <div [ngClass]=\"{'ui-disabled': disabled}\"></div>\n    <div class=\"md2-select-value-container\">\n        <div class=\"md2-select-value\" *ngIf=\"!inputMode\" tabindex=\"-1\" (^click)=\"matchClick()\">\n            <span *ngIf=\"active.length <= 0\" class=\"md2-select-placeholder\">{{placeholder}}</span>\n            <span *ngIf=\"active.length > 0\" class=\"md2-select-match-text\">{{active[0].name}}</span>\n            <i class=\"md2-select-icon\"></i>\n        </div>\n        <input type=\"text\" autocomplete=\"false\" tabindex=\"-1\" (keydown)=\"inputEvent($event)\" (keyup)=\"inputEvent($event, true)\" [disabled]=\"disabled\" class=\"md2-select-input\" *ngIf=\"inputMode\" placeholder=\"{{active.length <= 0 ? placeholder : ''}}\">\n    </div>\n    " + optionsTemplate + "    \n</div>\n\n<div tabindex=\"0\" *ngIf=\"multiple === true\" (keyup)=\"mainClick($event)\" (focus)=\"focusToInput('')\" class=\"md2-multiselect-container\">\n    <div [ngClass]=\"{'md2-disabled': disabled}\"></div>\n        <span class=\"md2-select-items\">\n          <span *ngFor=\"#a of active\" class=\"md2-select-item\" tabindex=\"-1\">\n            <span class=\"md2-select-match-text\">{{a.name}}</span>\n            <a class=\"md2-select-icon\" (click)=\"remove(a)\">&nbsp;&times;</a>\n          </span>\n        </span>\n        <input class=\"md2-multiselect-input\" type=\"text\" (keydown)=\"inputEvent($event)\" (keyup)=\"inputEvent($event, true)\" (click)=\"matchClick($event)\" [disabled]=\"disabled\" autocomplete=\"false\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" placeholder=\"{{active.length <= 0 ? placeholder : ''}}\" role=\"combobox\">\n        " + optionsTemplate + "\n    </div>\n",
            styles: ["\n.md2-select-container {\n  position: relative;\n  display: block;\n  outline: none;\n  /*.md2-select-container { outline: none; }*/ }\n  .md2-select-container[disabled] .md2-select-value {\n    background-position: 0 bottom; }\n    .md2-select-container[disabled] .md2-select-value:focus {\n      outline: none; }\n    .md2-select-container[disabled] .md2-select-value[disabled]:hover {\n      cursor: default; }\n    .md2-select-container[disabled] .md2-select-value:not([disabled]):hover {\n      cursor: pointer; }\n    .md2-select-container[disabled] .md2-select-value:not([disabled]).ng-invalid.ng-dirty .md2-select-value {\n      border-bottom: 2px solid;\n      padding-bottom: 0; }\n    .md2-select-container[disabled] .md2-select-value:not([disabled]):focus .md2-select-value {\n      border-bottom-width: 2px;\n      border-bottom-style: solid;\n      padding-bottom: 0; }\n  .md2-select-container .md2-select-value-container {\n    width: 100%;\n    outline: none; }\n    .md2-select-container .md2-select-value-container .md2-select-value {\n      display: flex;\n      align-items: center;\n      padding: 2px 2px 1px;\n      border-bottom-width: 1px;\n      border-bottom-style: solid;\n      border-bottom-color: rgba(0, 0, 0, 0.38);\n      position: relative;\n      box-sizing: content-box;\n      min-width: 64px;\n      min-height: 26px;\n      flex-grow: 1;\n      cursor: pointer;\n      outline: none; }\n      .md2-select-container .md2-select-value-container .md2-select-value > span:not(.md2-select-icon) {\n        max-width: 100%;\n        flex: 1 1 auto;\n        transform: translate3d(0, 2px, 0);\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        overflow: hidden; }\n      .md2-select-container .md2-select-value-container .md2-select-value .md2-select-icon {\n        display: block;\n        -webkit-align-items: flex-end;\n        -ms-flex-align: end;\n        align-items: flex-end;\n        text-align: end;\n        width: 0;\n        height: 0;\n        border-left: 6px solid transparent;\n        border-right: 6px solid transparent;\n        border-top: 6px solid rgba(0, 0, 0, 0.60);\n        margin: 0 4px;\n        -webkit-transform: translate3d(0, 1px, 0);\n        transform: translate3d(0, 1px, 0); }\n      .md2-select-container .md2-select-value-container .md2-select-value .md2-select-placeholder {\n        color: rgba(0, 0, 0, 0.38); }\n    .md2-select-container .md2-select-value-container .md2-select-input {\n      width: 100%;\n      height: 26px;\n      outline: none;\n      background: transparent;\n      border: 0;\n      align-items: center;\n      padding: 2px 0 0;\n      border-bottom-width: 2px;\n      border-bottom-style: solid;\n      border-bottom-color: #106cc8;\n      position: relative;\n      box-sizing: content-box;\n      min-width: 64px;\n      min-height: 26px;\n      flex-grow: 1;\n      cursor: pointer; }\n  .md2-select-container .md2-select-menu {\n    position: absolute;\n    left: 0;\n    top: 0;\n    display: block;\nz-index:10;\n    flex-direction: column;\n    width: 100%;\n    margin: 0;\n    padding: 8px 0;\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);\n    max-height: 256px;\n    min-height: 48px;\n    overflow-y: auto;\n    transform: scale(1);\n    background: #fff; }\n    .md2-select-container .md2-select-menu .md2-option {\n      cursor: pointer;\n      position: relative;\n      display: block;\n      align-items: center;\n      width: auto;\n      transition: background 0.15s linear;\n      padding: 0 16px;\n      height: 48px;line-height: 48px; }\n      .md2-select-container .md2-select-menu .md2-option:hover, .md2-select-container .md2-select-menu .md2-option.active {\n        background: #eeeeee; }\n      .md2-select-container .md2-select-menu .md2-option .md2-text {\n        width: auto;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        font-size: rem(1.6); }\n    .md2-select-container .md2-select-menu .md2-optgroup {\n      display: block; }\n      .md2-select-container .md2-select-menu .md2-optgroup label {\n        display: block;\n        font-size: rem(1.4);\n        text-transform: uppercase;\n        padding: 16px;\n        font-weight: 500; }\n      .md2-select-container .md2-select-menu .md2-optgroup .md2-option {\n        padding-left: 32px;\n        padding-right: 32px; }\n.md2-disabled {\n    background-color: #eceeef;\n    border-radius: 4px;\n    position: absolute;\n    width: 100%;\n    height: 100%;\npointer-events: none;\n    z-index: 5;\n    opacity: 0.6;\n    top: 0;\n    left: 0;\n    cursor: not-allowed;\n}\n"]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Select);
    return Select;
}());
exports.Select = Select;
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
    Behavior.prototype.fillOptionsMap = function () {
        var _this = this;
        this.optionsMap.clear();
        var startPos = 0;
        this.actor.itemObjects.map(function (i) {
            startPos = i.fillChildrenHash(_this.optionsMap, startPos);
        });
    };
    Behavior.prototype.ensureHighlightVisible = function (optionsMap) {
        if (optionsMap === void 0) { optionsMap = null; }
        var container = this.actor.element.nativeElement.querySelector('.md2-select-menu');
        if (!container) {
            return;
        }
        var choices = container.querySelectorAll('.md2-option');
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
exports.Behavior = Behavior;
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
        var _this = this;
        var options = this.actor.itemObjects
            .filter(function (option) { return query.test(option.name) &&
            (_this.actor.multiple === false ||
                (_this.actor.multiple === true &&
                    _this.actor.active.indexOf(option) < 0)); });
        this.actor.options = options;
        if (this.actor.options.length > 0) {
            this.actor.activeOption = this.actor.options[0];
            _super.prototype.ensureHighlightVisible.call(this);
        }
    };
    return GenericBehavior;
}(Behavior));
exports.GenericBehavior = GenericBehavior;
var ChildrenBehavior = (function (_super) {
    __extends(ChildrenBehavior, _super);
    function ChildrenBehavior(actor) {
        _super.call(this, actor);
        this.actor = actor;
    }
    ChildrenBehavior.prototype.first = function () {
        this.actor.activeOption = this.actor.options[0].children[0];
        this.fillOptionsMap();
        this.ensureHighlightVisible(this.optionsMap);
    };
    ChildrenBehavior.prototype.last = function () {
        this.actor.activeOption =
            this.actor
                .options[this.actor.options.length - 1]
                .children[this.actor.options[this.actor.options.length - 1].children.length - 1];
        this.fillOptionsMap();
        this.ensureHighlightVisible(this.optionsMap);
    };
    ChildrenBehavior.prototype.prev = function () {
        var _this = this;
        var indexParent = this.actor.options
            .findIndex(function (a) { return _this.actor.activeOption.parent && _this.actor.activeOption.parent.value === a.value; });
        var index = this.actor.options[indexParent].children
            .findIndex(function (a) { return _this.actor.activeOption && _this.actor.activeOption.value === a.value; });
        this.actor.activeOption = this.actor.options[indexParent].children[index - 1];
        if (!this.actor.activeOption) {
            if (this.actor.options[indexParent - 1]) {
                this.actor.activeOption = this.actor
                    .options[indexParent - 1]
                    .children[this.actor.options[indexParent - 1].children.length - 1];
            }
        }
        if (!this.actor.activeOption) {
            this.last();
        }
        this.fillOptionsMap();
        this.ensureHighlightVisible(this.optionsMap);
    };
    ChildrenBehavior.prototype.next = function () {
        var _this = this;
        var indexParent = this.actor.options
            .findIndex(function (a) { return _this.actor.activeOption.parent && _this.actor.activeOption.parent.value === a.value; });
        var index = this.actor.options[indexParent].children
            .findIndex(function (a) { return _this.actor.activeOption && _this.actor.activeOption.value === a.value; });
        this.actor.activeOption = this.actor.options[indexParent].children[index + 1];
        if (!this.actor.activeOption) {
            if (this.actor.options[indexParent + 1]) {
                this.actor.activeOption = this.actor.options[indexParent + 1].children[0];
            }
        }
        if (!this.actor.activeOption) {
            this.first();
        }
        this.fillOptionsMap();
        this.ensureHighlightVisible(this.optionsMap);
    };
    ChildrenBehavior.prototype.filter = function (query) {
        var options = [];
        var optionsMap = new Map();
        var startPos = 0;
        for (var _i = 0, _a = this.actor.itemObjects; _i < _a.length; _i++) {
            var si = _a[_i];
            var children = si.children.filter(function (option) { return query.test(option.name); });
            startPos = si.fillChildrenHash(optionsMap, startPos);
            if (children.length > 0) {
                var newSi = si.getSimilar();
                newSi.children = children;
                options.push(newSi);
            }
        }
        this.actor.options = options;
        if (this.actor.options.length > 0) {
            this.actor.activeOption = this.actor.options[0].children[0];
            _super.prototype.ensureHighlightVisible.call(this, optionsMap);
        }
    };
    return ChildrenBehavior;
}(Behavior));
exports.ChildrenBehavior = ChildrenBehavior;
exports.Md2Select = [Select];
//# sourceMappingURL=select.js.map