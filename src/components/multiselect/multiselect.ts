import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Provider, ViewEncapsulation, forwardRef, ElementRef} from 'angular2/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from 'angular2/src/common/forms/directives/control_value_accessor';
import { CONST_EXPR } from 'angular2/src/facade/lang';

let nextId = 0;

const MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = CONST_EXPR(new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => Md2Multiselect),
        multi: true
    }));

@Component({
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
        .md2-multiselect .md2-multiselect-menu .md2-option:hover, .md2-multiselect-layout .md2-multiselect-menu .md2-option.focus { background: #eeeeee; }
        .md2-multiselect .md2-multiselect-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 1rem; }
        .md2-multiselect .md2-option .md2-option-icon { position: absolute; top: 14px; left: 12px; width: 1rem; height: 1rem; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; box-sizing: border-box; transition: 240ms; }
        .md2-multiselect .md2-option.active .md2-option-icon { -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); transform: rotate(-45deg); height: 0.5rem; top: 17px; border-color: #106cc8; border-top-style: none; border-right-style: none; }
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
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Md2Multiselect implements ControlValueAccessor {
    public list: Array<ListItem> = [];
    public activeItem: Array<ListItem> = [];
    public currentItem: ListItem;
    private isMenuOpened: boolean = false;
    private behavior: IListsBehavior;
    private _items: Array<any> = [];
    private _item: any = '';

    @Input() id: string = `md2-multiselect-${++nextId}`;

    @Input() disabled: boolean = false;

    @Input() tabindex: number = 0;

    @Input() placeholder: string = '';

    @Input() itemText: string = 'text';

    @Input() set items(value: Array<any>) {
        this._items = value;
    }

    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor(public element: ElementRef) { }

    ngOnInit() {
        this.behavior = new GenericBehavior(this);
    }

    private openMenu() {
        this.list = this._items.map((item: any) => new ListItem(item, this.itemText));
        if (this.list.length > 0) {
            this.isMenuOpened = true;
            this.behavior.first();
        }
    }

    public doEvent(type: string, value: any) {
        if ((<any>this)[type] && value) {
            (<any>this)[type].next(value);
        }
    }

    private selectItemOnMatch(value: ListItem, e: Event = null) {
        if (e) { e.preventDefault(); }
        if (this.list.length <= 0) { return; }

        let index = this.activeItem.findIndex(item => item.text == value.text);
        if (index == -1) {
            //let ind = this.list.findIndex(item => item.text == value.text);
            //let ind1 = this.activeItem.findIndex(item => item.text == this.list[ind+1].text);
            this._item.push(this._items.find((item: any) => item[this.itemText] == value.text));
            this.activeItem.push(value);
            //this.activeItem = this.activeItem.sort((a, b) => { return this.list.findIndex(item=> item.text == a.text) - this.list.findIndex(item=> item.text == b.text); });
        } else {
            this.activeItem.splice(index, 1);
            this._item.splice(index, 1);
        }

        this.doEvent('change', value);
    }

    private isActive(value: ListItem): boolean {
        let index = this.activeItem.findIndex(item => item.text == value.text);
        return index == -1 ? false : true;
    }
    private isFocus(value: ListItem): boolean { return this.currentItem.text === value.text; }

    onTouched: () => any = () => { };

    onBlurEvent(e: Event) { this.isMenuOpened = false; }

    onKeyEvent(e: any) {
        // check enabled
        if (this.disabled === true) { return; }

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
            } else {
                this.onClickEvent(e);
            }
            e.preventDefault();
            return;
        }
    }

    onClickEvent(e: Event) {
        if (this.disabled) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        this.openMenu();
    }

    writeValue(value: any) {
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

    registerOnChange(fn: any) { this.onTouched = fn; }

    registerOnTouched(fn: any) { this.onTouched = fn; }
}

class ListItem {
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

    constructor(public actor: Md2Multiselect) {
    }

    private getActiveIndex(listMap: Map<string, number> = null): number {
        let ai = this.actor.list.indexOf(this.actor.currentItem);

        if (ai < 0 && listMap !== null) {
            ai = listMap.get(this.actor.currentItem.text);
        }

        return ai;
    }

    public ensureHighlightVisible(listMap: Map<string, number> = null) {
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

class GenericBehavior extends Behavior implements IListsBehavior {
    constructor(public actor: Md2Multiselect) {
        super(actor);
    }

    public first() {
        this.actor.currentItem = this.actor.list[0];
        super.ensureHighlightVisible();
    }

    public prev() {
        let index: number = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor.list[index - 1 < 0 ? this.actor.list.length - 1 : index - 1];
        super.ensureHighlightVisible();
    }

    public next() {
        let index: number = this.actor.list.indexOf(this.actor.currentItem);
        this.actor.currentItem = this.actor.list[index + 1 > this.actor.list.length - 1 ? 0 : index + 1];
        super.ensureHighlightVisible();
    }
}

interface IListsBehavior {
    first(): any;
    prev(): any;
    next(): any;
}