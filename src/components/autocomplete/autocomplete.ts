import {Component, Provider, forwardRef, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';

import {HightlightPipe} from './autocomplete-pipes';

const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => Md2Autocomplete),
        multi: true
    });

@Component({
    selector: 'md2-autocomplete',
    pipes: [HightlightPipe],
    template: `
    <div class="md2-autocomplete-container">
        <div class="md2-autocomplete-value">
            <input [(ngModel)]="inputValue" type="text" autocomplete="false" tabindex="0" (click)="openMenu()" (keydown)="keyEvent($event)" (keyup)="keyEvent($event, true)" [disabled]="_disabled" class="md2-autocomplete-input" [placeholder]="placeholder">
            <i *ngIf="inputValue.length>0" (click)="clear(currentItem)" class="md2-autocomplete-icon-clear"></i>
        </div>
        <ul *ngIf="isMenuOpened && list && list.length > 0" class="md2-autocomplete-suggestions">
            <li class="md2-item" *ngFor="let o of list" [class.active]="isActive(o)" (click)="selectItem(o, $event)">
                <div class="md2-text" [innerHtml]="o.text | hightlight:inputValue"></div>
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
        .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item:hover, .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item.active { background: #eeeeee; }
        .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 1rem; }
        .highlight{color: #757575;}
    `],
    providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
})
export class Md2Autocomplete implements ControlValueAccessor {
    public list: Array<Item> = [];
    public tempList: Array<Item> = [];
    public activeItem: Array<Item> = [];
    public currentItem: Item;
    private offSideClickHandler: any;
    private isMenuOpened: boolean = false;
    private behavior: IListBehavior;
    private inputValue: string = '';
    private _items: Array<any> = [];
    private _item: any;
    private _disabled: boolean = false;

    @Input()
    placeholder: string = '';

    @Input()
    itemText: string = 'text';

    @Input() set items(value: Array<any>) {
        this._items = value;
    }

    @Input() set disabled(value: boolean) {
        this._disabled = value;
        if (this._disabled === true) {
            this.hide();
        }
    }

    @Output()
    change: EventEmitter<any> = new EventEmitter();

    @Output()
    cleard: EventEmitter<any> = new EventEmitter();

    constructor(public element: ElementRef) { }

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

    private openMenu(e: any) {
        if (this._disabled === true) {
            return;
        }

        this.isMenuOpened = true;
        this.tempList = this.list = this._items.map((item: any) => new Item(item, this.itemText));
        if (this.list.length > 0) {
            this.behavior.first();
        }
        this.behavior.filter(new RegExp(this.inputValue, 'ig'));
    }

    private getOffSideClickHandler(context: any) {
        return function (e: any) {
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
    }

    public clear(item: Item) {
        if (this._disabled === true) {
            return;
        }
        this.activeItem = [];
        this.inputValue = '';
        this.doEvent('cleard', item);
    }

    public doEvent(type: string, value: any) {
        if ((<any>this)[type] && value) {
            (<any>this)[type].next(value);
        }
    }

    private hide() {
        this.isMenuOpened = false;
    }

    public keyEvent(e: any, isUpMode: boolean = false) {
        // tab
        if (e.keyCode === 9) {
            return;
        }

        if (isUpMode && (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 ||
            e.keyCode === 40 || e.keyCode === 13)) {
            e.preventDefault();
            return;
        }

        // esc
        if (!isUpMode && e.keyCode === 27) {
            this.hide();
            this.element.nativeElement.children[0].focus();
            e.preventDefault();
            return;
        }

        // left
        if (!isUpMode && e.keyCode === 37 && this._items.length > 0) {
            this.behavior.first();
            e.preventDefault();
            return;
        }

        // right
        if (!isUpMode && e.keyCode === 39 && this._items.length > 0) {
            this.behavior.last();
            e.preventDefault();
            return;
        }

        // up
        if (!isUpMode && e.keyCode === 38) {
            this.behavior.prev();
            e.preventDefault();
            return;
        }

        // down
        if (!isUpMode && e.keyCode === 40) {
            this.behavior.next();
            e.preventDefault();
            return;
        }

        // enter
        if (!isUpMode && e.keyCode === 13) {
            if (this.activeItem.indexOf(this.currentItem) == -1) {
                this.selectItem(this.currentItem);
                this.behavior.next();
            }
            e.preventDefault();
            return;
        }

        if (e.srcElement) {
            //this.inputValue = e.srcElement.value;
            this.behavior.filter(new RegExp(this.inputValue, 'ig'));
        }
    }

    private selectItem(value: Item, e: Event = null) {
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
            this._item[0] = this._items.find((item: any) => item[this.itemText] == value.text);
        }

        this.doEvent('change', value);
        this.hide();
        this.element.nativeElement.querySelector('.md2-autocomplete-container input').focus();
    }

    private isActive(value: Item): boolean { return this.currentItem.text === value.text; }

    onTouched: () => any = () => { };

    writeValue(value: any) {
        this._item = value;
        if (this._item && typeof this._item === 'string') {
            if (this.activeItem.length > 0) {
                this.inputValue = this.activeItem[0].text = this._item;
            } else {
                this.activeItem.push({ text: this._item });
                this.inputValue = this._item;
            }
        }
        if (this._item && typeof this._item === 'object') {
            if (this.activeItem.length > 0) {
                this.inputValue = this.activeItem[0].text = this._item[0][this.itemText];
            } else {
                this.activeItem.push({ text: this._item[0][this.itemText] });
                this.inputValue = this._item[0][this.itemText];
            }
        }
    }

    registerOnChange(fn: any) { this.onTouched = fn; }

    registerOnTouched(fn: any) { this.onTouched = fn; }
}

class Item {
    public text: string;

    constructor(source: any, itemText: string) {
        if (typeof source === 'string') {
            this.text = source;
        }
        if (typeof source === 'object') {
            this.text = source[itemText];
        }
    }
}

class Behavior {
    public listMap: Map<string, number> = new Map<string, number>();

    constructor(public actor: Md2Autocomplete) {
    }

    private getActiveIndex(listMap: Map<string, number> = null): number {
        let ai = this.actor.list.indexOf(this.actor.currentItem);

        if (ai < 0 && listMap !== null) {
            ai = listMap.get(this.actor.currentItem.text);
        }

        return ai;
    }

    public ensureHighlightVisible(listMap: Map<string, number> = null) {
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

        let highlighted: any = choices[activeIndex];
        if (!highlighted) {
            return;
        }

        let posY: number = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
        let height: number = container.offsetHeight;

        if (posY > height) {
            container.scrollTop += posY - height;
        } else if (posY < highlighted.clientHeight) {
            container.scrollTop -= highlighted.clientHeight - posY;
        }
    }
}

class GenericBehavior extends Behavior implements IListBehavior {
    constructor(public actor: Md2Autocomplete) {
        super(actor);
    }

    public first() {
        this.actor.currentItem = this.actor.list[0];
        super.ensureHighlightVisible();
    }

    public last() {
        this.actor.currentItem = this.actor.list[this.actor.list.length - 1];
        super.ensureHighlightVisible();
    }

    public prev() {
        let index = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor
            .list[index - 1 < 0 ? this.actor.list.length - 1 : index - 1];
        super.ensureHighlightVisible();
    }

    public next() {
        let index = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor
            .list[index + 1 > this.actor.list.length - 1 ? 0 : index + 1];
        super.ensureHighlightVisible();
    }

    public filter(query: RegExp) {
        let list = this.actor.tempList
            .filter(option => query.test(option.text));
        this.actor.list = list;

        if (this.actor.list.length > 0) {
            this.actor.currentItem = this.actor.list[0];
            super.ensureHighlightVisible();
        }
    }
}

interface IListBehavior {
    first(): any;
    last(): any;
    prev(): any;
    next(): any;
    filter(query: RegExp): any;
}