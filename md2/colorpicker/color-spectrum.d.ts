import { EventEmitter } from '@angular/core';
import { ColorLocale } from './color-locale';
export declare class Md2ColorSpectrum {
    private _locale;
    private _color;
    private hsva;
    _hue: string;
    _alpha: string;
    constructor(_locale: ColorLocale);
    colorChange: EventEmitter<string>;
    color: string;
    readonly saturation: any;
    readonly hue: {
        [key: string]: string;
    };
    readonly alpha: {
        [key: string]: string;
    };
    readonly alphaPointer: {
        [key: string]: string;
    };
    _setSaturation(event: any): void;
    _setHue(event: any): void;
    _setAlpha(event: any): void;
    private update(isInitialized);
    /** Emits an event when the user selects a color. */
    _emitChangeEvent(): void;
}
