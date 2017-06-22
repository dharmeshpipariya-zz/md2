import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-color-spectrum1',
  templateUrl: 'color-spectrum1.html',
  styleUrls: ['color-spectrum1.css'],
  host: {
    'role': 'color-spectrum'
  },
  //encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2ColorSpectrum1 implements AfterContentInit {
  /** The selected color. */
  @Input()
  get selected(): string { return this._selected; }
  set selected(value: string) {
    //this._selected = this._util.parse(value);
    this._selected = value;
  }
  private _selected: string;

  /** Emits when the currently selected date changes. */
  @Output() selectedChange = new EventEmitter<Date>();

  constructor(private _element: ElementRef) { }

  ngAfterContentInit() {
    this._init();
  }

  /** Handles color selection. */
  _colorSelected(value: string): void {
  }

  /** Initializes this clock view. */
  private _init() {
  }

  /**
   * Set Hue
   */
  private setHue() {
  }

}