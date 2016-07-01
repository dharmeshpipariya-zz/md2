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
const transclude_1 = require('./transclude');
class Md2TabChangeEvent {
}
exports.Md2TabChangeEvent = Md2TabChangeEvent;
let Md2TabLabel = class Md2TabLabel {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
Md2TabLabel = __decorate([
    core_1.Directive({ selector: '[md2-tab-label]' }), 
    __metadata('design:paramtypes', [core_1.TemplateRef])
], Md2TabLabel);
exports.Md2TabLabel = Md2TabLabel;
let Md2Tab = class Md2Tab {
    get labelTemplate() {
        return this.tabLabel ? this.tabLabel.templateRef : null;
    }
};
__decorate([
    core_1.ContentChild(Md2TabLabel), 
    __metadata('design:type', Md2TabLabel)
], Md2Tab.prototype, "tabLabel", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Md2Tab.prototype, "label", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Tab.prototype, "active", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Md2Tab.prototype, "disabled", void 0);
__decorate([
    core_1.Input('class'), 
    __metadata('design:type', String)
], Md2Tab.prototype, "md2Class", void 0);
Md2Tab = __decorate([
    core_1.Component({
        selector: 'md2-tab',
        template: `<ng-content></ng-content>`,
        host: {
            '[ngClass]': 'md2Class',
            '[class.md2-tab]': 'true',
            '[class.active]': 'active'
        }
    }), 
    __metadata('design:paramtypes', [])
], Md2Tab);
exports.Md2Tab = Md2Tab;
let Md2Tabs = class Md2Tabs {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this._isInitialized = false;
        this._focusIndex = 0;
        this._selectedIndex = 0;
        this.shouldPaginate = false;
        this.offsetLeft = 0;
        this.change = new core_1.EventEmitter();
    }
    set selectedIndex(value) {
        if (typeof value === 'string') {
            value = parseInt(value);
        }
        if (value != this._selectedIndex) {
            this._selectedIndex = value;
            this.adjustOffset(value);
            if (this.tabs) {
                const tabs = this.tabs.toArray();
                if (!tabs[value].disabled) {
                    tabs.forEach(tab => tab.active = false);
                    tabs[value].active = true;
                }
            }
            if (this._isInitialized) {
                this.change.emit(this._createChangeEvent(value));
            }
        }
    }
    get selectedIndex() { return this._selectedIndex; }
    get focusIndex() { return this._focusIndex; }
    set focusIndex(value) {
        this._focusIndex = value;
        this.adjustOffset(value);
    }
    get element() {
        const elements = { root: this.elementRef.nativeElement, wrapper: null, canvas: null, paging: null, tabs: null };
        elements.wrapper = elements.root.querySelector('.md2-tabs-header-wrapper');
        elements.canvas = elements.wrapper.querySelector('.md2-tabs-canvas');
        elements.paging = elements.canvas.querySelector('.md2-tabs-header');
        elements.tabs = elements.paging.querySelectorAll('.md2-tab-label');
        return elements;
    }
    /**
     * After Content Init
     */
    ngAfterContentInit() {
        setTimeout(() => {
            this.updatePagination();
        }, 0);
        setTimeout(() => {
            const tabs = this.tabs.toArray();
            if (this.selectedIndex) {
                tabs.forEach(tab => tab.active = false);
                tabs[this.selectedIndex].active = true;
                this.adjustOffset(this.selectedIndex);
            }
            else {
                let index = tabs.findIndex(t => t.active);
                if (index < 0) {
                    tabs[0].active = true;
                }
                else {
                    this.selectedIndex = index;
                }
            }
        }, 0);
        this._isInitialized = true;
    }
    /**
     * Create Change Event
     * @param index
     */
    _createChangeEvent(index) {
        const event = new Md2TabChangeEvent;
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
    }
    /**
     * Focus next Tab
     */
    focusNextTab() { this.incrementIndex(1); }
    /**
     * Focus previous Tab
     */
    focusPreviousTab() { this.incrementIndex(-1); }
    /**
     * Mouse Wheel scroll
     * @param event
     */
    scroll(event) {
        if (!this.shouldPaginate)
            return;
        event.preventDefault();
        this.offsetLeft = this.fixOffset(this.offsetLeft - event.wheelDelta);
    }
    /**
     * Next Page
     */
    nextPage() {
        let elements = this.element;
        let viewportWidth = elements.canvas.clientWidth, totalWidth = viewportWidth + this.offsetLeft, i, tab;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth)
                break;
        }
        this.offsetLeft = this.fixOffset(tab.offsetLeft);
    }
    /**
     * Previous Page
     */
    previousPage() {
        let i, tab, elements = this.element;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this.offsetLeft)
                break;
        }
        this.offsetLeft = this.fixOffset(tab.offsetLeft + tab.offsetWidth - elements.canvas.clientWidth);
    }
    /**
     * On Window Resize
     * @param event
     */
    onWindowResize(event) {
        this.offsetLeft = this.fixOffset(this.offsetLeft);
        this.updatePagination();
    }
    /**
     * Can page Back
     */
    canPageBack() { return this.offsetLeft > 0; }
    /**
     * Can page Previous
     */
    canPageForward() {
        let elements = this.element;
        let lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this.offsetLeft;
    }
    /**
     * Update Pagination
     */
    updatePagination() {
        let canvasWidth = this.element.root.clientWidth;
        this.element.tabs.forEach((tab) => {
            canvasWidth -= tab.offsetWidth;
        });
        this.shouldPaginate = canvasWidth < 0;
    }
    /**
     * Increment Focus Tab
     * @param inc
     */
    incrementIndex(inc) {
        let newIndex, index = this.focusIndex;
        for (newIndex = index + inc; this.tabs.toArray()[newIndex] && this.tabs.toArray()[newIndex].disabled; newIndex += inc) { }
        if (this.tabs.toArray()[newIndex]) {
            this.focusIndex = newIndex;
        }
    }
    /**
     * Adjust Offset of Tab
     * @param index
     */
    adjustOffset(index) {
        let elements = this.element;
        if (!elements.tabs[index])
            return;
        let tab = elements.tabs[index], left = tab.offsetLeft, right = tab.offsetWidth + left;
        this.offsetLeft = Math.max(this.offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 32 * 2));
        this.offsetLeft = Math.min(this.offsetLeft, this.fixOffset(left));
    }
    /**
     * Fix Offset of Tab
     * @param value
     */
    fixOffset(value) {
        let elements = this.element;
        if (!elements.tabs.length || !this.shouldPaginate)
            return 0;
        let lastTab = elements.tabs[elements.tabs.length - 1], totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.max(0, value);
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        return value;
    }
};
__decorate([
    core_1.ContentChildren(Md2Tab), 
    __metadata('design:type', core_1.QueryList)
], Md2Tabs.prototype, "tabs", void 0);
__decorate([
    core_1.Input('class'), 
    __metadata('design:type', String)
], Md2Tabs.prototype, "md2Class", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object), 
    __metadata('design:paramtypes', [Object])
], Md2Tabs.prototype, "selectedIndex", null);
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Md2Tabs.prototype, "change", void 0);
Md2Tabs = __decorate([
    core_1.Component({
        selector: 'md2-tabs',
        template: `
    <div class="md2-tabs-header-wrapper">
      <div role="button" class="md2-prev-button" [class.disabled]="!canPageBack()" *ngIf="shouldPaginate" (click)="previousPage()">
        <em class="prev-icon">Prev</em>
      </div>
      <div role="button" class="md2-next-button" [class.disabled]="!canPageForward()" *ngIf="shouldPaginate" (click)="nextPage()">
        <em class="next-icon">Next</em>
      </div>
      <div class="md2-tabs-canvas" [class.md2-paginated]="shouldPaginate" role="tablist" tabindex="0" (keydown.arrowRight)="focusNextTab()" (keydown.arrowLeft)="focusPreviousTab()" (keydown.enter)="selectedIndex = focusIndex" (mousewheel)="scroll($event)">
        <div class="md2-tabs-header" [style.marginLeft]="-offsetLeft">
          <div class="md2-tab-label" role="tab" *ngFor="let tab of tabs; let i = index" [class.focus]="focusIndex === i" [class.active]="selectedIndex === i" [class.disabled]="tab.disabled" (click)="focusIndex = selectedIndex = i">
            <span [md2Transclude]="tab.labelTemplate">{{tab.label}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="md2-tabs-body-wrapper">
      <ng-content></ng-content>
    </div>
  `,
        styles: [`
    .md2-tabs { position: relative; overflow: hidden; display: block; margin: 0; border: 1px solid #e1e1e1; border-radius: 2px; }
    .md2-tabs-header-wrapper { position: relative; display: block; background: white; border-width: 0 0 1px; border-style: solid; border-color: rgba(0,0,0,0.12); display: block; margin: 0; padding: 0; list-style: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-tabs-header-wrapper:after { content: ''; display: table; clear: both; }
    .md2-prev-button,
    .md2-next-button { position: absolute; top: 0; height: 100%; width: 32px; padding: 8px 0; z-index: 2; cursor: pointer; }
    .md2-prev-button { left: 0; }
    .md2-next-button { right: 0; }
    .md2-prev-button.disabled,
    .md2-next-button.disabled { opacity: .25; cursor: default; }
    .md2-prev-button .prev-icon,
    .md2-next-button .next-icon { display: block; width: 12px; height: 12px; font-size: 0; border-width: 0 0 2px 2px; border-style: solid; border-color: #757575; border-radius: 1px; transform: rotate(45deg); margin: 10px; }
    .md2-next-button .next-icon { border-width: 2px 2px 0 0; }
    .md2-tabs-canvas { position: relative; overflow: hidden; display: block; outline: none; }
    .md2-tabs-canvas.md2-paginated { margin: 0 32px; }
    .md2-tabs-header { position: relative; display: inline-block; white-space: nowrap; -moz-transition: 0.5s cubic-bezier(0.35,0,0.25,1); -o-transition: 0.5s cubic-bezier(0.35,0,0.25,1); -webkit-transition: 0.5s cubic-bezier(0.35,0,0.25,1); transition: 0.5s cubic-bezier(0.35,0,0.25,1); }
    .md2-tab-label { position: relative; color: rgba(0,0,0,0.54); font-size: 14px; text-align: center; line-height: 24px; padding: 12px 24px; -moz-transition: background-color .35s cubic-bezier(.35,0,.25,1); -o-transition: background-color .35s cubic-bezier(.35,0,.25,1); -webkit-transition: background-color .35s cubic-bezier(.35,0,.25,1); transition: background-color .35s cubic-bezier(.35,0,.25,1); cursor: pointer; white-space: nowrap; text-transform: uppercase; display: inline-block; font-weight: 500; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }
    .md2-tab-label.active { color: rgb(16,108,200); }
    .md2-tab-label:after { background-color: rgb(255,82,82); bottom: 0; content: ''; height: 2px; left: 45%; position: absolute; transition: .2s cubic-bezier(.4,0,.2,1); visibility: hidden; width: 10px; }
    .md2-tab-label.active:after { left: 0; visibility: visible; width: 100%; }
    .md2-tabs-canvas:focus .md2-tab-label.focus { background: rgba(0,0,0,0.05); }
    .md2-tab-label.disabled { color: rgba(0,0,0,0.26); pointer-events: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-drag: none; opacity: 0.5; cursor: default; }
    .md2-tabs-body-wrapper { position: relative; min-height: 0; display: block; clear: both; }
    .md2-tab { padding: 16px; display: none; position: relative; }
    .md2-tab.active { display: block; position: relative; }
  `],
        host: {
            '[ngClass]': 'md2Class',
            '[class.md2-tabs]': 'true',
            '(window:resize)': 'onWindowResize($event)'
        },
        directives: [transclude_1.Md2Transclude],
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], Md2Tabs);
exports.Md2Tabs = Md2Tabs;
exports.TABS_DIRECTIVES = [Md2Tabs, Md2Tab, Md2TabLabel];

//# sourceMappingURL=tabs.js.map
