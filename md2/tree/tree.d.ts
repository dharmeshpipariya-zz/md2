import { ModuleWithProviders } from '@angular/core';
export declare class Md2Tree {
    value: Array<any>;
}
export declare class Md2TreeItem {
    private _isExpanded;
    value: any;
    readonly isExpanded: boolean;
    _handleClick(event: Event): void;
}
export declare class Md2TreeModule {
    static forRoot(): ModuleWithProviders;
}
