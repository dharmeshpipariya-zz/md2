import { ElementRef, OnDestroy, EventEmitter, Renderer, QueryList, ViewContainerRef, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Overlay, Portal } from '../core';
import { ColorLocale } from './color-locale';
import { Md2ColorSpectrum } from './color-spectrum';
import { Md2Slide } from './slide';
/** Change event object emitted by Md2Colorpicker. */
export declare class Md2ColorChange {
    source: Md2Colorpicker;
    color: string;
    constructor(source: Md2Colorpicker, color: string);
}
export declare class Md2Colorpicker implements OnDestroy, ControlValueAccessor {
    private _element;
    private overlay;
    private _viewContainerRef;
    private _renderer;
    private _locale;
    _control: NgControl;
    private _portal;
    private _overlayRef;
    private _backdropSubscription;
    private _positionSubscription;
    /** Whether or not the overlay panel is open. */
    private _panelOpen;
    private _value;
    private _color;
    _isDark: boolean;
    /** Whether filling out the select is required in the form.  */
    private _required;
    /** Whether the select is disabled.  */
    private _disabled;
    /** The placeholder displayed in the trigger of the select. */
    private _placeholder;
    _formats: Array<string>;
    _onChange: (value: any) => void;
    _onTouched: () => void;
    constructor(_element: ElementRef, overlay: Overlay, _viewContainerRef: ViewContainerRef, _renderer: Renderer, _locale: ColorLocale, _control: NgControl);
    ngOnDestroy(): void;
    /** Event emitted when the select has been opened. */
    onOpen: EventEmitter<void>;
    /** Event emitted when the select has been closed. */
    onClose: EventEmitter<void>;
    /** Event emitted when the selected date has been changed by the user. */
    change: EventEmitter<Md2ColorChange>;
    templatePortals: QueryList<Portal<any>>;
    value: string;
    color: string;
    /** Placeholder to be shown if no value has been selected. */
    placeholder: string;
    required: boolean;
    /** Whether the component is disabled. */
    disabled: any;
    tabindex: number;
    /** Whether or not the overlay panel is open. */
    readonly panelOpen: boolean;
    /** Toggles the overlay panel open or closed. */
    toggle(): void;
    /** Opens the overlay panel. */
    open(): void;
    /** Closes the overlay panel and focuses the host element. */
    close(): void;
    /** Removes the panel from the DOM. */
    destroyPanel(): void;
    _handleKeydown(event: KeyboardEvent): void;
    _onBlur(): void;
    _onPanelDone(): void;
    _setFormat(format: string): void;
    _spectrumColorChange(event: string): void;
    _clearValue(event: Event): void;
    _onClickOk(): void;
    /** Emits an event when the user selects a color. */
    _emitChangeEvent(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
    /** Focuses the host element when the panel closes. */
    private _focusHost();
    private _subscribeToBackdrop();
    /**
     *  This method creates the overlay from the provided panel's template and saves its
     *  OverlayRef so that it can be attached to the DOM when open is called.
     */
    private _createOverlay();
    private _cleanUpSubscriptions();
}
export declare const MD2_COLORPICKER_DIRECTIVES: (typeof Md2ColorSpectrum | typeof Md2Slide | typeof Md2Colorpicker)[];
export declare class Md2ColorpickerModule {
    static forRoot(): ModuleWithProviders;
}
