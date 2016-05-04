//import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Provider, ViewEncapsulation, forwardRef, ElementRef} from 'angular2/core';
//import { NG_VALUE_ACCESSOR, ControlValueAccessor } from 'angular2/src/common/forms/directives/control_value_accessor';
//import { CONST_EXPR } from 'angular2/src/facade/lang';

//let nextId = 0;

//const MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR = CONST_EXPR(new Provider(
//    NG_VALUE_ACCESSOR, {
//        useExisting: forwardRef(() => Md2Multiselect),
//        multi: true
//    }));

//@Component({
//    selector: 'md2-collapse',
//    templateUrl: './components/collapse/collapse.html',
//    styles: [`
        
//    `],
//    //host: {
//    //    'role': 'multiselect',
//    //    '[id]': 'id',
//    //    '[class.md2-multiselect]': 'true',
//    //    '[class.md2-multiselect-disabled]': 'disabled',
//    //    '[tabindex]': 'disabled ? -1 : tabindex',
//    //    '[attr.aria-disabled]': 'disabled',
//    //    '(click)': 'onClickEvent($event)',
//    //    '(keydown)': 'onKeyEvent($event)',
//    //    '(blur)': 'onBlurEvent($event)'
//    //},
//    providers: [MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR],
//    encapsulation: ViewEncapsulation.None,
//    changeDetection: ChangeDetectionStrategy.OnPush
//})

//export class Md2Collapse implements ControlValueAccessor {
//    //public list: Array<ListItem> = [];
//    //public activeItem: Array<ListItem> = [];
//    //public currentItem: ListItem;
//    //private isMenuOpened: boolean = false;
//    //private behavior: IListsBehavior;
//    //private _items: Array<any> = [];
//    //private _item: any = '';

//    //@Input() id: string = `md2-multiselect-${++nextId}`;

//    //@Input() disabled: boolean = false;

//    //@Input() tabindex: number = 0;

//    //@Input() placeholder: string = '';

//    //@Input() itemText: string = 'text';

//    //@Input() set items(value: Array<any>) {
//    //    this._items = value;
//    //}

//    //@Output() change: EventEmitter<any> = new EventEmitter();

//    //constructor(public element: ElementRef) { }

//    //ngOnInit() {
//    //    this.behavior = new GenericBehavior(this);
//    //}

//    //private openMenu() {
//    //    this.list = this._items.map((item: any) => new ListItem(item, this.itemText));
//    //    if (this.list.length > 0) {
//    //        this.isMenuOpened = true;
//    //        this.behavior.first();
//    //    }
//    //}

//    //public doEvent(type: string, value: any) {
//    //    if ((<any>this)[type] && value) {
//    //        (<any>this)[type].next(value);
//    //    }
//    //}

//    //private selectItemOnMatch(value: ListItem, e: Event = null) {
//    //    if (e) { e.preventDefault(); }
//    //    if (this.list.length <= 0) { return; }

//    //    let index = this.activeItem.findIndex(item => item.text == value.text);
//    //    if (index == -1) {
//    //        //let ind = this.list.findIndex(item => item.text == value.text);
//    //        //let ind1 = this.activeItem.findIndex(item => item.text == this.list[ind+1].text);
//    //        this._item.push(this._items.find((item: any) => item[this.itemText] == value.text));
//    //        this.activeItem.push(value);
//    //        //this.activeItem = this.activeItem.sort((a, b) => { return this.list.findIndex(item=> item.text == a.text) - this.list.findIndex(item=> item.text == b.text); });
//    //    } else {
//    //        this.activeItem.splice(index, 1);
//    //        this._item.splice(index, 1);
//    //    }

//    //    this.doEvent('change', value);
//    //}

//    //private isActive(value: ListItem): boolean {
//    //    let index = this.activeItem.findIndex(item => item.text == value.text);
//    //    return index == -1 ? false : true;
//    //}
//    //private isFocus(value: ListItem): boolean { return this.currentItem.text === value.text; }

//    //onTouched: () => any = () => { };

//    //onBlurEvent(e: Event) { this.isMenuOpened = false; }

//    //onKeyEvent(e: any) {
//    //    // check enabled
//    //    if (this.disabled === true) { return; }

//    //    // Tab Key
//    //    if (e.keyCode === 9) {
//    //        if (this.isMenuOpened) {
//    //            this.onBlurEvent(e);
//    //            e.preventDefault();
//    //        }
//    //        return;
//    //    }

//    //    // Escape Key
//    //    if (e.keyCode === 27) {
//    //        this.onBlurEvent(e);
//    //        e.stopPropagation();
//    //        e.preventDefault();
//    //        return;
//    //    }

//    //    // Up Arrow
//    //    if (e.keyCode === 38) {
//    //        this.behavior.prev();
//    //        if (!this.isMenuOpened) {
//    //            this.onClickEvent(e);
//    //        }
//    //        e.stopPropagation();
//    //        e.preventDefault();
//    //        return;
//    //    }

//    //    // Down Arrow
//    //    if (e.keyCode === 40) {
//    //        this.behavior.next();
//    //        if (!this.isMenuOpened) {
//    //            this.onClickEvent(e);
//    //        }
//    //        e.stopPropagation();
//    //        e.preventDefault();
//    //        return;
//    //    }

//    //    // Enter / Space
//    //    if (e.keyCode === 13 || e.keyCode === 32) {
//    //        if (this.isMenuOpened) {
//    //            this.selectItemOnMatch(this.currentItem, e);
//    //        } else {
//    //            this.onClickEvent(e);
//    //        }
//    //        e.preventDefault();
//    //        return;
//    //    }
//    //}

//    //onClickEvent(e: Event) {
//    //    if (this.disabled) {
//    //        e.stopPropagation();
//    //        e.preventDefault();
//    //        return;
//    //    }
//    //    this.openMenu();
//    //}

//    //writeValue(value: any) {
//    //    this._item = value;
//    //    if (this._item && typeof this._item === 'string') {
//    //        this.activeItem = [];
//    //        for (let i = 0; i < this._item.length; i++) {
//    //            this.activeItem.push({ text: this._item[i] });
//    //        }
//    //    }
//    //    if (this._item && typeof this._item === 'object') {
//    //        this.activeItem = [];
//    //        for (let i = 0; i < this._item.length; i++) {
//    //            this.activeItem.push({ text: this._item[i][this.itemText] });
//    //        }
//    //    }
//    //}

//    //registerOnChange(fn: any) { this.onTouched = fn; }

//    //registerOnTouched(fn: any) { this.onTouched = fn; }
//}



import {Directive, Input, HostBinding} from 'angular2/core';


@Directive({ selector: '[collapse]' })
export class Md2Collapse {
    // style
    @HostBinding('style.height')
    private height: string;
    // shown
    @HostBinding('class.in')
    @HostBinding('attr.aria-expanded')
    private isExpanded: boolean = true;
    // hidden
    @HostBinding('attr.aria-hidden')
    private isCollapsed: boolean = false;
    // stale state
    @HostBinding('class.collapse')
    private isCollapse: boolean = true;
    // animation state
    @HostBinding('class.collapsing')
    private isCollapsing: boolean = false;

    @Input()
    private set collapse(value: boolean) {
        this.isExpanded = value;
        this.toggle();
    }

    private get collapse(): boolean {
        return this.isExpanded;
    }

    constructor() {
    }

    toggle() {
        if (this.isExpanded) {
            this.hide();
        } else {
            this.show();
        }
    }

    hide() {
        this.isCollapse = false;
        this.isCollapsing = true;

        this.isExpanded = false;
        this.isCollapsed = true;
        setTimeout(() => {
            this.height = '0';
            this.isCollapse = true;
            this.isCollapsing = false;
        }, 4);
    }

    show() {
        this.isCollapse = false;
        this.isCollapsing = true;

        this.isExpanded = true;
        this.isCollapsed = false;
        setTimeout(() => {
            this.height = 'auto';

            this.isCollapse = true;
            this.isCollapsing = false;
        }, 4);
    }
}