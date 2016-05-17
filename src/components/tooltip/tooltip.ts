import {Directive, Input, HostListener, DynamicComponentLoader, ComponentRef, Provider, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import {TooltipContainerComponent} from './tooltip-container';
import {TooltipOptions} from './tooltip-options';

@Directive({
  selector: '[tooltip]',
  host: {
    '(focusin)': 'show($event, $target)',
    '(mouseenter)': 'show($event, $target)',
    '(focusout)': 'hide($event, $target)',
    '(mouseleave)': 'hide($event, $target)'
  },
})

export class Md2Tooltip {

  @Input('tooltip') content: string;
  @Input('tooltip-direction') direction: string = 'bottom';
  @Input('tooltip-visible') visible: boolean = false;
  @Input('tooltip-append-to-body') appendToBody: boolean;

  public viewContainerRef: ViewContainerRef;
  public loader: DynamicComponentLoader;

  private tooltip: Promise<ComponentRef>;

  public constructor(viewContainerRef: ViewContainerRef, loader: DynamicComponentLoader) {
    this.viewContainerRef = viewContainerRef;
    this.loader = loader;
  }

  public show(event: Event, target): void {
    if (this.visible) {
      return;
    }
    this.visible = true;
    let options = new TooltipOptions({
      content: this.content,
      direction: this.direction,
      hostEl: this.viewContainerRef.element
    });

    let binding = ReflectiveInjector.resolve([
      new Provider(TooltipOptions, { useValue: options })
    ]);

    this.tooltip = this.loader
      .loadNextToLocation(TooltipContainerComponent, this.viewContainerRef, binding)
      .then((componentRef: ComponentRef) => {
        return componentRef;
      });
  }

  public hide(event: Event, target): void {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.tooltip.then((componentRef: ComponentRef) => {
      componentRef.destroy();
      return componentRef;
    });
  }
}

export const TOOLTIP_DIRECTIVES: Array<any> = [Md2Tooltip, TooltipContainerComponent];