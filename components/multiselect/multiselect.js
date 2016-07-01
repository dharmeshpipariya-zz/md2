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
class Option {
    constructor(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
}
const noop = () => { };
let nextId = 0;
const MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(() => Md2Multiselect),
    multi: true
});
let Md2Multiselect = class Md2Multiselect {
    constructor(element) {
        this.element = element;
        this.change = new core_1.EventEmitter();
        this._value = '';
        this._isInitialized = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._options = [];
        this.list = [];
        this.items = [];
        this.focusedOption = 0;
        this.isFocused = false;
        this.id = 'md2-multiselect-' + (++nextId);
        this.disabled = false;
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
    }
    /** TODO: internal */
    ngAfterContentInit() {
        this._isInitialized = true;
    }
    set options(value) {
        this._options = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this.setValue(value);
    }
    /**
     * set value
     * @param value
     */
    setValue(value) {
        if (value !== this._value) {
            this._value = value;
            this.items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    let selItm = this._options.find(itm => this.equals(this.valueKey ? itm[this.valueKey] : itm, value[i]));
                    if (selItm) {
                        this.items.push(new Option(selItm, this.textKey, this.valueKey));
                    }
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    }
    /**
     * Compare two vars or objects
     * @param o1
     * @param o2
     */
    equals(o1, o2) {
        if (o1 === o2)
            return true;
        if (o1 === null || o2 === null)
            return false;
        if (o1 !== o1 && o2 !== o2)
            return true;
        let t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key]))
                    return false;
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key])
                    return false;
            }
            return true;
        }
        return false;
    }
    get isMenuVisible() {
        return (this.isFocused && this.list && this.list.length) ? true : false;
    }
    /**
     * to update scroll of options
     */
    updateScroll() {
        if (this.focusedOption < 0)
            return;
        let menuContainer = this.element.nativeElement.querySelector('.md2-multiselect-menu');
        if (!menuContainer)
            return;
        let choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1)
            return;
        let highlighted = choices[this.focusedOption];
        if (!highlighted)
            return;
        let top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        let height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    }
    onClick(event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        this.updateOptions();
    }
    onKeyDown(event) {
        // check enabled
        if (this.disabled) {
            return;
        }
        // Tab Key
        if (event.keyCode === 9) {
            if (this.isMenuVisible) {
                this.onBlur();
                event.preventDefault();
            }
            return;
        }
        // Escape Key
        if (event.keyCode === 27) {
            this.onBlur();
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        // Down Arrow
        if (event.keyCode === 40) {
            if (this.isMenuVisible) {
                this.focusedOption = (this.focusedOption === this.list.length - 1) ? 0 : Math.min(this.focusedOption + 1, this.list.length - 1);
                this.updateScroll();
            }
            else {
                this.updateOptions();
            }
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        // Up Arrow
        if (event.keyCode === 38) {
            if (this.isMenuVisible) {
                this.focusedOption = (this.focusedOption === 0) ? this.list.length - 1 : Math.max(0, this.focusedOption - 1);
                this.updateScroll();
            }
            else {
                this.updateOptions();
            }
            event.stopPropagation();
            event.preventDefault();
            return;
        }
        // Enter / Space
        if (event.keyCode === 13 || event.keyCode === 32) {
            if (this.isMenuVisible) {
                this.toggleOption(event, this.focusedOption);
            }
            else {
                this.updateOptions();
            }
            event.preventDefault();
            return;
        }
    }
    /**
     * on focus current component
     */
    onFocus() {
        this.isFocused = true;
        this.focusedOption = 0;
    }
    onBlur() { this.isFocused = false; }
    /**
     * to check current option is active or not
     * @param index
     */
    isActive(index) {
        return this.items.map(i => i.text).indexOf(this.list[index].text) < 0 ? false : true;
    }
    /**
     * to toggle option to select/deselect option
     * @param event
     * @param index
     */
    toggleOption(event, index) {
        event.preventDefault();
        event.stopPropagation();
        let ind = this.items.map(i => i.text).indexOf(this.list[index].text);
        if (ind < 0) {
            this.items.push(this.list[index]);
            this.items = this.items.sort((a, b) => { return this.list.findIndex(i => i.text === a.text) - this.list.findIndex(i => i.text === b.text); });
        }
        else {
            this.items.splice(ind, 1);
        }
        this._value = new Array();
        for (let i = 0; i < this.items.length; i++) {
            this._value.push(this.items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    }
    /**
     * update options
     */
    updateOptions() {
        this.list = this._options.map((item) => new Option(item, this.textKey, this.valueKey));
        if (this.list.length > 0) {
            this.onFocus();
        }
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    writeValue(value) { this.setValue(value); }
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn) { this._onChangeCallback = fn; }
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn) { this._onTouchedCallback = fn; }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Md2Multiselect.prototype, "change", void 0);
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
], Md2Multiselect.prototype, "textKey", void 0);
__decorate([
    core_1.Input('item-value'), 
    __metadata('design:type', String)
], Md2Multiselect.prototype, "valueKey", void 0);
__decorate([
    core_1.Input('items'), 
    __metadata('design:type', Array), 
    __metadata('design:paramtypes', [Array])
], Md2Multiselect.prototype, "options", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], Md2Multiselect.prototype, "value", null);
__decorate([
    core_1.HostListener('click', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [MouseEvent]), 
    __metadata('design:returntype', void 0)
], Md2Multiselect.prototype, "onClick", null);
__decorate([
    core_1.HostListener('keydown', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [KeyboardEvent]), 
    __metadata('design:returntype', void 0)
], Md2Multiselect.prototype, "onKeyDown", null);
__decorate([
    core_1.HostListener('blur'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], Md2Multiselect.prototype, "onBlur", null);
Md2Multiselect = __decorate([
    core_1.Component({
        selector: 'md2-multiselect',
        template: `
    <div class="md2-multiselect-container">
      <span *ngIf="items.length < 1" class="md2-multiselect-placeholder">{{placeholder}}</span>
      <div class="md2-multiselect-value">
        <div *ngFor="let v of items; let last = last" class="md2-multiselect-value-item">
          <span class="md2-multiselect-text">{{v.text}}</span><span *ngIf="!last">,&nbsp;</span>
        </div>
      </div>
      <em class="md2-multiselect-icon"></em>
    </div>
    <ul *ngIf="isMenuVisible" class="md2-multiselect-menu">
      <li class="md2-option" *ngFor="let l of list; let i = index;" [class.active]="isActive(i)" [class.focus]="focusedOption === i" (click)="toggleOption($event, i)">
        <div class="md2-option-icon"></div>
        <div class="md2-option-text" [innerHtml]="l.text"></div>
      </li>
    </ul>
  `,
        styles: [`
    .md2-multiselect { position: relative; display: block; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-multiselect:focus { outline: none; }
    .md2-multiselect .md2-multiselect-container { position: relative; display: block; width: 100%; padding: 2px 20px 1px 0; border-bottom: 1px solid rgba(0, 0, 0, 0.38); -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; min-width: 64px; min-height: 26px; max-height: 90px; overflow-y: auto; cursor: pointer; }
    .md2-multiselect:focus .md2-multiselect-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    .md2-multiselect.md2-multiselect-disabled .md2-multiselect-container { color: rgba(0,0,0,0.38); }
    .md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    .md2-multiselect .md2-multiselect-container > span:not(.md2-multiselect-icon) { display: block; max-width: 100%; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; overflow: hidden; }
    .md2-multiselect .md2-multiselect-container .md2-multiselect-icon { position: absolute; top: 50%; right: 0; display: block; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(0, 0, 0, 0.60); margin: -3px 4px 0; }
    .md2-multiselect .md2-multiselect-container .md2-multiselect-placeholder { color: rgba(0, 0, 0, 0.38); }
    .md2-multiselect .md2-multiselect-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    .md2-multiselect .md2-multiselect-menu .md2-option { position: relative; display: block; cursor: pointer; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px 0 40px; height: 48px; line-height: 48px; }
    .md2-multiselect .md2-multiselect-menu .md2-option.active { color: #106cc8; }
    .md2-multiselect .md2-multiselect-menu .md2-option:hover, .md2-multiselect .md2-multiselect-menu .md2-option.focus { background: #eeeeee; }
    .md2-multiselect .md2-multiselect-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
    .md2-multiselect .md2-option .md2-option-icon { position: absolute; top: 14px; left: 12px; width: 16px; height: 16px; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; -moz-transition: 240ms; -o-transition: 240ms; -webkit-transition: 240ms; transition: 240ms; }
    .md2-multiselect .md2-option.active .md2-option-icon { -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); transform: rotate(-45deg); height: 8px; top: 17px; border-color: #106cc8; border-top-style: none; border-right-style: none; }
  `],
        host: {
            'role': 'select',
            '[id]': 'id',
            '[class.md2-multiselect]': 'true',
            '[class.md2-multiselect-disabled]': 'disabled',
            '[tabindex]': 'disabled ? -1 : tabindex',
            '[attr.aria-disabled]': 'disabled'
        },
        providers: [MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR],
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], Md2Multiselect);
exports.Md2Multiselect = Md2Multiselect;

//# sourceMappingURL=multiselect.js.map
