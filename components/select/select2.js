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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
const common_1 = require('@angular/common');
const MD2_SELECT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(() => Md2Select),
    multi: true
});
var _uniqueIdCounter = 0;
let Md2Option = class Md2Option {
    constructor() {
        this._selected = false;
        this._value = null;
        this.disabled = false;
    }
    get selected() { return this._selected; }
    set selected(selected) {
        this._selected = selected;
    }
    get value() { return this._value; }
    set value(value) {
        if (this._value != value) {
            this._value = value;
        }
    }
    onClick(event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        //this.selected = true;
    }
    onInputFocus() { this._isFocused = true; }
    onInputBlur() { this._isFocused = false; }
};
__decorate([
    core_1.HostBinding('class.md2-option-focused'), 
    __metadata('design:type', Boolean)
], Md2Option.prototype, "_isFocused", void 0);
__decorate([
    core_1.HostBinding('class.md2-option-selected'),
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Option.prototype, "selected", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], Md2Option.prototype, "value", null);
__decorate([
    core_1.HostBinding('class.md2-option-disabled'),
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Option.prototype, "disabled", void 0);
Md2Option = __decorate([
    core_1.Component({
        selector: 'md2-option',
        template: '<div class="md2-option-text"><ng-content></ng-content></div>',
        styles: [`
    md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
    md2-option.md2-option-selected { color: #106cc8; }
    md2-option:hover, md2-option.md2-option-focused { background: #eeeeee; }
    md2-option.md2-option-disabled, md2-option.md2-option-disabled:hover { color: rgba(189,189,189,0.87); cursor: default; background: transparent; }
    md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
  `],
        host: {
            'role': 'select-option',
            '(click)': 'onClick($event)'
        },
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [])
], Md2Option);
exports.Md2Option = Md2Option;
let Md2Select = class Md2Select {
    constructor(el, options) {
        this.el = el;
        this.selectedValue = '';
        this._value = null;
        this.change = new core_1.EventEmitter();
        this.id = 'md2-select-' + _uniqueIdCounter++;
        this.tabindex = 0;
        this.disabled = false;
        options.changes.subscribe(_ => {
            this.options = options.toArray();
            let activeTab = this.findActiveTab();
            if (!activeTab && this.options.length) {
                this.options[0].selected = true;
            }
        });
    }
    get value() { return this._value; }
    set value(value) {
        if (this._value != value) {
            this._value = value;
        }
    }
    //@Input() get selected() { return this._selected; }
    //set selected(selected: Md2Option) {
    //  this._selected = selected;
    //  this.value = selected ? selected.value : null;
    //  if (selected && !selected.selected) {
    //    selected.selected = true;
    //    this.selectedValue = document.getElementById(selected.id).innerHTML;
    //  }
    //}
    ngAfterContentInit() {
        //this._isInitialized = true;
    }
    open(event, option) {
        if (option.disabled) {
            event.preventDefault();
            return;
        }
        if (!option.selected) {
            let activeTab = this.findActiveTab();
            if (activeTab) {
                activeTab.selected = false;
            }
            option.selected = true;
            this.selectedValue = option.value;
            this.change.emit({ originalEvent: event, index: this.findTabIndex(option) });
        }
        event.preventDefault();
    }
    findActiveTab() {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].selected) {
                return this.options[i];
            }
        }
        return null;
    }
    findTabIndex(option) {
        let index = -1;
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i] == option) {
                index = i;
                break;
            }
        }
        return index;
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        //this._controlValueAccessorChangeFn = fn;
    }
    registerOnTouched(fn) {
        //this.onTouched = fn;
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Md2Select.prototype, "change", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Select.prototype, "id", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], Md2Select.prototype, "tabindex", void 0);
__decorate([
    core_1.HostBinding('class.md2-select-disabled'),
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Select.prototype, "disabled", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], Md2Select.prototype, "value", null);
Md2Select = __decorate([
    core_1.Component({
        selector: 'md2-select',
        template: `
    <div class="md2-select-container">
      <span *ngIf="selectedValue.length < 1" class="md2-select-placeholder">Placeholder</span>
      <span *ngIf="selectedValue.length > 0" class="md2-select-value" [innerHtml]="selectedValue"></span>
      <i class="md2-select-icon"></i>
    </div>
    <ul class="md2-select-menu">
      <li *ngFor="let option of options" [class]="option.headerClass" [class]="'md2-option-item'" [class.selected]="option.selected" [class.disabled]="option.disabled" (click)="open($event,option)">
        <span>{{option.value}}</span>
      </li>
    </ul>
    <!--<div class="md2-select-menu">
      <ng-content></ng-content>    
    </div>-->
  `,
        styles: [`
    md2-select { position: relative; display: block; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    md2-select:focus { outline: none; }
    md2-select .md2-select-container { display: flex; width: 100%; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
    md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); }
    md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    md2-select .md2-select-container > span:not(.md2-select-icon) { max-width: 100%; -ms-flex: 1 1 auto; -webkit-flex: 1 1 auto; flex: 1 1 auto; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; overflow: hidden; }
    md2-select .md2-select-container .md2-select-icon { display: block; -webkit-align-items: flex-end; -ms-flex-align: end; align-items: flex-end; text-align: end; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(0, 0, 0, 0.60); margin: 0 4px; }
    md2-select .md2-select-container .md2-select-placeholder { color: rgba(0, 0, 0, 0.38); }
    md2-select .md2-select-container .md2-select-value { white-space: nowrap; }
    md2-select .md2-select-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
  `],
        host: {
            'role': 'select',
            '[id]': 'id',
            '[tabindex]': 'disabled ? -1 : tabindex',
            '[attr.aria-disabled]': 'disabled'
        },
        providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __param(1, core_1.Query(Md2Option)), 
    __metadata('design:paramtypes', [core_1.ElementRef, core_1.QueryList])
], Md2Select);
exports.Md2Select = Md2Select;
exports.SELECT_DIRECTIVES = [Md2Select, Md2Option];

//# sourceMappingURL=select2.js.map
