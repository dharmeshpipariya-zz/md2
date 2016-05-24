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
let nextId = 0;
const MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(() => Md2Multiselect),
    multi: true
});
let Md2Multiselect = class Md2Multiselect {
    constructor(element) {
        this.element = element;
        this.list = [];
        this.activeItem = [];
        this.isMenuOpened = false;
        this._items = [];
        this._item = '';
        this.id = 'md2-multiselect-' + (++nextId);
        this.disabled = false;
        this.tabindex = 0;
        this.placeholder = '';
        this.itemText = 'text';
        this.change = new core_1.EventEmitter();
        this.onTouched = () => { };
    }
    set items(value) {
        this._items = value;
    }
    ngOnInit() {
        this.behavior = new GenericBehavior(this);
    }
    openMenu() {
        this.list = this._items.map((item) => new Item(item, this.itemText));
        if (this.list.length > 0) {
            this.isMenuOpened = true;
            this.behavior.first();
        }
    }
    doEvent(type, value) {
        if (this[type] && value) {
            this[type].next(value);
        }
    }
    selectItemOnMatch(value, e = null) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (this.list.length <= 0) {
            return;
        }
        let index = this.activeItem.findIndex(item => item.text === value.text);
        let itm = this._items.find((item) => item[this.itemText] === value.text);
        if (index == -1) {
            //let ind = this.list.findIndex(item => item.text == value.text);
            //let ind1 = this.activeItem.findIndex(item => item.text == this.list[ind+1].text);
            this._item.push(itm);
            this.activeItem.push(value);
        }
        else {
            this.activeItem.splice(index, 1);
            this._item.splice(index, 1);
        }
        this.doEvent('change', itm);
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
    }
    onClickEvent(e) {
        if (this.disabled) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        this.openMenu();
    }
    writeValue(value) {
        this._item = value;
        if (this._item && typeof this._item === 'string') {
            this.activeItem = [];
            for (let i = 0; i < this._item.length; i++) {
                this.activeItem.push({ text: this._item[i] });
            }
        }
        if (this._item && typeof this._item === 'object') {
            this.activeItem = [];
            for (let i = 0; i < this._item.length; i++) {
                this.activeItem.push({ text: this._item[i][this.itemText] });
            }
        }
    }
    registerOnChange(fn) { this.onTouched = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Multiselect.prototype, "id", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Multiselect.prototype, "disabled", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], Md2Multiselect.prototype, "tabindex", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Multiselect.prototype, "placeholder", void 0);
__decorate([
    core_1.Input('item-text'), 
    __metadata('design:type', String)
], Md2Multiselect.prototype, "itemText", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array), 
    __metadata('design:paramtypes', [Array])
], Md2Multiselect.prototype, "items", null);
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Md2Multiselect.prototype, "change", void 0);
Md2Multiselect = __decorate([
    core_1.Component({
        selector: 'md2-multiselect',
        template: `
    <div class="md2-multiselect-layout">
      <div class="md2-multiselect-container">
        <span *ngIf="activeItem.length <= 0" class="md2-multiselect-placeholder">{{placeholder}}</span>
        <span class="md2-multiselect-value">
          <span *ngFor="let a of activeItem; let last = last" class="md2-multiselect-value-item">
            <span class="md2-multiselect-text">{{a.text}}</span><span *ngIf="!last">,&nbsp;</span>
          </span>
        </span>
        <i class="md2-multiselect-icon"></i>
      </div>
      <ul *ngIf="isMenuOpened && list && list.length > 0" class="md2-multiselect-menu">
        <li class="md2-option" *ngFor="let l of list" [class.active]="isActive(l)" [class.focus]="isFocus(l)" (click)="selectItemOnMatch(l, $event)">
          <div class="md2-option-icon"></div>
          <div class="md2-option-text" [innerHtml]="l.text"></div>
        </li>
      </ul>
    </div>
  `,
        styles: [`
    .md2-multiselect { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-multiselect:focus { outline: none; }
    .md2-multiselect .md2-multiselect-layout { position: relative; display: block; }
    .md2-multiselect .md2-multiselect-container { display: flex; width: 100%; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
    .md2-multiselect:focus .md2-multiselect-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    .md2-multiselect.md2-multiselect-disabled .md2-multiselect-container { color: rgba(0,0,0,0.38); }
    .md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    .md2-multiselect .md2-multiselect-container > span:not(.md2-multiselect-icon) { max-width: 100%; -ms-flex: 1 1 auto; -webkit-flex: 1 1 auto; flex: 1 1 auto; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; overflow: hidden; }
    .md2-multiselect .md2-multiselect-container .md2-multiselect-icon { display: block; -webkit-align-items: flex-end; -ms-flex-align: end; align-items: flex-end; text-align: end; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(0, 0, 0, 0.60); margin: 0 4px; }
    .md2-multiselect .md2-multiselect-container .md2-multiselect-placeholder { color: rgba(0, 0, 0, 0.38); }
    .md2-multiselect .md2-multiselect-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    .md2-multiselect .md2-multiselect-menu .md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px 0 40px; height: 48px; line-height: 48px; }
    .md2-multiselect .md2-multiselect-menu .md2-option.active { color: #106cc8; }
    .md2-multiselect .md2-multiselect-menu .md2-option:hover, .md2-multiselect .md2-multiselect-menu .md2-option.focus { background: #eeeeee; }
    .md2-multiselect .md2-multiselect-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
    .md2-multiselect .md2-option .md2-option-icon { position: absolute; top: 14px; left: 12px; width: 16px; height: 16px; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; box-sizing: border-box; transition: 240ms; }
    .md2-multiselect .md2-option.active .md2-option-icon { -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); transform: rotate(-45deg); height: 8px; top: 17px; border-color: #106cc8; border-top-style: none; border-right-style: none; }
  `],
        host: {
            'role': 'multiselect',
            '[id]': 'id',
            '[class.md2-multiselect]': 'true',
            '[class.md2-multiselect-disabled]': 'disabled',
            '[tabindex]': 'disabled ? -1 : tabindex',
            '[attr.aria-disabled]': 'disabled',
            '(click)': 'onClickEvent($event)',
            '(keydown)': 'onKeyEvent($event)',
            '(blur)': 'onBlurEvent($event)'
        },
        providers: [MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR],
        encapsulation: core_1.ViewEncapsulation.None,
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], Md2Multiselect);
exports.Md2Multiselect = Md2Multiselect;
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
        let container = this.actor.element.nativeElement.querySelector('.md2-multiselect-menu');
        if (!container) {
            return;
        }
        let choices = container.querySelectorAll('.md2-option');
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
    prev() {
        let index = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor.list[index - 1 < 0 ? this.actor.list.length - 1 : index - 1];
        super.ensureHighlightVisible();
    }
    next() {
        let index = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor.list[index + 1 > this.actor.list.length - 1 ? 0 : index + 1];
        super.ensureHighlightVisible();
    }
}

//# sourceMappingURL=multiselect.js.map
