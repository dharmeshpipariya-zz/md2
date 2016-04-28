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
        this.list = [];
        this.tempList = [];
        this.activeItem = [];
        this.isMenuOpened = false;
        this.inputValue = '';
        this._items = [];
        this._disabled = false;
        this.placeholder = '';
        this.itemText = 'text';
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
    Md2Autocomplete.prototype.openMenu = function (e) {
        var _this = this;
        if (this._disabled === true) {
            return;
        }
        this.isMenuOpened = true;
        this.tempList = this.list = this._items.map(function (item) { return new Item(item, _this.itemText); });
        if (this.list.length > 0) {
            this.behavior.first();
        }
        this.behavior.filter(new RegExp(this.inputValue, 'ig'));
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
                    context.openMenu(null);
                }
                return;
            }
            context.isMenuOpened = false;
        };
    };
    Md2Autocomplete.prototype.clear = function (item) {
        if (this._disabled === true) {
            return;
        }
        this.activeItem = [];
        this.inputValue = '';
        this.doEvent('cleard', item);
    };
    Md2Autocomplete.prototype.doEvent = function (type, value) {
        if (this[type] && value) {
            this[type].next(value);
        }
    };
    Md2Autocomplete.prototype.hide = function () {
        this.isMenuOpened = false;
    };
    Md2Autocomplete.prototype.keyEvent = function (e, isUpMode) {
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
            if (this.activeItem.indexOf(this.currentItem) == -1) {
                this.selectItem(this.currentItem);
                this.behavior.next();
            }
            e.preventDefault();
            return;
        }
        if (e.srcElement) {
            this.behavior.filter(new RegExp(this.inputValue, 'ig'));
        }
    };
    Md2Autocomplete.prototype.selectItem = function (value, e) {
        var _this = this;
        if (e === void 0) { e = null; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (this.list.length <= 0) {
            return;
        }
        this.inputValue = value.text;
        this.activeItem[0] = value;
        if (typeof this._item === 'string') {
            this._item = this.activeItem[0].text;
        }
        if (typeof this._item === 'object') {
            this._item[0] = this._items.find(function (item) { return item[_this.itemText] == value.text; });
        }
        this.doEvent('change', value);
        this.hide();
        this.element.nativeElement.querySelector('.md2-autocomplete-container input').focus();
    };
    Md2Autocomplete.prototype.isActive = function (value) { return this.currentItem.text === value.text; };
    Md2Autocomplete.prototype.writeValue = function (value) {
        this._item = value;
        if (this._item && typeof this._item === 'string') {
            if (this.activeItem.length > 0) {
                this.inputValue = this.activeItem[0].text = this._item;
            }
            else {
                this.activeItem.push({ text: this._item });
                this.inputValue = this._item;
            }
        }
        if (this._item && typeof this._item === 'object') {
            if (this.activeItem.length > 0) {
                this.inputValue = this.activeItem[0].text = this._item[0][this.itemText];
            }
            else {
                this.activeItem.push({ text: this._item[0][this.itemText] });
                this.inputValue = this._item[0][this.itemText];
            }
        }
    };
    Md2Autocomplete.prototype.registerOnChange = function (fn) { this.onTouched = fn; };
    Md2Autocomplete.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
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
            template: "\n    <div class=\"md2-autocomplete-container\">\n        <div class=\"md2-autocomplete-value\">\n            <input [(ngModel)]=\"inputValue\" type=\"text\" autocomplete=\"false\" tabindex=\"0\" (click)=\"openMenu()\" (keydown)=\"keyEvent($event)\" (keyup)=\"keyEvent($event, true)\" [disabled]=\"_disabled\" class=\"md2-autocomplete-input\" [placeholder]=\"placeholder\">\n            <i *ngIf=\"inputValue.length>0\" (click)=\"clear(currentItem)\" class=\"md2-autocomplete-icon-clear\"></i>\n        </div>\n        <ul *ngIf=\"isMenuOpened && list && list.length > 0\" class=\"md2-autocomplete-suggestions\">\n            <li class=\"md2-item\" *ngFor=\"#o of list\" [class.active]=\"isActive(o)\" (click)=\"selectItem(o, $event)\">\n                <div class=\"md2-text\" [innerHtml]=\"o.text | hightlight:inputValue\"></div>\n            </li>\n        </ul>\n    </div>\n    ",
            styles: ["\n        .md2-autocomplete-container { position: relative; display: block; outline: none; }\n        .md2-autocomplete-container .md2-autocomplete-value { display: flex; width: 100%; outline: none; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }\n        .md2-autocomplete-container:focus .md2-autocomplete-value { padding-bottom: 0; border-bottom: 2px solid #106cc8; }\n        .md2-autocomplete-container.disabled .md2-autocomplete-value { color: rgba(0,0,0,0.38); }\n        .md2-autocomplete-container.disabled:focus .md2-autocomplete-value { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-input { width: 100%; height: 26px; outline: none; background: transparent; border: 0; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box;}\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear { position: relative; display: inline-block; width: 18px; height: 18px; margin: 0 4px; overflow: hidden; }\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::before,\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::after { content: ''; position: absolute; height: 2px; width: 100%; top: 50%; left: 0; margin-top: -1px; background: #888; border-radius: 2px; height: 2px; }\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::before { -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); transform: rotate(45deg); }\n        .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::after { -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); }\n        .md2-autocomplete-container .md2-autocomplete-suggestions { position: absolute; left: 0; top: 100%; display: block; z-index: 10; padding: 0; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }\n        .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }\n        .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item:hover, .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item.active { background: #eeeeee; }\n        .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 1rem; }\n        .highlight{color: #757575;}\n    "],
            providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Md2Autocomplete);
    return Md2Autocomplete;
}());
exports.Md2Autocomplete = Md2Autocomplete;
var Item = (function () {
    function Item(source, itemText) {
        if (typeof source === 'string') {
            this.text = source;
        }
        if (typeof source === 'object') {
            this.text = source[itemText];
        }
    }
    return Item;
}());
var Behavior = (function () {
    function Behavior(actor) {
        this.actor = actor;
        this.listMap = new Map();
    }
    Behavior.prototype.getActiveIndex = function (listMap) {
        if (listMap === void 0) { listMap = null; }
        var ai = this.actor.list.indexOf(this.actor.currentItem);
        if (ai < 0 && listMap !== null) {
            ai = listMap.get(this.actor.currentItem.text);
        }
        return ai;
    };
    Behavior.prototype.ensureHighlightVisible = function (listMap) {
        if (listMap === void 0) { listMap = null; }
        var container = this.actor.element.nativeElement.querySelector('.md2-autocomplete-suggestions');
        if (!container) {
            return;
        }
        var choices = container.querySelectorAll('.md2-item');
        if (choices.length < 1) {
            return;
        }
        var activeIndex = this.getActiveIndex(listMap);
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
        this.actor.currentItem = this.actor.list[0];
        _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.last = function () {
        this.actor.currentItem = this.actor.list[this.actor.list.length - 1];
        _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.prev = function () {
        var index = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor
            .list[index - 1 < 0 ? this.actor.list.length - 1 : index - 1];
        _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.next = function () {
        var index = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor
            .list[index + 1 > this.actor.list.length - 1 ? 0 : index + 1];
        _super.prototype.ensureHighlightVisible.call(this);
    };
    GenericBehavior.prototype.filter = function (query) {
        var list = this.actor.tempList
            .filter(function (option) { return query.test(option.text); });
        this.actor.list = list;
        if (this.actor.list.length > 0) {
            this.actor.currentItem = this.actor.list[0];
            _super.prototype.ensureHighlightVisible.call(this);
        }
    };
    return GenericBehavior;
}(Behavior));
//# sourceMappingURL=autocomplete.js.map