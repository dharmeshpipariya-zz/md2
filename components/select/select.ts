import {
Component,
Input,
Output,
EventEmitter,
ElementRef
} from 'angular2/core';
import {
CORE_DIRECTIVES,
FORM_DIRECTIVES,
NgClass,
NgStyle
} from 'angular2/common';
import {SelectItem} from './select-item';
import {HightlightPipe} from './select-pipes';
import {IOptionsBehavior} from './select-interfaces';

let optionsTemplate = `
    <ul *ngIf="optionsOpened && options && options.length > 0 && !itemObjects[0].hasChildren()" class="md2-select-menu">
        <li class="md2-option" *ngFor="#o of options" [class.active]="isActive(o)" (mouseenter)="selectActive(o)" (click)="selectMatch(o, $event)">
            <div class="md2-text" [innerHtml]="o.text | hightlight:inputValue"></div>
        </li>
    </ul>
    <div *ngIf="optionsOpened && options && options.length > 0 && itemObjects[0].hasChildren()" class="md2-select-menu">
        <div class="md2-optgroup" *ngFor="#c of options; #index=index">
            <label>{{c.text}}</label>
            <div class="md2-option" *ngFor="#o of c.children" [class.active]="isActive(o)" (mouseenter)="selectActive(o)" (click)="selectMatch(o, $event)">
                <div class="md2-text" [innerHtml]="o.text | hightlight:inputValue"></div>
            </div>
        </div>
    </div>
`;

@Component({
    selector: 'md2-select',
    pipes: [HightlightPipe],
    template: `
<div tabindex="0" *ngIf="multiple === false" (keyup)="mainClick($event)" class="md2-select-container">
    <div [ngClass]="{'ui-disabled': disabled}"></div>
    <div class="md2-select-value-container">
        <div class="md2-select-value" *ngIf="!inputMode" tabindex="-1" (^click)="matchClick()">
            <span *ngIf="active.length <= 0" class="md2-select-placeholder">{{placeholder}}</span>
            <span *ngIf="active.length > 0" class="md2-select-match-text" [ngClass]="{'ui-select-allow-clear': allowClear && active.length > 0}">{{active[0].text}}</span>
            <i class="md2-select-icon"></i>
        </div>
        <input type="text" autocomplete="false" tabindex="-1" (keydown)="inputEvent($event)" (keyup)="inputEvent($event, true)" [disabled]="disabled" class="md2-select-input" *ngIf="inputMode" placeholder="{{active.length <= 0 ? placeholder : ''}}">
    </div>
    ${optionsTemplate}    
</div>

<div tabindex="0" *ngIf="multiple === true" (keyup)="mainClick($event)" (focus)="focusToInput('')" class="md2-multiselect-container">
    <div [ngClass]="{'md2-disabled': disabled}"></div>
        <span class="md2-select-items">
          <span *ngFor="#a of active" class="md2-select-item" tabindex="-1">
            <span class="md2-select-match-text">{{a.text}}</span>
            <a class="md2-select-icon" (click)="remove(a)">&nbsp;&times;</a>
          </span>
        </span>
        <input class="md2-multiselect-input" type="text" (keydown)="inputEvent($event)" (keyup)="inputEvent($event, true)" (click)="matchClick($event)" [disabled]="disabled" autocomplete="false" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="{{active.length <= 0 ? placeholder : ''}}" role="combobox">
        ${optionsTemplate}
    </div>
`,
    styles: [`
.md2-select-container {
  position: relative;
  display: block;
  margin: 20px 0 26px;
  outline: none;
  /*.md2-select-container { outline: none; }*/ }
  .md2-select-container[disabled] .md2-select-value {
    background-position: 0 bottom; }
    .md2-select-container[disabled] .md2-select-value:focus {
      outline: none; }
    .md2-select-container[disabled] .md2-select-value[disabled]:hover {
      cursor: default; }
    .md2-select-container[disabled] .md2-select-value:not([disabled]):hover {
      cursor: pointer; }
    .md2-select-container[disabled] .md2-select-value:not([disabled]).ng-invalid.ng-dirty .md2-select-value {
      border-bottom: 2px solid;
      padding-bottom: 0; }
    .md2-select-container[disabled] .md2-select-value:not([disabled]):focus .md2-select-value {
      border-bottom-width: 2px;
      border-bottom-style: solid;
      padding-bottom: 0; }
  .md2-select-container .md2-select-value-container {
    width: 100%;
    outline: none; }
    .md2-select-container .md2-select-value-container .md2-select-value {
      display: flex;
      align-items: center;
      padding: 2px 2px 1px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: rgba(0, 0, 0, 0.38);
      position: relative;
      box-sizing: content-box;
      min-width: 64px;
      min-height: 26px;
      flex-grow: 1;
      cursor: pointer;
      outline: none; }
      .md2-select-container .md2-select-value-container .md2-select-value > span:not(.md2-select-icon) {
        max-width: 100%;
        flex: 1 1 auto;
        transform: translate3d(0, 2px, 0);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden; }
      .md2-select-container .md2-select-value-container .md2-select-value .md2-select-icon {
        display: block;
        -webkit-align-items: flex-end;
        -ms-flex-align: end;
        align-items: flex-end;
        text-align: end;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid rgba(0, 0, 0, 0.60);
        margin: 0 4px;
        -webkit-transform: translate3d(0, 1px, 0);
        transform: translate3d(0, 1px, 0); }
      .md2-select-container .md2-select-value-container .md2-select-value .md2-select-placeholder {
        color: rgba(0, 0, 0, 0.38); }
    .md2-select-container .md2-select-value-container .md2-select-input {
      width: 100%;
      height: 26px;
      outline: none;
      background: transparent;
      border: 0;
      align-items: center;
      padding: 2px 0 0;
      border-bottom-width: 2px;
      border-bottom-style: solid;
      border-bottom-color: #106cc8;
      position: relative;
      box-sizing: content-box;
      min-width: 64px;
      min-height: 26px;
      flex-grow: 1;
      cursor: pointer; }
  .md2-select-container .md2-select-menu {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
z-index:10;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 8px 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
    max-height: 256px;
    min-height: 48px;
    overflow-y: auto;
    transform: scale(1);
    background: #fff; }
    .md2-select-container .md2-select-menu .md2-option {
      cursor: pointer;
      position: relative;
      display: block;
      align-items: center;
      width: auto;
      transition: background 0.15s linear;
      padding: 0 16px;
      height: 48px;line-height: 48px; }
      .md2-select-container .md2-select-menu .md2-option:hover, .md2-select-container .md2-select-menu .md2-option.active {
        background: #eeeeee; }
      .md2-select-container .md2-select-menu .md2-option .md2-text {
        width: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: rem(1.6); }
    .md2-select-container .md2-select-menu .md2-optgroup {
      display: block; }
      .md2-select-container .md2-select-menu .md2-optgroup label {
        display: block;
        font-size: rem(1.4);
        text-transform: uppercase;
        padding: 16px;
        font-weight: 500; }
      .md2-select-container .md2-select-menu .md2-optgroup .md2-option {
        padding-left: 32px;
        padding-right: 32px; }
.md2-disabled {
    background-color: #eceeef;
    border-radius: 4px;
    position: absolute;
    width: 100%;
    height: 100%;
pointer-events: none;
    z-index: 5;
    opacity: 0.6;
    top: 0;
    left: 0;
    cursor: not-allowed;
}
`]
})
export class Select {
    @Input()
    allowClear: boolean = false;
    @Input()
    placeholder: string = '';

    //_item: string = '';
    @Input() set item(value: string) {

    }

    @Input()
    initData: Array<any> = [];
    @Input()
    multiple: boolean = false;

    @Input() set items(value: Array<any>) {
        this._items = value;
        this.itemObjects = this._items.map((item: any) => new SelectItem(item));
    }

    @Input() set disabled(value: boolean) {
        this._disabled = value;
        if (this._disabled === true) {
            this.hideOptions();
        }
    }

    @Output()
    data: EventEmitter<any> = new EventEmitter();
    @Output()
    ngModel: EventEmitter<any> = new EventEmitter();
    @Output()
    removed: EventEmitter<any> = new EventEmitter();
    @Output()
    typed: EventEmitter<any> = new EventEmitter();

    public options: Array<SelectItem> = [];
    public itemObjects: Array<SelectItem> = [];
    public active: Array<SelectItem> = [];
    public activeOption: SelectItem;
    private offSideClickHandler: any;
    private inputMode: boolean = false;
    private optionsOpened: boolean = false;
    private behavior: IOptionsBehavior;
    private inputValue: string = '';
    private _items: Array<any> = [];
    private _disabled: boolean = false;

    constructor(public element: ElementRef) {
    }

    private focusToInput(value: string = '') {
        setTimeout(() => {
            let el = this.element.nativeElement.querySelector('div.md2-select-container > input');
            if (el) {
                el.focus();
                el.value = value;
            }
        }, 0);
    }

    private matchClick(e: any) {
        if (this._disabled === true) {
            return;
        }

        this.inputMode = !this.inputMode;
        if (this.inputMode === true && ((this.multiple === true && e) || this.multiple === false)) {
            this.focusToInput();
            this.open();
        }
    }

    private mainClick(e: any) {
        if (this.inputMode === true || this._disabled === true) {
            return;
        }

        if (e.keyCode === 46) {
            e.preventDefault();
            this.inputEvent(e);
            return;
        }

        if (e.keyCode === 8) {
            e.preventDefault();
            this.inputEvent(e, true);
            return;
        }

        if (e.keyCode === 9 || e.keyCode === 13 ||
            e.keyCode === 27 || (e.keyCode >= 37 && e.keyCode <= 40)) {
            e.preventDefault();
            return;
        }

        this.inputMode = true;
        let value = String
            .fromCharCode(96 <= e.keyCode && e.keyCode <= 105 ? e.keyCode - 48 : e.keyCode)
            .toLowerCase();
        this.focusToInput(value);
        this.open();
        e.srcElement.value = value;
        this.inputEvent(e);
    }

    private open() {
        this.options = this.itemObjects
            .filter(option => (this.multiple === false ||
                this.multiple === true && !this.active.find(o => option.text === o.text)));

        if (this.options.length > 0) {
            this.behavior.first();
        }

        this.optionsOpened = true;
    }

    ngOnInit() {
        this.behavior = this.itemObjects[0].hasChildren() ?
            new ChildrenBehavior(this) : new GenericBehavior(this);
        this.offSideClickHandler = this.getOffSideClickHandler(this);
        document.addEventListener('click', this.offSideClickHandler);

        if (this.initData) {
            this.active = this.initData.map(d => new SelectItem(d));
            this.data.emit(this.active);
        }
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

            if (e.srcElement && e.srcElement.className &&
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

    public remove(item: SelectItem) {
        if (this._disabled === true) {
            return;
        }

        if (this.multiple === true && this.active) {
            let index = this.active.indexOf(item);
            this.active.splice(index, 1);
            this.data.next(this.active);
            this.doEvent('removed', item);
        }

        if (this.multiple === false) {
            this.active = [];
            this.data.next(this.active);
            this.doEvent('removed', item);
        }
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
        // tab
        if (e.keyCode === 9) {
            return;
        }

        if (isUpMode && (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 ||
            e.keyCode === 40 || e.keyCode === 13)) {
            e.preventDefault();
            return;
        }

        // backspace
        if (!isUpMode && e.keyCode === 8) {
            let el: any = this.element.nativeElement
                .querySelector('div.md2-select-container > input');

            if (!el.value || el.value.length <= 0) {
                if (this.active.length > 0) {
                    this.remove(this.active[this.active.length - 1]);
                }

                e.preventDefault();
            }
        }

        // esc
        if (!isUpMode && e.keyCode === 27) {
            this.hideOptions();
            this.element.nativeElement.children[0].focus();
            e.preventDefault();
            return;
        }

        // del
        if (!isUpMode && e.keyCode === 46) {
            if (this.active.length > 0) {
                this.remove(this.active[this.active.length - 1]);
            }
            e.preventDefault();
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

        if (e.srcElement) {
            this.inputValue = e.srcElement.value;
            this.behavior.filter(new RegExp(this.inputValue, 'ig'));
            this.doEvent('typed', this.inputValue);
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

        if (this.multiple === true) {
            this.active.push(value);
            this.data.next(this.active);
        }

        if (this.multiple === false) {
            this.active[0] = value;
            this.data.next(this.active[0]);
        }

        this.doEvent('ngModel', value);
        this.hideOptions();

        if (this.multiple === true) {
            this.focusToInput('');
        } else {
            this.element.nativeElement.querySelector('.md2-select-container').focus();
        }
    }

    private selectActive(value: SelectItem) {
        this.activeOption = value;
    }

    private isActive(value: SelectItem): boolean {
        return this.activeOption.text === value.text;
    }
}

export class Behavior {
    public optionsMap: Map<string, number> = new Map<string, number>();

    constructor(public actor: Select) {
    }

    private getActiveIndex(optionsMap: Map<string, number> = null): number {
        let ai = this.actor.options.indexOf(this.actor.activeOption);

        if (ai < 0 && optionsMap !== null) {
            ai = optionsMap.get(this.actor.activeOption.id);
        }

        return ai;
    }

    public fillOptionsMap() {
        this.optionsMap.clear();
        let startPos = 0;
        this.actor.itemObjects.map(i => {
            startPos = i.fillChildrenHash(this.optionsMap, startPos);
        });
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

export class GenericBehavior extends Behavior implements IOptionsBehavior {
    constructor(public actor: Select) {
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

    public filter(query: RegExp) {
        let options = this.actor.itemObjects
            .filter(option => query.test(option.text) &&
                (this.actor.multiple === false ||
                    (this.actor.multiple === true &&
                        this.actor.active.indexOf(option) < 0)));
        this.actor.options = options;

        if (this.actor.options.length > 0) {
            this.actor.activeOption = this.actor.options[0];
            super.ensureHighlightVisible();
        }
    }
}

export class ChildrenBehavior extends Behavior implements IOptionsBehavior {
    constructor(public actor: Select) {
        super(actor);
    }

    public first() {
        this.actor.activeOption = this.actor.options[0].children[0];
        this.fillOptionsMap();
        this.ensureHighlightVisible(this.optionsMap);
    }

    public last() {
        this.actor.activeOption =
            this.actor
                .options[this.actor.options.length - 1]
                .children[this.actor.options[this.actor.options.length - 1].children.length - 1];
        this.fillOptionsMap();
        this.ensureHighlightVisible(this.optionsMap);
    }

    public prev() {
        let indexParent = this.actor.options
            .findIndex(a => this.actor.activeOption.parent && this.actor.activeOption.parent.id === a.id);
        let index = this.actor.options[indexParent].children
            .findIndex(a => this.actor.activeOption && this.actor.activeOption.id === a.id);
        this.actor.activeOption = this.actor.options[indexParent].children[index - 1];

        if (!this.actor.activeOption) {
            if (this.actor.options[indexParent - 1]) {
                this.actor.activeOption = this.actor
                    .options[indexParent - 1]
                    .children[this.actor.options[indexParent - 1].children.length - 1];
            }
        }

        if (!this.actor.activeOption) {
            this.last();
        }

        this.fillOptionsMap();
        this.ensureHighlightVisible(this.optionsMap);
    }

    public next() {
        let indexParent = this.actor.options
            .findIndex(a => this.actor.activeOption.parent && this.actor.activeOption.parent.id === a.id);
        let index = this.actor.options[indexParent].children
            .findIndex(a => this.actor.activeOption && this.actor.activeOption.id === a.id);
        this.actor.activeOption = this.actor.options[indexParent].children[index + 1];
        if (!this.actor.activeOption) {
            if (this.actor.options[indexParent + 1]) {
                this.actor.activeOption = this.actor.options[indexParent + 1].children[0];
            }
        }

        if (!this.actor.activeOption) {
            this.first();
        }

        this.fillOptionsMap();
        this.ensureHighlightVisible(this.optionsMap);
    }

    public filter(query: RegExp) {
        let options: Array<SelectItem> = [];
        let optionsMap: Map<string, number> = new Map<string, number>();
        let startPos = 0;

        for (let si of this.actor.itemObjects) {
            let children: Array<SelectItem> = si.children.filter(option => query.test(option.text));
            startPos = si.fillChildrenHash(optionsMap, startPos);

            if (children.length > 0) {
                let newSi = si.getSimilar();
                newSi.children = children;
                options.push(newSi);
            }
        }

        this.actor.options = options;

        if (this.actor.options.length > 0) {
            this.actor.activeOption = this.actor.options[0].children[0];
            super.ensureHighlightVisible(optionsMap);
        }
    }
}