import {Directive, Input, HostListener, DynamicComponentLoader, ComponentRef, Provider, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import {TooltipContainerComponent} from './tooltip-container';
import {TooltipOptions} from './tooltip-options';

@Directive({ selector: '[tooltip]' })

export class Md2Tooltip {

  @Input('tooltip') content: string;
  @Input('tooltip-placement') public placement: string = 'top';
  @Input('tooltip-is-open') public isOpen: boolean;
  @Input('tooltip-enable') public enable: boolean;
  @Input('tooltip-animation') public animation: boolean = true;
  @Input('tooltip-append-to-body') public appendToBody: boolean;
  /* tslint:enable */

  public viewContainerRef: ViewContainerRef;
  public loader: DynamicComponentLoader;

  private visible: boolean = false;
  private tooltip: Promise<ComponentRef>;

  public constructor(viewContainerRef: ViewContainerRef, loader: DynamicComponentLoader) {
    this.viewContainerRef = viewContainerRef;
    this.loader = loader;
  }

  @HostListener('focusin', ['$event', '$target'])
  @HostListener('mouseenter', ['$event', '$target'])
  public show(): void {
    if (this.visible) {
      return;
    }
    this.visible = true;
    let options = new TooltipOptions({
      content: this.content,
      placement: this.placement,
      animation: this.animation,
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

  // params event, target
  @HostListener('focusout', ['$event', '$target'])
  @HostListener('mouseleave', ['$event', '$target'])
  public hide(): void {
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