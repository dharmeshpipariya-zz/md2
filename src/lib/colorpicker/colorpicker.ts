import {
  Component,
  ElementRef,
  Input,
  Output,
  Optional,
  EventEmitter,
  Renderer,
  Self,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';


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
export class Md2Colorpicker implements ControlValueAccessor {

  private _color: string = null;

  _onChange = (value: any) => { };
  _onTouched = () => { };

  constructor(private _element: ElementRef, private _renderer: Renderer,
    @Self() @Optional() public _control: NgControl) {
    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  @Input()
  get color() { return this._color; }
  set color(value: string) { this._color = value; }

  /** Event emitted when the select has been opened. */
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the select has been closed. */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the selected date has been changed by the user. */
  @Output() change: EventEmitter<Md2ColorChange> = new EventEmitter<Md2ColorChange>();


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
