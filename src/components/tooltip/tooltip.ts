import {Directive, Input, DynamicComponentLoader, ComponentRef, Provider, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import {Md2TooltipComponent} from './tooltip.component';
import {Md2TooltipOptions} from './tooltip.options';

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
  private visible: boolean = false;
  private timer: number;

  @Input('tooltip') content: string;
  @Input('tooltip-direction') direction: string = 'bottom';
  @Input('tooltip-delay') delay: number = 0;

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
    let options = new Md2TooltipOptions({
      content: this.content,
      direction: this.direction,
      hostEl: this.viewContainerRef.element
    });

    let binding = ReflectiveInjector.resolve([
      new Provider(Md2TooltipOptions, { useValue: options })
    ]);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tooltip = this.loader
        .loadNextToLocation(Md2TooltipComponent, this.viewContainerRef, binding)
        .then((componentRef: ComponentRef) => {
          return componentRef;
        });
    }, this.delay);
  }

  public hide(event: Event, target): void {
    clearTimeout(this.timer);
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

export const TOOLTIP_DIRECTIVES: Array<any> = [Md2Tooltip, Md2TooltipComponent];