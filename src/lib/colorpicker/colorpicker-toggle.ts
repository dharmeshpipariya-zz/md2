import {
  AfterContentInit,
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
} from '@angular/core';
import {
  Overlay,
  OverlayState,
  OverlayRef,
  ComponentPortal
} from '../core';

@Component({
  moduleId: module.id,
  selector: 'md2-color-panel',
  templateUrl: 'color-panel.html',
  styleUrls: ['color-panel.css'],
  host: {
    'class': 'mat-datepicker-content',
    //'[class.mat-datepicker-content-touch]': 'datepicker.touchUi',
  },
  //encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2ColorPanel implements AfterContentInit {
  colorpicker: Md2ColorpickerToggle;

  constructor(private _elementRef: ElementRef) { }

  ngAfterContentInit() {
    //this._elementRef.nativeElement.querySelector('.mat-calendar-content').focus();
  }
}


@Directive({
  selector: '[colorpicker]',
  host: {
    '(click)': 'toggle()'
  }
})
export class Md2ColorpickerToggle {
  @Input() colorpicker: string;

  /** Event emitted when the panel value has been changed by the user. */
  @Output() colorpickerChange: EventEmitter<string> = new EventEmitter<string>();

  /** Event emitted when the panel has been opened. */
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the panel has been closed. */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /** Whether the panel is open. */
  opened = false;

  ///** A reference to the overlay when the panel is opened. */
  private _overlayRef: OverlayRef;

  /** A portal containing the calendar for this datepicker. */
  private _pickerPortal: ComponentPortal<Md2ColorPanel>;

  constructor(private _element: ElementRef, private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef) { }

  /** Toggles the overlay panel open or closed. */
  toggle(): void {
    this.opened ? this.close() : this.open();
  }

  /** Open the panel. */
  open(): void {
    this._openAsPopup();
    this.opened = true;
    this.onOpen.emit();
  }

  /** Close the panel. */
  close(): void {
    //if (this._overlayRef && this._overlayRef.hasAttached()) {
    //  this._overlayRef.detach();
    //}
    //if (this._dialogRef) {
    //  this._dialogRef.close();
    //  this._dialogRef = null;
    //}
    //if (this._pickerPortal && this._pickerPortal.isAttached) {
    //  this._pickerPortal.detach();
    //}
    this.opened = false;
    this.onClose.emit();
  }

  /** Open the calendar as a popup. */
  private _openAsPopup(): void {
    if (!this._pickerPortal) {
      this._pickerPortal = new ComponentPortal(Md2ColorPanel, this._viewContainerRef);
    }

    if (!this._overlayRef) {
      this._createOverlay();
    }

    if (!this._overlayRef.hasAttached()) {
      let componentRef: ComponentRef<Md2ColorPanel> =
        this._overlayRef.attach(this._pickerPortal);
      componentRef.instance.colorpicker = this;
    }

    this._overlayRef.backdropClick().first().subscribe(() => this.close());
  }

  /** Create the popup. */
  private _createOverlay(): void {
    //const overlayState = new OverlayState();
    //overlayState.positionStrategy = this._createPositionStrategy();
    //overlayState.hasBackdrop = true;
    //overlayState.backdropClass = 'md2-overlay-transparent-backdrop';

    //this._overlayRef = this._overlay.create(overlayState);







    let config = new OverlayState();
    //if (this.container === 'inline') {
    //  const [posX, fallbackX]: HorizontalConnectionPos[] =
    //    this.positionX === 'before' ? ['end', 'start'] : ['start', 'end'];

    //  const [overlayY, fallbackOverlayY]: VerticalConnectionPos[] =
    //    this.positionY === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

    //  let originY = overlayY;
    //  let fallbackOriginY = fallbackOverlayY;

    //  if (!this.overlapTrigger) {
    //    originY = overlayY === 'top' ? 'bottom' : 'top';
    //    fallbackOriginY = fallbackOverlayY === 'top' ? 'bottom' : 'top';
    //  }
    //  config.positionStrategy = this.overlay.position().connectedTo(this._element,
    //    { originX: posX, originY: originY },
    //    { overlayX: posX, overlayY: overlayY })
    //    .withFallbackPosition(
    //    { originX: fallbackX, originY: originY },
    //    { overlayX: fallbackX, overlayY: overlayY })
    //    .withFallbackPosition(
    //    { originX: posX, originY: fallbackOriginY },
    //    { overlayX: posX, overlayY: fallbackOverlayY })
    //    .withFallbackPosition(
    //    { originX: fallbackX, originY: fallbackOriginY },
    //    { overlayX: fallbackX, overlayY: fallbackOverlayY });
    //  config.hasBackdrop = true;
    //  config.backdropClass = 'cdk-overlay-transparent-backdrop';
    //} else {
    config.positionStrategy = this._overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    config.hasBackdrop = true;
    //}
    this._overlayRef = this._overlay.create(config);
  }

}
