import {
  AfterViewInit,
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
} from '../core';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { Subscription } from 'rxjs/Subscription';


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
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[class.md2-colorpicker-disabled]': 'disabled',
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

  private _color: string = null;

  /** Whether filling out the select is required in the form.  */
  private _required: boolean = false;

  /** Whether the select is disabled.  */
  private _disabled: boolean = false;

  _onChange = (value: any) => { };
  _onTouched = () => { };

  @Input()
  get color() { return this._color; }
  set color(value: string) { this._color = value; }

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
    @Self() @Optional() public _control: NgControl) {
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
    //if (this.disabled) {
    //  return;
    //}
    //this._calculateOverlayPosition();
    //this._placeholderState = this._isRtl() ? 'floating-rtl' : 'floating-ltr';




    //if (!this._panelOpen) {
    if (!this._overlayRef) {
      let config = new OverlayState();

      config.positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally();
      config.hasBackdrop = true;
      config.backdropClass = 'cdk-overlay-transparent-backdrop';

      this._overlayRef = this.overlay.create(config);
      this._overlayRef.attach(this.templatePortals.first);
      this._subscribeToBackdrop();
    }

    //  this._overlayRef.attach(this._portal);

    //  this._initMenu();
    //}
    this._panelOpen = true;
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    this._panelOpen = false;
    //if (!this._selected) {
    //  this._placeholderState = '';
    //}
    //this._focusHost();
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._backdropSubscription.unsubscribe();
      //  this._resetMenu();
    }
  }

  private _subscribeToBackdrop(): void {
    this._overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  /** Removes the panel from the DOM. */
  destroyPanel(): void {
    //if (this._overlayRef) {
    //  this._overlayRef.dispose();
    //  this._overlayRef = null;

    //  this._cleanUpSubscriptions();
    //}
  }




  /** Emits an event when the user selects a color. */
  _emitChangeEvent(): void {
    this._onChange(this.color);
    this.change.emit(new Md2ColorChange(this, this.color));
  }

  writeValue(value: any): void {

  }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

}

export const MD2_COLORPICKER_DIRECTIVES = [Md2Colorpicker];

@NgModule({
  imports: [CommonModule],
  exports: MD2_COLORPICKER_DIRECTIVES,
  declarations: MD2_COLORPICKER_DIRECTIVES,
})
export class Md2ColorpickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2ColorpickerModule,
      providers: []
    };
  }
}
