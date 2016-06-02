import {AfterContentInit, Component, ContentChildren, EventEmitter, HostBinding, Input, OnInit, Optional, Output, Provider, Query, QueryList, ViewEncapsulation, forwardRef, ElementRef } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';

const MD2_SELECT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => Md2Select),
  multi: true
});

var _uniqueIdCounter = 0;

@Component({
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
  encapsulation: ViewEncapsulation.None
})

export class Md2Option {

  @HostBinding('class.md2-option-focused') private _isFocused: boolean;

  private _selected: boolean = false;
  private _value: any = null;

  @HostBinding('class.md2-option-selected') @Input() get selected(): boolean { return this._selected; }
  set selected(selected: boolean) {
    this._selected = selected;
  }

  @Input() get value(): any { return this._value; }
  set value(value: any) {
    if (this._value != value) {
      this._value = value;
    }
  }

  @HostBinding('class.md2-option-disabled')
  @Input() disabled: boolean = false;

  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    //this.selected = true;
  }

  onInputFocus() { this._isFocused = true; }

  onInputBlur() { this._isFocused = false; }

}

@Component({
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
  encapsulation: ViewEncapsulation.None
})

export class Md2Select implements AfterContentInit, ControlValueAccessor {

  selectedValue = '';
  private _value: any = null;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input() id: string = 'md2-select-' + _uniqueIdCounter++;
  @Input() tabindex: number = 0;




  @HostBinding('class.md2-select-disabled')
  @Input() disabled: boolean = false;

  @Input() get value(): any { return this._value; }
  set value(value: any) {
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

  initialized: boolean;

  options: Md2Option[];

  constructor(private el: ElementRef, @Query(Md2Option) options: QueryList<Md2Option>) {
    options.changes.subscribe(_ => {
      this.options = options.toArray();
      let activeTab: Md2Option = this.findActiveTab();
      if (!activeTab && this.options.length) {
        this.options[0].selected = true;
      }
    });
  }

  open(event: Event, option: Md2Option) {
    if (option.disabled) {
      event.preventDefault();
      return;
    }

    if (!option.selected) {
      let activeTab: Md2Option = this.findActiveTab();
      if (activeTab) {
        activeTab.selected = false
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

  findTabIndex(option: Md2Option) {
    let index = -1;
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i] == option) {
        index = i;
        break;
      }
    }
    return index;
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void) {
    //this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any) {
    //this.onTouched = fn;
  }
}

export const SELECT_DIRECTIVES = [Md2Select, Md2Option];