import {Component, Provider, forwardRef, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from 'angular2/common';

const MD2_SELECT_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => Md2Select),
        multi: true
    });


@Component({
    selector: 'md2-select',
    template: `
        <div tabindex="0" class="md2-select-container" [class.disabled]="_disabled" (keydown)="inputEvent($event)" (keyup)="inputEvent($event, true)">
            <div class="md2-select-value" (^click)="matchClick()">
                <span *ngIf="active.length <= 0" class="md2-select-placeholder">{{placeholder}}</span>
                <span *ngIf="active.length > 0" class="md2-select-match-text">{{active[0].name}}</span>
                <i class="md2-select-icon"></i>
            </div>
            <ul *ngIf="optionsOpened && options && options.length > 0" class="md2-select-menu">
                <li class="md2-option" *ngFor="#o of options" [class.active]="isActive(o)" (click)="selectMatch(o, $event)">
                    <div class="md2-text" [innerHtml]="o.name"></div>
                </li>
            </ul>
        </div>
    `,
    styles: [`
        .md2-select-container { position: relative; display: block; outline: none; }
        .md2-select-container .md2-select-value { display: flex; width: 100%; outline: none; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
        .md2-select-container:focus .md2-select-value { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
        .md2-select-container.disabled .md2-select-value { color: rgba(0,0,0,0.38); }
        .md2-select-container.disabled:focus .md2-select-value { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
        .md2-select-container .md2-select-value > span:not(.md2-select-icon) { max-width: 100%; -ms-flex: 1 1 auto; -webkit-flex: 1 1 auto; flex: 1 1 auto; -moz-transform: translate3d(0, 2px, 0); -ms-transform: translate3d(0, 2px, 0); -o-transform: translate3d(0, 2px, 0); -webkit-transform: translate3d(0, 2px, 0); transform: translate3d(0, 2px, 0); -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
        .md2-select-container .md2-select-value .md2-select-icon { display: block; -webkit-align-items: flex-end; -ms-flex-align: end; align-items: flex-end; text-align: end; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(0, 0, 0, 0.60); margin: 0 4px; -webkit-transform: translate3d(0, 1px, 0); -moz-transform: translate3d(0, 1px, 0); -ms-transform: translate3d(0, 1px, 0); -o-transform: translate3d(0, 1px, 0); transform: translate3d(0, 1px, 0); }
        .md2-select-container .md2-select-value .md2-select-placeholder { color: rgba(0, 0, 0, 0.38); }
        .md2-select-container .md2-select-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
        .md2-select-container .md2-select-menu .md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
        .md2-select-container .md2-select-menu .md2-option:hover, .md2-select-container .md2-select-menu .md2-option.active { background: #eeeeee; }
        .md2-select-container .md2-select-menu .md2-option .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 1rem; }
        .md2-disabled { background-color: #eceeef; position: absolute; width: 100%; height: 100%; pointer-events: none; z-index: 5; opacity: 0.6; top: 0; left: 0; cursor: default; }
    `],
    providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR]
})
export class Md2Select implements ControlValueAccessor {
    public options: Array<SelectItem> = [];
    public active: Array<SelectItem> = [];
    public activeOption: SelectItem;
    private offSideClickHandler: any;
    private inputMode: boolean = false;
    private optionsOpened: boolean = false;
    private behavior: IOptionsBehavior;
    private _items: Array<any> = [];
    private _disabled: boolean = false;


    @Input()
    placeholder: string = '';

    @Input() set items(value: Array<any>) {
        this._items = value;
    }

    @Input() set disabled(value: boolean) {
        this._disabled = value;
        if (this._disabled === true) {
            this.hideOptions();
        }
    }

    @Output()
    change: EventEmitter<any> = new EventEmitter();



    constructor(public element: ElementRef) { }

    private matchClick(e: any) {
        if (this._disabled === true) {
            return;
        }

        this.inputMode = !this.inputMode;
        if (this.inputMode === true) {
            //this.focusToInput();
            this.open();
        }
    }

    private open() {
        this.options = this._items.map((item: any) => new SelectItem(item));

        if (this.options.length > 0) {
            this.behavior.first();
        }

        this.optionsOpened = true;
    }

    ngOnInit() {
        this.behavior = new GenericBehavior(this);
        this.offSideClickHandler = this.getOffSideClickHandler(this);
        document.addEventListener('click', this.offSideClickHandler);
    }

    ngOnDestroy() {
        document.removeEventListener('click', this.offSideClickHandler);
        this.offSideClickHandler = null;
    }

    private getOffSideClickHandler(context: any) {
        return function (e: any) {
            if (e.target && e.target.nodeName === 'INPUT'
                && e.target.className && e.target.className.indexOf('md2-select') >= 0) {
                return;
            }

            if (context.element.nativeElement.contains(e.srcElement)
                && e.srcElement && e.srcElement.className &&
                e.srcElement.className.indexOf('md2-select') >= 0) {
                if (e.target.nodeName !== 'INPUT') {
                    context.matchClick(null);
                }
                return;
            }

            context.inputMode = false;
            context.optionsOpened = false;
        };
    }

    public doEvent(type: string, value: any) {
        if ((<any>this)[type] && value) {
            (<any>this)[type].next(value);
        }
    }

    private hideOptions() {
        this.inputMode = false;
        this.optionsOpened = false;
    }

    public inputEvent(e: any, isUpMode: boolean = false) {
        // check enabled
        if (this._disabled === true) { return; }

        // tab key
        if (e.keyCode === 9) { return; }

        if (isUpMode && (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 ||
            e.keyCode === 40 || e.keyCode === 13)) {
            e.preventDefault();
            return;
        }

        // esc
        if (!isUpMode && e.keyCode === 27) {
            this.hideOptions();
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
            if (this.active.indexOf(this.activeOption) == -1) {
                this.selectActiveMatch();
                this.behavior.next();
            }
            e.preventDefault();
            return;
        }
    }

    private selectActiveMatch() {
        this.selectMatch(this.activeOption);
    }

    private selectMatch(value: SelectItem, e: Event = null) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        if (this.options.length <= 0) {
            return;
        }

        this.active[0] = value;

        this.doEvent('change', value);
        this.hideOptions();
        this.element.nativeElement.querySelector('.md2-select-container').focus();
    }

    private isActive(value: SelectItem): boolean {
        return this.activeOption.name === value.name;
    }

    //Placeholders for the callbacks
    onTouched: () => any = () => { };

    //From ControlValueAccessor interface
    writeValue(value: any) {
        this.active = value;
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onTouched = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
}

class SelectItem {
    public value: string;
    public name: string;
    public children: Array<SelectItem>;
    public parent: SelectItem;

    constructor(source: any) {
        if (typeof source === 'string') {
            this.value = this.name = source;
        }

        if (typeof source === 'object') {
            this.value = source.value || source.name;
            this.name = source.name;

            if (source.children && source.name) {
                this.children = source.children.map((c: any) => {
                    let r: SelectItem = new SelectItem(c);
                    r.parent = this;
                    return r;
                });
                this.name = source.name;
            }
        }
    }

    public fillChildrenHash(optionsMap: Map<string, number>, startIndex: number): number {
        let i = startIndex;
        this.children.map(child => {
            optionsMap.set(child.value, i++);
        });

        return i;
    }

    public hasChildren(): boolean {
        return this.children && this.children.length > 0;
    }

    public getSimilar(): SelectItem {
        let r: SelectItem = new SelectItem(false);
        r.value = this.value;
        r.name = this.name;
        r.parent = this.parent;
        return r;
    }
}

class Behavior {
    public optionsMap: Map<string, number> = new Map<string, number>();

    constructor(public actor: Md2Select) {
    }

    private getActiveIndex(optionsMap: Map<string, number> = null): number {
        let ai = this.actor.options.indexOf(this.actor.activeOption);

        if (ai < 0 && optionsMap !== null) {
            ai = optionsMap.get(this.actor.activeOption.value);
        }

        return ai;
    }

    public ensureHighlightVisible(optionsMap: Map<string, number> = null) {
        let container = this.actor.element.nativeElement.querySelector('.md2-select-menu');

        if (!container) {
            return;
        }

        let choices = container.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }

        let activeIndex = this.getActiveIndex(optionsMap);
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

class GenericBehavior extends Behavior implements IOptionsBehavior {
    constructor(public actor: Md2Select) {
        super(actor);
    }

    public first() {
        this.actor.activeOption = this.actor.options[0];
        super.ensureHighlightVisible();
    }

    public last() {
        this.actor.activeOption = this.actor.options[this.actor.options.length - 1];
        super.ensureHighlightVisible();
    }

    public prev() {
        let index = this.actor.options.indexOf(this.actor.activeOption);
        this.actor.activeOption = this.actor
            .options[index - 1 < 0 ? this.actor.options.length - 1 : index - 1];
        super.ensureHighlightVisible();
    }

    public next() {
        let index = this.actor.options.indexOf(this.actor.activeOption);
        this.actor.activeOption = this.actor
            .options[index + 1 > this.actor.options.length - 1 ? 0 : index + 1];
        super.ensureHighlightVisible();
    }
}

interface IOptionsBehavior {
    first(): any;
    last(): any;
    prev(): any;
    next(): any;
}