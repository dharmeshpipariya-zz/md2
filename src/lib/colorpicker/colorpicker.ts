import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  Optional,
  EventEmitter,
  Renderer,
  Self,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import {
  Overlay,
  OverlayState,
  OverlayRef,
  Portal,
  TemplatePortal,
  TemplatePortalDirective,
  HorizontalConnectionPos,
  VerticalConnectionPos,
} from '../core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { Subscription } from 'rxjs/Subscription';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
import { ColorLocale } from './color-locale';
import { ColorUtil, Rgba } from './color-util';
import { Container, PanelPositionX, PanelPositionY } from '../datepicker/datepicker';

/** Change event object emitted by Md2Colorpicker. */
export class Md2ColorChange {
  constructor(public source: Md2Colorpicker, public color: string) { }
}

@Component({
  moduleId: module.id,
  selector: 'md2-colorpicker',
  templateUrl: 'colorpicker.html',
  styleUrls: ['colorpicker.css'],
  host: {
    'role': 'colorpicker',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': '_control?.invalid || "false"',
    '[class.md2-colorpicker-disabled]': 'disabled',
    '(window:resize)': '_handleWindowResize($event)'
  },
  animations: [
    trigger('fadeInContent', [
      state('showing', style({ opacity: 1 })),
      transition('void => showing', [
        style({ opacity: 0 }),
        animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class Md2Colorpicker implements OnDestroy, ControlValueAccessor {

  private _portal: TemplatePortal;
  private _overlayRef: OverlayRef;
  private _backdropSubscription: Subscription;
  private _positionSubscription: Subscription;

  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  private _value: string = null;
  private _color: string = null;
  _isDark: boolean = false;

  /** Whether filling out the select is required in the form.  */
  private _required: boolean = false;

  /** Whether the select is disabled.  */
  private _disabled: boolean = false;

  /** Whether the select is disabled.  */
  private _format: string;

  /** The placeholder displayed in the trigger of the select. */
  private _placeholder: string;

  private _container: Container = 'inline';
  private _openOnFocus: boolean = false;

  /** Position of the menu in the X axis. */
  positionX: PanelPositionX = 'after';

  /** Position of the menu in the Y axis. */
  positionY: PanelPositionY = 'below';

  overlapTrigger: boolean = true;

  _formats: Array<string> = ['hex', 'rgb', 'hsl'];
  _inputFocused: boolean = false;

  _onChange = (value: any) => { };
  _onTouched = () => { };

  constructor(private _element: ElementRef, private overlay: Overlay,
    private _viewContainerRef: ViewContainerRef, private _renderer: Renderer,
    private _locale: ColorLocale, private _util: ColorUtil,
    @Self() @Optional() public _control: NgControl) {
    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  ngOnDestroy() { this.destroyPanel(); }

  /** Event emitted when the select has been opened. */
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the select has been closed. */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the selected date has been changed by the user. */
  @Output() change: EventEmitter<Md2ColorChange> = new EventEmitter<Md2ColorChange>();

  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>;

  @Input()
  get format() { return this._format || this._locale.formatColor; }
  set format(value: string) {
    if (this._format !== value) {
      this._format = value;
    }
  }

  @Input()
  get value() { return this._value; }
  set value(value: string) {
    if (value && this._value !== value) {
      this._value = value;
    } else {
      this._value = this._locale.defaultColor;
    }
    let hsva = this._util.stringToHsva(this._value);
    let rgba = this._util.denormalizeRGBA(this._util.hsvaToRgba(hsva));
    let rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
    this._value = this._util.outputFormat(hsva, this._locale.formatColor);
    if (Math.round((rgbaText.r * 299 + rgbaText.g * 587 + rgbaText.b * 114) / 1000) >= 128
      || hsva.a < 0.35) {
      this._isDark = true;
    } else {
      this._isDark = false;
    }
  }

  @Input()
  get color() { return this._color; }
  set color(value: string) { this._color = value; }

  @Input()
  get container() { return this._container; }
  set container(value: Container) {
    if (this._container !== value) {
      this._container = value || 'inline';
      this.destroyPanel();
    }
  }

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
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  @Input() okLabel: string = 'Ok';
  @Input() cancelLabel: string = 'Cancel';
  @Input() tabindex: number = 0;

  @Input()
  get openOnFocus(): boolean { return this._openOnFocus; }
  set openOnFocus(value: boolean) { this._openOnFocus = coerceBooleanProperty(value); }

  @Input()
  set isOpen(value: boolean) {
    if (value && !this.panelOpen) {
      this.open();
    }
  }

  /** Whether or not the overlay panel is open. */
  get panelOpen(): boolean { return this._panelOpen; }

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
    this.value = this.color;
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    this._panelOpen = false;
    // if (!this._color) {
    //  this._placeholderState = '';
    // }
    this._focusHost();
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._backdropSubscription.unsubscribe();
    }
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
    if (event.keyCode === ENTER || event.keyCode === SPACE) {
      this.toggle();
    }
  }

  _onBlur() {
    if (!this.panelOpen) {
      this._onTouched();
    }
  }

  _handleFocus(event: Event) {
    this._inputFocused = true;
  }

  _handleBlur(event: Event) {
    this._inputFocused = false;
    if (!this.panelOpen) {
      this._onTouched();
    }
    if (this._util.isColorValid(this.color)) { this._emitChangeEvent(); }
  }

  _handleWindowResize(event: Event) {
    if (this.container === 'inline') {
      this.close();
    }
  }

  _onPanelDone(): void {
    if (this.panelOpen) {
      this._renderer.invokeElementMethod(document.querySelectorAll('.md2-colorpicker-panel')[0], 'focus');
      this.onOpen.emit();
    } else {
      this.onClose.emit();
    }
  }

  _setFormat(format: string) {
    this._locale.formatColor = format;
    let hsva = this._util.stringToHsva(this._value);
    if (this._locale.formatColor === 'hex' && hsva.a < 1) {
      this._locale.formatColor = 'rgb';
    }
    this._value = this._util.outputFormat(hsva, this._locale.formatColor);
  }

  _spectrumColorChange(event: string) {
    this.value = event;
  }

  _clearValue(event: Event) {
    event.stopPropagation();
    this.color = null;
  }

  _onClickOk(): void {
    this.color = this.value;
    this._emitChangeEvent();
    this.close();
  }

  /** Emits an event when the user selects a color. */
  _emitChangeEvent(): void {
    this._onChange(this.color);
    this.change.emit(new Md2ColorChange(this, this.color));
  }

  writeValue(value: any): void {
    this.color = value;
  }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Focuses the host element when the panel closes. */
  private _focusHost(): void {
    this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
  }

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
      if (this.container === 'inline') {
        const [posX, fallbackX]: HorizontalConnectionPos[] =
          this.positionX === 'before' ? ['end', 'start'] : ['start', 'end'];

        const [overlayY, fallbackOverlayY]: VerticalConnectionPos[] =
          this.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

        let originY = overlayY;
        let fallbackOriginY = fallbackOverlayY;

        if (!this.overlapTrigger) {
          originY = overlayY === 'top' ? 'bottom' : 'top';
          fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
        }
        config.positionStrategy = this.overlay.position().connectedTo(this._element,
          { originX: posX, originY: originY },
          { overlayX: posX, overlayY: overlayY })
          .withFallbackPosition(
          { originX: fallbackX, originY: originY },
          { overlayX: fallbackX, overlayY: overlayY })
          .withFallbackPosition(
          { originX: posX, originY: fallbackOriginY },
          { overlayX: posX, overlayY: fallbackOverlayY })
          .withFallbackPosition(
          { originX: fallbackX, originY: fallbackOriginY },
          { overlayX: fallbackX, overlayY: fallbackOverlayY });
        config.hasBackdrop = true;
        config.backdropClass = 'cdk-overlay-transparent-backdrop';
      } else {
        config.positionStrategy = this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically();
        config.hasBackdrop = true;
      }
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
