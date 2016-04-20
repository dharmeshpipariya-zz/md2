import { ElementRef } from 'angular2/core';
export declare class Md2Dialog {
    private _el;
    displayed: boolean;
    closeOnUnfocus: boolean;
    closeButton: boolean;
    dialogTitle: string;
    constructor(el: ElementRef);
    clickElement(e: any): void;
    getElement(): HTMLElement;
    hide(): boolean;
    show(isDisplayed: boolean): boolean;
}
