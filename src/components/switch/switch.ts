import {ChangeDetectionStrategy, Component, Provider, forwardRef, Input, Output, EventEmitter} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from 'angular2/common';

let nextId = 0;

const MD2_SWITCH_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => Md2Switch),
        multi: true
    });

/**
 * Represents the different states that require custom transitions between them.
 */
enum TransitionCheckState {
    /** The initial state of the component before any user interaction. */
    Init,
    /** The state representing the component when it's becoming checked. */
    Checked,
    /** The state representing the component when it's becoming unchecked. */
    Unchecked,
    /** The state representing the component when it's becoming indeterminate. */
    Indeterminate
}

@Component({
    selector: 'md2-switch',
    template: `
        <div class="md2-switch-layout">
            <div class="md2-switch-container">
                <div class="md2-switch-bar"></div>
                <div class="md2-switch-thumb-container">
                    <div class="md2-switch-thumb"></div>
                </div>
            </div>
            <label [id]="labelId">
                <ng-content></ng-content>
            </label>
        </div>
    `,
    styles: [`
        .md2-switch-layout { margin: 16px; margin-left: inherit; white-space: nowrap; cursor: pointer; outline: 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; min-height: 30px; line-height: 28px; -webkit-align-items: center; -ms-flex-align: center; align-items: center; display: -webkit-flex; display: -ms-flexbox; display: flex; }
        .md2-switch-layout label { border-color: transparent; border-width: 0; cursor: pointer; float: left; word-wrap: break-word; max-width: 100%; white-space: normal; line-height: normal; }
        .md-switch:focus { outline: none; }
        .md-switch .md2-switch-container { display: inline-block; cursor: pointer; width: 36px; min-width: 36px; height: 24px; position: relative; user-select: none; margin-right: 8px; }
        .md-switch.md-switch-disabled .md2-switch-container { cursor: not-allowed; }
        .md-switch.md-switch-disabled .md2-switch-bar { background-color: rgba(0, 0, 0, 0.12); }
        .md-switch.md-switch-disabled .md2-switch-thumb { background-color: #bdbdbd; }
        .md-switch .md2-switch-bar { left: 1px; width: 34px; top: 5px; height: 14px; border-radius: 8px; position: absolute; background-color: #9e9e9e; }
        .md-switch.md-switch-checked .md2-switch-bar { background-color: rgba(33, 150, 243, 0.5); }
        .md-switch.md-switch-checked .md2-switch-thumb-container { transform: translate3d(100%, 0, 0); }
        .md-switch.md-switch-checked .md2-switch-thumb { background-color: #2196f3; }
        .md-switch .md2-switch-thumb-container { top: 2px; left: 0; width: 16px; position: absolute; transform: translate3d(0, 0, 0); z-index: 1; }
        .md-switch .md2-switch-thumb { position: absolute; margin: 0; left: 0; top: 0; outline: none; height: 20px; width: 20px; border-radius: 50%; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); background-color: #fafafa; }
        .md-switch:not(.md-switch-dragging) .md2-switch-bar { transition-delay: 0.05s; transition: all 0.08s linear; transition-property: transform, background-color; }
        .md-switch:not(.md-switch-dragging) .md2-switch-thumb { transition-delay: 0.05s; transition: all 0.08s linear; transition-property: transform, background-color; }
        .md-switch:not(.md-switch-dragging) .md2-switch-thumb-container { transition: all 0.08s linear; transition-property: transform, background-color; }
    `],
    host: {
        'role': 'checkbox',
        '[id]': 'id',
        '[class.md2-switch]': 'true',
        '[class.md2-switch-indeterminate]': 'indeterminate',
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Md2Switch implements ControlValueAccessor {

    @Input('aria-label') ariaLabel: string = '';

    @Input() id: string = `md-switch-${++nextId}`;

    @Input() disabled: boolean = false;

    /**
     * The tabindex attribute for the checkbox. Note that when the checkbox is disabled, the attribute
     * on the host element will be set to -1, regardless of the actual tabindex value.
     */
    @Input() tabindex: number = 0;

    /** Event emitted when the checkbox's `checked` value changes. */
    @Output() change: EventEmitter<boolean> = new EventEmitter();

    /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
    onTouched: () => any = () => { };

    private _currentAnimationClass: string = '';

    private _currentCheckState: TransitionCheckState = TransitionCheckState.Init;

    private _checked: boolean = false;

    private _indeterminate: boolean = false;

    private _changeSubscription: { unsubscribe: () => any } = null;

    constructor() { }

    /**
     * Whether the checkbox is checked. Note that setting `checked` will immediately set
     * `indeterminate` to false.
     */
    @Input() get checked() {
        return this._checked;
    }

    set checked(checked: boolean) {
        this._indeterminate = false;
        this._checked = checked;
        this.change.emit(this._checked);
    }

    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever `checked` is set, indeterminate is immediately set to
     * false. This differs from the web platform in that indeterminate state on native
     * checkboxes is only remove when the user manually checks the checkbox (rather than setting the
     * `checked` property programmatically). However, we feel that this behavior is more accommodating
     * to the way consumers would envision using this component.
     */
    @Input() get indeterminate() {
        return this._indeterminate;
    }

    set indeterminate(indeterminate: boolean) {
        this._indeterminate = indeterminate;
    }

    /** The id that is attached to the checkbox's label. */
    get labelId() {
        return `${this.id}-label`;
    }

    /** Returns the proper aria-checked attribute value based on the checkbox's state. */
    getAriaChecked() {
        if (this.indeterminate) {
            return 'mixed';
        }
        return this.checked ? 'true' : 'false';
    }

    /** Toggles the checked state of the checkbox. If the checkbox is disabled, this does nothing. */
    toggle() {
        this.checked = !this.checked;
    }

    /**
     * Event handler used for both (click) and (keyup.space) events. Delegates to toggle().
     */
    onInteractionEvent(event: Event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        this.toggle();
    }

    /** Implemented as part of ControlValueAccessor. */
    writeValue(value: any) {
        this.checked = !!value;
    }

    /** Implemented as part of ControlValueAccessor. */
    registerOnChange(fn: any) {
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        this._changeSubscription = <{ unsubscribe: () => any }>this.change.subscribe(fn);
    }

    /** Implemented as part of ControlValueAccessor. */
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    private _getAnimationClassForCheckStateTransition(
        oldState: TransitionCheckState, newState: TransitionCheckState): string {
        var animSuffix: string;

        switch (oldState) {
            case TransitionCheckState.Init:
                return '';
            case TransitionCheckState.Unchecked:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'unchecked-checked' : 'unchecked-indeterminate';
                break;
            case TransitionCheckState.Checked:
                animSuffix = newState === TransitionCheckState.Unchecked ?
                    'checked-unchecked' : 'checked-indeterminate';
                break;
            case TransitionCheckState.Indeterminate:
                animSuffix = newState === TransitionCheckState.Checked ?
                    'indeterminate-checked' : 'indeterminate-unchecked';
        }

        return `md-switch-anim-${animSuffix}`;
    }
}