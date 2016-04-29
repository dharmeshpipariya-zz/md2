System.register(['angular2/core', 'angular2/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var MD2_SELECT_CONTROL_VALUE_ACCESSOR, Md2Select, SelectItem, Behavior, GenericBehavior;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            MD2_SELECT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
                useExisting: core_1.forwardRef(() => Md2Select),
                multi: true
            });
            let Md2Select = class Md2Select {
                constructor(element) {
                    this.element = element;
                    this.list = [];
                    this.activeItem = [];
                    this.isMenuOpened = false;
                    this._items = [];
                    this._item = '';
                    this._disabled = false;
                    this.placeholder = '';
                    this.itemText = 'text';
                    this.change = new core_1.EventEmitter();
                    this.onTouched = () => { };
                }
                set items(value) {
                    this._items = value;
                }
                set disabled(value) {
                    this._disabled = value;
                    if (this._disabled === true) {
                        this.hide();
                    }
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
                clickEvent(e) {
                    if (this._disabled === true) {
                        return;
                    }
                    this.isMenuOpened = !this.isMenuOpened;
                    if (this.isMenuOpened === true) {
                        this.open();
                    }
                }
                open() {
                    this.list = this._items.map((item) => new SelectItem(item, this.itemText));
                    if (this.list.length > 0) {
                        this.behavior.first();
                    }
                }
                getOffSideClickHandler(context) {
                    return function (e) {
                        if (e.target && e.target.nodeName === 'INPUT'
                            && e.target.className && e.target.className.indexOf('md2-select') >= 0) {
                            return;
                        }
                        if (context.element.nativeElement.contains(e.srcElement)
                            && e.srcElement && e.srcElement.className &&
                            e.srcElement.className.indexOf('md2-select') >= 0) {
                            if (e.target.nodeName !== 'INPUT') {
                                context.clickEvent(null);
                            }
                            return;
                        }
                        context.isMenuOpened = false;
                    };
                }
                doEvent(type, value) {
                    if (this[type] && value) {
                        this[type].next(value);
                    }
                }
                hide() { this.isMenuOpened = false; }
                keyEvent(e, isUpMode = false) {
                    // check enabled
                    if (this._disabled === true) {
                        return;
                    }
                    // tab key
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
                }
                selectItem(value, e = null) {
                    if (e) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    if (this.list.length <= 0) {
                        return;
                    }
                    this.activeItem[0] = value;
                    if (typeof this._item === 'string') {
                        this._item = this.activeItem[0].text;
                    }
                    if (typeof this._item === 'object') {
                        this._item[0] = this._items.find((item) => item[this.itemText] == value.text);
                    }
                    this.doEvent('change', value);
                    this.hide();
                    this.element.nativeElement.querySelector('.md2-select-container').focus();
                }
                isActive(value) { return this.currentItem.text === value.text; }
                writeValue(value) {
                    this._item = value;
                    if (this._item && typeof this._item === 'string') {
                        if (this.activeItem.length > 0) {
                            this.activeItem[0].text = this._item;
                        }
                        else {
                            this.activeItem.push({ text: this._item });
                        }
                    }
                    if (this._item && typeof this._item === 'object') {
                        if (this.activeItem.length > 0) {
                            this.activeItem[0].text = this._item[0][this.itemText];
                        }
                        else {
                            this.activeItem.push({ text: this._item[0][this.itemText] });
                        }
                    }
                }
                registerOnChange(fn) { this.onTouched = fn; }
                registerOnTouched(fn) {
                    this.onTouched = fn;
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], Md2Select.prototype, "placeholder", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], Md2Select.prototype, "itemText", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Array), 
                __metadata('design:paramtypes', [Array])
            ], Md2Select.prototype, "items", null);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Boolean), 
                __metadata('design:paramtypes', [Boolean])
            ], Md2Select.prototype, "disabled", null);
            __decorate([
                core_1.Output(), 
                __metadata('design:type', core_1.EventEmitter)
            ], Md2Select.prototype, "change", void 0);
            Md2Select = __decorate([
                core_1.Component({
                    selector: 'md2-select',
                    template: `
        <div tabindex="0" class="md2-select-container" [class.disabled]="_disabled" (keydown)="keyEvent($event)" (keyup)="keyEvent($event, true)">
            <div class="md2-select-value" (^click)="clickEvent()">
                <span *ngIf="activeItem.length <= 0" class="md2-select-placeholder">{{placeholder}}</span>
                <span *ngIf="activeItem.length > 0" class="md2-select-match-text">{{activeItem[0].text}}</span>
                <i class="md2-select-icon"></i>
            </div>
            <ul *ngIf="isMenuOpened && list && list.length > 0" class="md2-select-menu">
                <li class="md2-option" *ngFor="#o of list" [class.active]="isActive(o)" (click)="selectItem(o, $event)">
                    <div class="md2-text" [innerHtml]="o.text"></div>
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
                }), 
                __metadata('design:paramtypes', [core_1.ElementRef])
            ], Md2Select);
            exports_1("Md2Select", Md2Select);
            class SelectItem {
                constructor(source, itemText) {
                    if (typeof source === 'string') {
                        this.text = source;
                    }
                    if (typeof source === 'object') {
                        this.text = source[itemText];
                    }
                }
            }
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
                last() {
                    this.actor.currentItem = this.actor.list[this.actor.list.length - 1];
                    super.ensureHighlightVisible();
                }
                prev() {
                    let index = this.actor.list.indexOf(this.actor.currentItem);
                    this.actor.currentItem = this.actor
                        .list[index - 1 < 0 ? this.actor.list.length - 1 : index - 1];
                    super.ensureHighlightVisible();
                }
                next() {
                    let index = this.actor.list.indexOf(this.actor.currentItem);
                    this.actor.currentItem = this.actor
                        .list[index + 1 > this.actor.list.length - 1 ? 0 : index + 1];
                    super.ensureHighlightVisible();
                }
            }
        }
    }
});

//# sourceMappingURL=select.js.map
