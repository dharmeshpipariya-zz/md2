import { EventEmitter } from 'angular2/core';
import { ControlValueAccessor } from 'angular2/common';
export declare class Md2Switch implements ControlValueAccessor {
    ariaLabel: string;
    id: string;
    disabled: boolean;
    tabindex: number;
    change: EventEmitter<boolean>;
    onTouched: () => any;
    private _currentAnimationClass;
    private _currentCheckState;
    private _checked;
    private _indeterminate;
    private _changeSubscription;
    constructor();
    checked: boolean;
    indeterminate: boolean;
    labelId: string;
    getAriaChecked(): string;
    toggle(): void;
    onInteractionEvent(event: Event): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private _getAnimationClassForCheckStateTransition(oldState, newState);
}
