import { ElementRef } from "angular2/core";
export declare class Md2Menu {
    element: ElementRef;
    menuLabel: string;
    private isVisible;
    private clickHandler;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getClickHandler(context);
    private toggleMenu();
}
