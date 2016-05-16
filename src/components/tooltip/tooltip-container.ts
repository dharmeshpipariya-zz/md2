import {Component, ChangeDetectorRef, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import {positionService} from './position';
import {TooltipOptions} from './tooltip-options';

@Component({
  selector: 'tooltip-container',
  directives: [NgClass, NgStyle],
  template: `<div class="tooltip" role="tooltip"
     [ngStyle]="{top: top, left: left, display: display}"
     [ngClass]="classMap">
      <div class="tooltip-inner">{{content}}</div>
    </div>`,
  styles: [`
    .tooltip {
position: absolute;
    z-index: 1070;
    overflow: hidden;
    pointer-events: none;
border-radius: 4px;
    font-weight: 500;
    font-style: normal;
font-size: 10px;
display: block;
color: rgb(255,255,255);
}


.tooltip .tooltip-inner {
    position: relative;
color: #fff;
text-align: center;
    opacity: 0;
    min-height: 22px;
max-width: 200px;
background-color: rgba(0,0,0,0.8);
border-radius: 4px;
    line-height: 1.5;
    padding: 4px 12px;

transition: all .2s cubic-bezier(.25,.8,.25,1);
    will-change: opacity,height,width;
-webkit-transform-origin: center top;
    transform-origin: center top;
    -webkit-transform: scale(0);
    transform: scale(0);
}

.in .tooltip-inner {
-webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
    -webkit-transform-origin: center top;
    transform-origin: center top;
}
  `],
  host: {
    'role': 'tooltip',
    '[class.md2-tooltip]': 'true',
    '[class.md2-tooltip-top]': 'false'
  },
  encapsulation: ViewEncapsulation.None
})
export class TooltipContainerComponent implements AfterViewInit {
  /* tslint:disable */
  private classMap: any;
  private top: string = '-1000px';
  private left: string = '-1000px';
  private display: string = 'block';
  private content: string;
  private placement: string;
  private popupClass: string;
  private animation: boolean;
  private isOpen: boolean;
  private appendToBody: boolean;
  private hostEl: ElementRef;
  /* tslint:enable */

  private element: ElementRef;
  private cdr: ChangeDetectorRef;

  public constructor(element: ElementRef, cdr: ChangeDetectorRef, options: TooltipOptions) {
    this.element = element;
    this.cdr = cdr;
    Object.assign(this, options);
    this.classMap = { 'in': false, 'fade': false };
  }

  public ngAfterViewInit(): void {
    let p = positionService
      .positionElements(
      this.hostEl.nativeElement,
      this.element.nativeElement.children[0],
      this.placement, this.appendToBody);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
    this.classMap.in = true;
    if (this.animation) {
      this.classMap.fade = true;
    }

    this.cdr.detectChanges();
  }
}