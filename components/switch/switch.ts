/// ADAPTED FROM angular/material2 REPO.

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Provider,
  Renderer,
  ViewEncapsulation,
  forwardRef
} from 'angular2/core';

import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from 'angular2/src/common/forms/directives/control_value_accessor';
import {CONST_EXPR} from 'angular2/src/facade/lang';

/**
 * Monotonically increasing integer used to auto-generate unique ids for checkbox components.
 */
let nextId = 0;

/**
 * Provider Expression that allows md-checkbox to register as a ControlValueAccessor. This allows it
 * to support [(ngModel)] and ngControl.
 */
const MD_SWITCH_CONTROL_VALUE_ACCESSOR = CONST_EXPR(new Provider(
    NG_VALUE_ACCESSOR, {
      useExisting: forwardRef(() => MdSwitch),
      multi: true
    }));

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

/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. An MdCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://www.google.com/design/spec/components/selection-controls.html
 */
@Component({
  selector: 'md2-switch',
  template: `<div class="md2-switch-container">
                <div class="md2-switch-bar"></div>
                <div class="md2-switch-thumb-container">
                  <div class="md2-switch-thumb"></div>
                </div>
            </div>`,
  styles: [`
.md-switch:focus {
  outline: none; }
.md-switch .md2-switch-container {
  cursor: pointer;
  width: 36px;
  height: 24px;
  position: relative;
  user-select: none;
  margin-right: 8px; }
.md-switch.md-switch-disabled .md2-switch-container {
  cursor: not-allowed; }
.md-switch.md-switch-disabled .md2-switch-bar {
  background-color: rgba(0, 0, 0, 0.12); }
.md-switch.md-switch-disabled .md2-switch-thumb {
  background-color: #bdbdbd; }
.md-switch .md2-switch-bar {
  left: 1px;
  width: 34px;
  top: 5px;
  height: 14px;
  border-radius: 8px;
  position: absolute;
  background-color: #9e9e9e; }
.md-switch.md-switch-checked .md2-switch-bar {
  background-color: rgba(56, 126, 245, 0.5); }
.md-switch.md-switch-checked .md2-switch-thumb-container {
  transform: translate3d(100%, 0, 0); }
.md-switch.md-switch-checked .md2-switch-thumb {
  background-color: #387ef5; }
.md-switch .md2-switch-thumb-container {
  top: 2px;
  left: 0;
  width: 16px;
  position: absolute;
  transform: translate3d(0, 0, 0);
  z-index: 1; }
.md-switch .md2-switch-thumb {
  position: absolute;
  margin: 0;
  left: 0;
  top: 0;
  outline: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  background-color: #fafafa; }
.md-switch:not(.md-switch-dragging) .md2-switch-bar {
  transition-delay: 0.05s;
  transition: all 0.08s linear;
  transition-property: transform, background-color; }
.md-switch:not(.md-switch-dragging) .md2-switch-thumb {
  transition-delay: 0.05s;
  transition: all 0.08s linear;
  transition-property: transform, background-color; }
.md-switch:not(.md-switch-dragging) .md2-switch-thumb-container {
  transition: all 0.08s linear;
  transition-property: transform, background-color; }
    `],
  host: {
    'role': 'checkbox',
    '[id]': 'id',
    '[class.md-switch]': 'true',
    '[class.md-switch-indeterminate]': 'indeterminate',
    '[class.md-switch-checked]': 'checked',
    '[class.md-switch-disabled]': 'disabled',
    '[class.md-switch-align-end]': 'align == "end"',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-labelledby]': 'labelId',
    '[attr.aria-checked]': 'getAriaChecked()',
    '[attr.aria-disabled]': 'disabled',
    '(click)': 'onInteractionEvent($event)',
    '(keyup.space)': 'onInteractionEvent($event)',
    '(blur)': 'onTouched()'
  },
  providers: [MD_SWITCH_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdSwitch implements ControlValueAccessor {
  /**
   * Attached to the aria-label attribute of the host element. In most cases, arial-labelledby will
   * take precedence so this may be omitted.
   */
  @Input('aria-label') ariaLabel: string = '';

  /** A unique id for the checkbox. If one is not supplied, it is auto-generated. */
  @Input() id: string = `md-switch-${++nextId}`;

  /** Whether or not the checkbox should come before or after the label. */
  @Input() align: string = 'start';

  /**
   * Whether the checkbox is disabled. When the checkbox is disabled it cannot be interacted with.
   * The correct ARIA attributes are applied to denote this to assistive technology.
   */
  @Input() disabled: boolean = false;

  /**
   * The tabindex attribute for the checkbox. Note that when the checkbox is disabled, the attribute
   * on the host element will be set to -1, regardless of the actual tabindex value.
   */
  @Input() tabindex: number = 0;

  /** Event emitted when the checkbox's `checked` value changes. */
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
  onTouched: () => any = () => {};

  private _currentAnimationClass: string = '';

  private _currentCheckState: TransitionCheckState = TransitionCheckState.Init;

  private _checked: boolean = false;

  private _indeterminate: boolean = false;

  private _changeSubscription: {unsubscribe: () => any} = null;

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

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
    this._transitionCheckState(
        this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
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
    if (this._indeterminate) {
      this._transitionCheckState(TransitionCheckState.Indeterminate);
    } else {
      this._transitionCheckState(
          this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
    }
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
    this._changeSubscription = <{unsubscribe: () => any}>this.change.subscribe(fn);
  }

  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private _transitionCheckState(newState: TransitionCheckState) {
    let oldState = this._currentCheckState;
    let renderer = this._renderer;
    let elementRef = this._elementRef;

    if (oldState === newState) {
      return;
    }
    if (this._currentAnimationClass.length > 0) {
      renderer.setElementClass(elementRef, this._currentAnimationClass, false);
    }

    this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(
        oldState, newState);
    this._currentCheckState = newState;

    if (this._currentAnimationClass.length > 0) {
      renderer.setElementClass(elementRef, this._currentAnimationClass, true);
    }
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

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/