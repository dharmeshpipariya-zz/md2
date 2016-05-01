import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Provider, ViewEncapsulation, forwardRef} from 'angular2/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from 'angular2/src/common/forms/directives/control_value_accessor';
import {CONST_EXPR } from 'angular2/src/facade/lang';

let nextId = 0;

const MD2_SWITCH_CONTROL_VALUE_ACCESSOR = CONST_EXPR(new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => Md2Switch),
        multi: true
    }));

enum TransitionCheckState {
    Init,
    Checked,
    Unchecked
}

@Component({
    selector: 'md2-switch',
    templateUrl: './components/switch/switch.html',
    styleUrls: ['./components/switch/switch.css'],
    host: {
        'role': 'checkbox',
        '[id]': 'id',
        '[class.md2-switch]': 'true',
        '[class.md2-switch-checked]': 'checked',
        '[class.md2-switch-disabled]': 'disabled',
        '[tabindex]': 'disabled ? -1 : tabindex',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-labelledby]': 'labelId',
        '[attr.aria-checked]': 'getAriaChecked()',
        '[attr.aria-disabled]': 'disabled',
        '(click)': 'onInteractionEvent($event)',
        '(keyup.space)': 'onInteractionEvent($event)',
        '(blur)': 'onTouched()'
    },
    providers: [MD2_SWITCH_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Md2Switch implements ControlValueAccessor {

    @Input( 'aria-label' ) ariaLabel: string = '';

    @Input() id: string = 'md2-switch-${++nextId}';

    @Input() disabled: boolean = false;

    @Input() tabindex: number = 0;

    @Output() change: EventEmitter<boolean> = new EventEmitter();

    onTouched: () => any = () => { };

    private _checked: boolean = false;

    private _changeSubscription: { unsubscribe: () => any } = null;

    @Input() get checked() {
        return this._checked;
    }

    set checked(checked: boolean) {
        this._checked = checked;
        this.change.emit(this._checked);
    }

    get labelId() { return '${this.id}-label'; }

    getAriaChecked() { return this.checked ? 'true' : 'false'; }

    toggle() { this.checked = !this.checked; }

    onInteractionEvent(event: Event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        this.toggle();
    }

    writeValue(value: any) {
        this.checked = !!value;
    }

    registerOnChange(fn: any) {
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        this._changeSubscription = <{ unsubscribe: () => any }>this.change.subscribe(fn);
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

}