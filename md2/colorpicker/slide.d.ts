import { ElementRef, EventEmitter } from '@angular/core';
export declare class Md2Slide {
    private _element;
    private mouseMoveListener;
    private mouseUpListener;
    slide: string;
    slideChange: EventEmitter<any>;
    constructor(_element: ElementRef);
    _handleMousedown(event: any): void;
    _handleMousemove(event: any): void;
    _handleMouseup(event: any): void;
    _emitChangeEvent(event: any): void;
}
