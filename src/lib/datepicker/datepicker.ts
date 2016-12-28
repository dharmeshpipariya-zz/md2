import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  QueryList,
  Renderer,
  ViewEncapsulation,
  ViewChild,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Calendar } from './calendar';
import {
  DefaultStyleCompatibilityModeModule,
  ENTER,
  SPACE
} from '../core/core';
import { Dir } from '../core/rtl/dir';
import { Subscription } from 'rxjs/Subscription';
import { transformPlaceholder, transformPanel, fadeInContent } from './datepicker-animations';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { ConnectedOverlayDirective } from '../core/overlay/overlay-directives';
import { ViewportRuler } from '../core/overlay/position/viewport-ruler';

/** Change event object emitted by Md2Datepicker. */
export class Md2DatepickerChange {
  source: Md2Datepicker;
  value: any;
}

@Component({
  moduleId: module.id,
  selector: 'md2-datepicker',
  templateUrl: 'datepicker.html',
  styleUrls: ['datepicker.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'role': 'listbox',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': '_control?.invalid || "false"',
    '[class.md2-datepicker-disabled]': 'disabled',
    '(keydown)': '_handleKeydown($event)',
    '(blur)': '_onBlur()'
  },
  animations: [
    transformPlaceholder,
    transformPanel,
    fadeInContent
  ],
  exportAs: 'md2Datepicker',
})
export class Md2Datepicker implements ControlValueAccessor {
  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  /** The value of date. */
  private _value: Date = new Date();

  private _min: Date = null;
  private _max: Date = null;

  /** Whether filling out the datepicker is required in the form.  */
  private _required: boolean = false;

  /** Whether the datepicker is disabled.  */
  private _disabled: boolean = false;

  /** The placeholder displayed in the trigger of the datepicker. */
  private _placeholder: string;

  /** The animation state of the placeholder. */
  _placeholderState = '';

  /** View -> model callback called when value changes */
  _onChange = (value: any) => { };

  /** View -> model callback called when datepicker has been touched */
  _onTouched = () => { };

  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild(ConnectedOverlayDirective) overlayDir: ConnectedOverlayDirective;

  @Output() change: EventEmitter<Md2DatepickerChange> = new EventEmitter<Md2DatepickerChange>();

  @Input()
  get min() { return this._min; }
  set min(value: Date) { this._min = new Date(value); }

  @Input()
  get max() { return this._max; }
  set max(value: Date) { this._max = new Date(value); }

  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(value: string) { this._placeholder = value; }

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  @Input()
  get required() { return this._required; }
  set required(value: any) { this._required = coerceBooleanProperty(value); }

  @Output() onOpen = new EventEmitter();
  @Output() onClose = new EventEmitter();

  constructor(private _element: ElementRef, private _renderer: Renderer,
    private _viewportRuler: ViewportRuler, @Optional() private _dir: Dir,
    @Optional() public _control: NgControl) {
    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  ///** Toggles the overlay panel open or closed. */
  //toggle(): void { }

  ///** Opens the overlay panel. */
  //open(): void {
  //  if (this.disabled) {
  //    return;
  //  }
  //  this._placeholderState = this._isRtl() ? 'floating-rtl' : 'floating-ltr';
  //  this._panelOpen = true;
  //}

  ///** Closes the overlay panel and focuses the host element. */
  //close(): void {
  //  this._panelOpen = false;
  //  if (!this._value) {
  //    this._placeholderState = '';
  //  }
  //  this._focusHost();
  //}

  ///** Dispatch change event with current datepicker and value. */
  //_emitChangeEvent(): void {
  //  let event = new Md2DatepickerChange();
  //  event.source = this;
  //  event.value = this._value;
  //  this._onChange(event.value);
  //  this.change.emit(event);
  //}

  writeValue(value: any): void { }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

  //get value(): Date { return this._value; }

  //_isRtl(): boolean { return this._dir ? this._dir.value === 'rtl' : false; }

  _handleKeydown(event: KeyboardEvent): void {
    //  if (event.keyCode === ENTER || event.keyCode === SPACE) {
    //    this.open();
    //  }
  }

  _onBlur() {
    //if (!this.panelOpen) {
    //  this._onTouched();
    //}
  }

  _getTabIndex() {
    return this.disabled ? '-1' : '0';
  }

  //private _focusHost(): void {
  //  this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
  //}

}


@NgModule({
  imports: [CommonModule, DefaultStyleCompatibilityModeModule],
  exports: [Md2Datepicker, Md2Calendar, DefaultStyleCompatibilityModeModule],
  declarations: [Md2Datepicker, Md2Calendar],
})
export class Md2DatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2DatepickerModule
    };
  }
}
