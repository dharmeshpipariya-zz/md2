import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Provider, ViewEncapsulation, forwardRef, ElementRef} from 'angular2/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from 'angular2/src/common/forms/directives/control_value_accessor';
import { CONST_EXPR } from 'angular2/src/facade/lang';

let nextId = 0;

const MD2_SELECT_CONTROL_VALUE_ACCESSOR = CONST_EXPR(new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => Md2Select),
        multi: true
    }));

@Component({
    selector: 'md2-select',
    template: `
        <div class="md2-select-layout">
            <div class="md2-select-container">
                <span *ngIf="activeItem.length <= 0" class="md2-select-placeholder">{{placeholder}}</span>
                <span *ngIf="activeItem.length > 0" class="md2-select-value">{{activeItem[0].text}}</span>
                <i class="md2-select-icon"></i>
            </div>
            <ul *ngIf="isMenuOpened && list && list.length > 0" class="md2-select-menu">
                <li class="md2-option" *ngFor="let l of list" [class.active]="isActive(l)" [class.focus]="isFocus(l)" (click)="selectItemOnMatch(l, $event)">
                    <div class="md2-option-text" [innerHtml]="l.text"></div>
                </li>
            </ul>
        </div>
    `,
    styles: [`
        .md2-select { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
        .md2-select:focus { outline: none; }
        .md2-select .md2-select-layout { position: relative; display: block; }
        .md2-select .md2-select-container { display: flex; width: 100%; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
        .md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
        .md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); }
        .md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
        .md2-select .md2-select-container > span:not(.md2-select-icon) { max-width: 100%; -ms-flex: 1 1 auto; -webkit-flex: 1 1 auto; flex: 1 1 auto; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; overflow: hidden; }
        .md2-select .md2-select-container .md2-select-icon { display: block; -webkit-align-items: flex-end; -ms-flex-align: end; align-items: flex-end; text-align: end; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(0, 0, 0, 0.60); margin: 0 4px; }
        .md2-select .md2-select-container .md2-select-placeholder { color: rgba(0, 0, 0, 0.38); }
        .md2-select .md2-select-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
        .md2-select .md2-select-menu .md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
        .md2-select .md2-select-menu .md2-option.active { color: #106cc8; }
        .md2-select .md2-select-menu .md2-option:hover, .md2-select .md2-select-menu .md2-option.focus { background: #eeeeee; }
        .md2-select .md2-select-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 1rem; }
    `],
    host: {
        'role': 'select',
        '[id]': 'id',
        '[class.md2-select]': 'true',
        '[class.md2-select-disabled]': 'disabled',
        '[tabindex]': 'disabled ? -1 : tabindex',
        '[attr.aria-disabled]': 'disabled',
        '(click)': 'onClickEvent($event)',
        '(keydown)': 'onKeyEvent($event)',
        '(blur)': 'onBlurEvent($event)'
    },
    providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Md2Select implements ControlValueAccessor {
    public list: Array<ListItem> = [];
    public activeItem: Array<ListItem> = [];
    public currentItem: ListItem;
    private isMenuOpened: boolean = false;
    private isOpenable: boolean = true;
    private behavior: IListsBehavior;
    private _items: Array<any> = [];
    private _item: any = '';

    @Input() id: string = 'md2-select-' + (++nextId);

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
        if (this.list.length > 0 && this.isOpenable) {
            if (this.activeItem.length > 0) {
                this.currentItem = this.list.find((item: any) => item.text == this.activeItem[0].text);
            }
            this.isMenuOpened = true;
            setTimeout(() => { this.behavior.next(); }, 0);
        }
        this.isOpenable = true;
    }

    public doEvent(type: string, value: any) {
        if ((<any>this)[type] && value) {
            (<any>this)[type].next(value);
        }
    }

    private selectItemOnMatch(value: ListItem, e: Event = null) {
        if (e) { e.preventDefault(); }
        if (this.list.length <= 0) { return; }

        this.activeItem[0] = value;
        if (typeof this._item === 'string') {
            this._item = this.activeItem[0].text;
        }
        if (typeof this._item === 'object') {
            this._item[0] = this._items.find((item: any) => item[this.itemText] == value.text);
        }

        this.doEvent('change', value);
        this.onBlurEvent(e);
    }

    private isActive(value: ListItem): boolean {
        let index = this.activeItem.findIndex(item => item.text == value.text);
        return index == -1 ? false : true;
    }

    private isFocus(value: ListItem): boolean { return this.currentItem.text === value.text; }

    onTouched: () => any = () => { };

    onBlurEvent(e: Event) {
        this.isMenuOpened = false;
        this.isOpenable = false;
        setTimeout(() => {
            this.isOpenable = true;
        }, 200);
    }

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
            this.activeItem.push({ text: this._item });
        }
        if (this._item && typeof this._item === 'object') {
            this.activeItem = [];
            this.activeItem.push({ text: this._item[0][this.itemText] });
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

    constructor(public actor: Md2Select) {
    }

    private getActiveIndex(listMap: Map<string, number> = null): number {
        let ai = this.actor.list.indexOf(this.actor.currentItem);

        if (ai < 0 && listMap !== null) {
            ai = listMap.get(this.actor.currentItem.text);
        }

        return ai;
    }

    public ensureHighlightVisible(listMap: Map<string, number> = null) {
        let container = this.actor.element.nativeElement.querySelector('.md2-select-menu');

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
    constructor(public actor: Md2Select) {
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