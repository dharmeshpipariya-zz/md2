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
const core_1 = require('@angular/core');
const common_1 = require('@angular/common');
const autocomplete_pipe_1 = require('./autocomplete.pipe');
let nextId = 0;
const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(() => Md2Autocomplete),
    multi: true
});
let Md2Autocomplete = class Md2Autocomplete {
    constructor(element) {
        this.element = element;
        this.list = [];
        this.tempList = [];
        this.activeItem = [];
        this.isMenuOpened = false;
        this.inputValue = '';
        this._items = [];
        this.id = 'md2-autocomplete-' + (++nextId);
        this.disabled = false;
        this.tabindex = 0;
        this.placeholder = '';
        this.itemText = 'text';
        this.change = new core_1.EventEmitter();
        this.cleared = new core_1.EventEmitter();
        this.onTouched = () => { };
    }
    set items(value) {
        this._items = value;
    }
    ngOnInit() {
        if (this._items) {
            this.behavior = new GenericBehavior(this);
        }
        this.offSideClickHandler = this.getOffSideClickHandler(this);
        document.addEventListener('click', this.offSideClickHandler);
    }
    ngOnDestroy() {
        document.removeEventListener('click', this.offSideClickHandler);
        this.offSideClickHandler = null;
    }
    getOffSideClickHandler(context) {
        return function (e) {
            if (e.target && e.target.nodeName === 'INPUT'
                && e.target.className && e.target.className.indexOf('md2-autocomplete') >= 0) {
                return;
            }
            if (context.element.nativeElement.contains(e.srcElement)
                && e.srcElement && e.srcElement.className &&
                e.srcElement.className.indexOf('md2-autocomplete') >= 0) {
                if (e.target.nodeName !== 'INPUT') {
                    context.onClickEvent(null);
                }
                return;
            }
            context.isMenuOpened = false;
        };
    }
    clear(item) {
        if (this.disabled === true) {
            return;
        }
        this.activeItem = [];
        this.inputValue = '';
        this.doEvent('cleard', item);
    }
    doEvent(type, value) {
        if (this[type] && value) {
            this[type].next(value);
        }
    }
    selectItemOnMatch(value, e = null) {
        if (e) {
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
            if (Array.isArray(this._item)) {
                this._item[0] = this._items.find((item) => item[this.itemText] == value.text);
            }
            else {
                let itm = this._items.find((item) => item[this.itemText] == value.text);
                for (let i in itm) {
                    this._item[i] = itm[i];
                }
            }
        }
        this.doEvent('change', this._item);
        this.onBlurEvent(e);
        this.element.nativeElement.querySelector('.md2-autocomplete-container input').focus();
    }
    isActive(value) {
        let index = this.activeItem.findIndex(item => item.text == value.text);
        return index == -1 ? false : true;
    }
    isFocus(value) {
        if (this.currentItem) {
            return this.currentItem.text === value.text;
        }
        return false;
    }
    onBlurEvent(e) { this.isMenuOpened = false; }
    onKeyEvent(e) {
        // check enabled
        if (this.disabled === true) {
            return;
        }
        // Tab Key
        if (e.keyCode === 9) {
            if (this.isMenuOpened) {
                this.onBlurEvent(e);
                e.preventDefault();
            }
            return;
        }
        // Escape Key
        if (e.keyCode === 27) {
            this.onBlurEvent(e);
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        // Up Arrow
        if (e.keyCode === 38) {
            this.behavior.prev();
            if (!this.isMenuOpened) {
                this.onClickEvent(e);
            }
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        // Down Arrow
        if (e.keyCode === 40) {
            this.behavior.next();
            if (!this.isMenuOpened) {
                this.onClickEvent(e);
            }
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        // Enter / Space
        if (e.keyCode === 13 || e.keyCode === 32) {
            if (this.isMenuOpened) {
                this.selectItemOnMatch(this.currentItem, e);
            }
            else {
                this.onClickEvent(e);
            }
            e.preventDefault();
            return;
        }
        if (e.srcElement) {
            setTimeout(() => {
                if (!this.isMenuOpened) {
                    this.onClickEvent(e);
                }
                this.behavior.filter(new RegExp(this.inputValue, 'ig'));
            }, 100);
        }
    }
    onClickEvent(e) {
        if (this.disabled) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        this.tempList = this.list = this._items.map((item) => new Item(item, this.itemText));
        if (this.list.length > 0) {
            if (this.activeItem.length > 0) {
                this.currentItem = this.list.find((item) => item.text == this.activeItem[0].text);
            }
            this.isMenuOpened = true;
            setTimeout(() => { this.behavior.next(); }, 0);
            this.behavior.filter(new RegExp(this.inputValue, 'ig'));
        }
    }
    writeValue(value) {
        this._item = value;
        if (this._item && typeof this._item === 'string') {
            this.activeItem = [];
            this.activeItem.push({ text: this._item });
        }
        if (this._item && this._item.length && typeof this._item === 'object') {
            this.activeItem = [];
            if (Array.isArray(this._item)) {
                this.activeItem.push({ text: this._item[0][this.itemText] });
            }
            else {
                this.activeItem.push({ text: this._item[this.itemText] });
            }
            this.inputValue = this.activeItem[0].text;
        }
    }
    registerOnChange(fn) { this.onTouched = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Autocomplete.prototype, "id", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Autocomplete.prototype, "disabled", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], Md2Autocomplete.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Autocomplete.prototype, "placeholder", void 0);
__decorate([
    core_1.Input('item-text'), 
    __metadata('design:type', String)
], Md2Autocomplete.prototype, "itemText", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array), 
    __metadata('design:paramtypes', [Array])
], Md2Autocomplete.prototype, "items", null);
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Md2Autocomplete.prototype, "change", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Md2Autocomplete.prototype, "cleared", void 0);
Md2Autocomplete = __decorate([
    core_1.Component({
        selector: 'md2-autocomplete',
        pipes: [autocomplete_pipe_1.HightlightPipe],
        template: `
    <div class="md2-autocomplete-container">
      <div class="md2-autocomplete-value">
        <input [(ngModel)]="inputValue" type="text" autocomplete="false" tabindex="0" (click)="onClickEvent()" (keydown)="onKeyEvent($event)" [disabled]="disabled" class="md2-autocomplete-input" [placeholder]="placeholder">
        <i *ngIf="inputValue.length>0" (click)="clear(currentItem)" class="md2-autocomplete-icon-clear"></i>
      </div>
      <ul *ngIf="isMenuOpened && list && list.length > 0" class="md2-autocomplete-suggestions">
        <li class="md2-item" *ngFor="let l of list" [class.active]="isActive(l)" [class.focus]="isFocus(l)" (click)="selectItemOnMatch(l, $event)">
          <div class="md2-text" [innerHtml]="l.text | hightlight:inputValue"></div>
        </li>
      </ul>
    </div>
  `,
        styles: [`
    .md2-autocomplete-container { position: relative; display: block; outline: none; }
    .md2-autocomplete-container .md2-autocomplete-value { display: flex; width: 100%; outline: none; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
    .md2-autocomplete-container:focus .md2-autocomplete-value { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    .md2-autocomplete-container.disabled .md2-autocomplete-value { color: rgba(0,0,0,0.38); }
    .md2-autocomplete-container.disabled:focus .md2-autocomplete-value { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-input { width: 100%; height: 26px; outline: none; background: transparent; border: 0; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box;}
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear { position: relative; display: inline-block; width: 18px; height: 18px; margin: 0 4px; overflow: hidden; }
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::before,
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::after { content: ''; position: absolute; height: 2px; width: 100%; top: 50%; left: 0; margin-top: -1px; background: #888; border-radius: 2px; height: 2px; }
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::before { -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); transform: rotate(45deg); }
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::after { -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); }
    .md2-autocomplete-container .md2-autocomplete-suggestions { position: absolute; left: 0; top: 100%; display: block; z-index: 10; padding: 0; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
    .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item:hover, .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item.active, .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item.focus { background: #eeeeee; }
    .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
    .highlight{color: #757575;}
  `],
        providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], Md2Autocomplete);
exports.Md2Autocomplete = Md2Autocomplete;
class Item {
    constructor(source, itemText) {
        if (typeof source === 'string') {
            this.text = source;
        }
        if (typeof source === 'object') {
            this.text = source[itemText];
        }
    }
}
exports.Item = Item;
class Behavior {
    constructor(actor) {
        this.actor = actor;
        this.listMap = new Map();
    }
    getActiveIndex(listMap = null) {
        let ai = this.actor.list.indexOf(this.actor.currentItem);
        if (ai < 0 && listMap !== null) {
            ai = listMap.get(this.actor.currentItem.text);
        }
        return ai;
    }
    ensureHighlightVisible(listMap = null) {
        let container = this.actor.element.nativeElement.querySelector('.md2-autocomplete-suggestions');
        if (!container) {
            return;
        }
        let choices = container.querySelectorAll('.md2-item');
        if (choices.length < 1) {
            return;
        }
        let activeIndex = this.getActiveIndex(listMap);
        if (activeIndex < 0) {
            return;
        }
        let highlighted = choices[activeIndex];
        if (!highlighted) {
            return;
        }
        let posY = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
        let height = container.offsetHeight;
        if (posY > height) {
            container.scrollTop += posY - height;
        }
        else if (posY < highlighted.clientHeight) {
            container.scrollTop -= highlighted.clientHeight - posY;
        }
    }
}
class GenericBehavior extends Behavior {
    constructor(actor) {
        super(actor);
        this.actor = actor;
    }
    first() {
        this.actor.currentItem = this.actor.list[0];
        super.ensureHighlightVisible();
    }
    last() {
        this.actor.currentItem = this.actor.list[this.actor.list.length - 1];
        super.ensureHighlightVisible();
    }
    prev() {
        let index = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor
            .list[index - 1 < 0 ? this.actor.list.length - 1 : index - 1];
        super.ensureHighlightVisible();
    }
    next() {
        let index = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor
            .list[index + 1 > this.actor.list.length - 1 ? 0 : index + 1];
        super.ensureHighlightVisible();
    }
    filter(query) {
        let list = this.actor.tempList
            .filter(option => query.test(option.text));
        this.actor.list = list;
        if (this.actor.list.length > 0) {
            this.actor.currentItem = this.actor.list[0];
            super.ensureHighlightVisible();
        }
    }
}

//# sourceMappingURL=autocomplete.js.map
