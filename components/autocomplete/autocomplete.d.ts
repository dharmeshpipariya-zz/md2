import { EventEmitter, ElementRef } from 'angular2/core';
import { AutocompleteItem } from './autocomplete-item';
import { IOptionsBehavior } from './autocomplete-interfaces';
export declare class Autocomplete {
    element: ElementRef;
    placeholder: string;
    item: string;
    initData: Array<any>;
    items: Array<any>;
    disabled: boolean;
    data: EventEmitter<any>;
    ngModel: EventEmitter<any>;
    removed: EventEmitter<any>;
    typed: EventEmitter<any>;
    options: Array<AutocompleteItem>;
    itemObjects: Array<AutocompleteItem>;
    active: Array<AutocompleteItem>;
    activeOption: AutocompleteItem;
    private offSideClickHandler;
    private inputMode;
    private optionsOpened;
    private behavior;
    private inputValue;
    private _items;
    private _disabled;
    constructor(element: ElementRef);
    private focusToInput(value?);
    private matchClick(e);
    private mainClick(e);
    private open();
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getOffSideClickHandler(context);
    remove(item: AutocompleteItem): void;
    doEvent(type: string, value: any): void;
    private hideOptions();
    inputEvent(e: any, isUpMode?: boolean): void;
    private selectActiveMatch();
    private matchItem(value, e?);
    private activeItem(value);
    private isActive(value);
}
export declare class Behavior {
    actor: Autocomplete;
    optionsMap: Map<string, number>;
    constructor(actor: Autocomplete);
    private getActiveIndex(optionsMap?);
    fillOptionsMap(): void;
    ensureHighlightVisible(optionsMap?: Map<string, number>): void;
}
export declare class GenericBehavior extends Behavior implements IOptionsBehavior {
    actor: Autocomplete;
    constructor(actor: Autocomplete);
    first(): void;
    last(): void;
    prev(): void;
    next(): void;
    filter(query: RegExp): void;
}
export declare class ChildrenBehavior extends Behavior implements IOptionsBehavior {
    actor: Autocomplete;
    constructor(actor: Autocomplete);
    first(): void;
    last(): void;
    prev(): void;
    next(): void;
    filter(query: RegExp): void;
}
export declare const Md2Autocomplete: Array<any>;
