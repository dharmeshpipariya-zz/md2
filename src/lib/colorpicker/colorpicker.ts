import {
  AfterViewInit,
  Directive,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  Optional,
  EventEmitter,
  Renderer,
  Self,
  TemplateRef,
  ViewChild,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Overlay,
  OverlayModule,
  OverlayState,
  OverlayRef,
  OverlayOrigin,
  Portal,
  TemplatePortal,
  PortalModule,
  TemplatePortalDirective,
  OverlayContainer
} from '../core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { Subscription } from 'rxjs/Subscription';
import { ColorLocale } from './color-locale';


/** Change event object emitted by Md2Colorpicker. */
export class Md2ColorChange {
  constructor(public source: Md2Colorpicker, public date: string) { }
}

@Component({
  moduleId: module.id,
  selector: 'md2-colorpicker',
  templateUrl: 'colorpicker.html',
  styleUrls: ['colorpicker.css'],
  host: {
    'role': 'colorpicker',
    '[id]': 'id',
    '[class.md2-colorpicker-disabled]': 'disabled',
    '[attr.tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': '_control?.invalid || "false"',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Colorpicker implements AfterViewInit, OnDestroy, ControlValueAccessor {

  private _portal: TemplatePortal;
  private _overlayRef: OverlayRef;
  private _backdropSubscription: Subscription;
  private _positionSubscription: Subscription;

  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  private _value: string = null;

  /** Whether filling out the select is required in the form.  */
  private _required: boolean = false;

  /** Whether the select is disabled.  */
  private _disabled: boolean = false;

  /** The placeholder displayed in the trigger of the select. */
  private _placeholder: string;

  _formats: Array<string> = ['hex', 'rgb', 'hsl'];

  _onChange = (value: any) => { };
  _onTouched = () => { };

  @Input() tabindex: number = 0;

  @Input()
  get value() { return this._value; }
  set value(value: string) { this._value = value; }

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  get placeholder() { return this._placeholder; }
  set placeholder(value: string) { this._placeholder = value; }

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  /** Whether the component is disabled. */
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  /** Event emitted when the select has been opened. */
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the select has been closed. */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the selected date has been changed by the user. */
  @Output() change: EventEmitter<Md2ColorChange> = new EventEmitter<Md2ColorChange>();

  //@ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;
  //@ViewChildren(TemplatePortalDirective) templatePortal: Portal<any>;
  //@ViewChild(OverlayOrigin) _overlayOrigin: OverlayOrigin;

  constructor(private _element: ElementRef, private overlay: Overlay,
    private _viewContainerRef: ViewContainerRef, private _renderer: Renderer,
    private _locale: ColorLocale, @Self() @Optional() public _control: NgControl) {
    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  ngAfterViewInit() {
    //this.menu.close.subscribe(() => this.close());
  }

  ngOnDestroy() { this.destroyPanel(); }

  /** Whether or not the overlay panel is open. */
  get panelOpen(): boolean {
    return this._panelOpen;
  }

  /** Toggles the overlay panel open or closed. */
  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this.disabled) { return; }
    this._createOverlay();
    this._overlayRef.attach(this.templatePortals.first);
    this._subscribeToBackdrop();
    this._panelOpen = true;
    this.onOpen.emit();
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    this._panelOpen = false;
    //if (!this._color) {
    //  this._placeholderState = '';
    //}
    //this._focusHost();
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._backdropSubscription.unsubscribe();
    }
    this.onClose.emit();
  }

  /** Removes the panel from the DOM. */
  destroyPanel(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;

      this._cleanUpSubscriptions();
    }
  }

  _handleKeydown(event: KeyboardEvent) {
    if (this.disabled) { return; }
  }

  _onFocus() {
    //if (!this.panelOpen && this.openOnFocus) {
    //  this.open();
    //}
  }

  _onBlur() {
    if (!this.panelOpen) {
      this._onTouched();
    }
  }

  _clearValue(event: Event) {
    event.stopPropagation();
    this.value = null;
  }

  /** Emits an event when the user selects a color. */
  _emitChangeEvent(): void {
    this._onChange(this.value);
    this.change.emit(new Md2ColorChange(this, this.value));
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

  private _subscribeToBackdrop(): void {
    this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  /**
   *  This method creates the overlay from the provided panel's template and saves its
   *  OverlayRef so that it can be attached to the DOM when open is called.
   */
  private _createOverlay(): void {
    if (!this._overlayRef) {
      let config = new OverlayState();
      config.positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();
      config.hasBackdrop = true;
      config.backdropClass = 'cdk-overlay-dark-backdrop';

      this._overlayRef = this.overlay.create(config);
    }
  }

  private _cleanUpSubscriptions(): void {
    if (this._backdropSubscription) {
      this._backdropSubscription.unsubscribe();
    }
    if (this._positionSubscription) {
      this._positionSubscription.unsubscribe();
    }
  }

}

@Directive({
  selector: '[slider]',
  host: {
    '(mousedown)': '_handleMousedown($event)',
  }
})
export class Md2Slider {

  private mouseMoveListener: any;
  private mouseUpListener: any;

  @Input() slider: string = 'x';
  @Input('rgX') rgX: number;
  @Input('rgY') rgY: number;

  @Output('newValue') newValue = new EventEmitter<any>();

  constructor(private _element: ElementRef) {
    this.mouseMoveListener = (event: any) => { this._handleMousemove(event) };
    this.mouseUpListener = () => { this._handleMouseup() };
  }

  _handleMousedown(event: any) {
    this.setPointer(event);
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
  }

  _handleMousemove(event: any) {
    event.preventDefault();
    this.setPointer(event);
  }

  _handleMouseup() {
    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
  }

  private getX(event: any): number {
    return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this._element.nativeElement.getBoundingClientRect().left - window.pageXOffset;
  }

  private getY(event: any): number {
    return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this._element.nativeElement.getBoundingClientRect().top - window.pageYOffset;
  }

  private setPointer(event: Event): void {
    let height = this._element.nativeElement.offsetHeight;
    let width = this._element.nativeElement.offsetWidth;
    let x = Math.max(0, Math.min(this.getX(event), width));
    let y = Math.max(0, Math.min(this.getY(event), height));

    if (this.rgX !== undefined && this.rgY !== undefined) {
      this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
    } else if (this.rgX === undefined && this.rgY !== undefined) {
      this.newValue.emit({ v: y / height, rg: this.rgY });
    } else {
      this.newValue.emit({ v: x / width, rg: this.rgX });
    }
  }

}

export const MD2_COLORPICKER_DIRECTIVES = [Md2Colorpicker, Md2Slider];

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: MD2_COLORPICKER_DIRECTIVES,
  declarations: MD2_COLORPICKER_DIRECTIVES,
})
export class Md2ColorpickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2ColorpickerModule,
      providers: [ColorLocale]
    };
  }
}
