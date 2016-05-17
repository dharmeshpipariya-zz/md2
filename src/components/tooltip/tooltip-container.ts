import {Component, ChangeDetectorRef, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
//import {positionService} from './position';
import {TooltipOptions} from './tooltip-options';

@Component({
  selector: 'md2-tooltip',
  directives: [NgClass, NgStyle],
  template: `<div class="tooltip"
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
  private direction: string;
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
    let p = this.positionElements(
      this.hostEl.nativeElement,
      this.element.nativeElement.children[0],
      this.direction);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
    this.classMap.in = true;
    this.classMap.fade = true;

    this.cdr.detectChanges();
  }
  public positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: string): { top: number, left: number } {
    let positionStrParts = positionStr.split('-');
    let pos0 = positionStrParts[0];
    let pos1 = positionStrParts[1] || 'center';
    let hostElPos = this.offset(hostEl);
    let targetElWidth = targetEl.offsetWidth;
    let targetElHeight = targetEl.offsetHeight;
    let shiftWidth = {
      center: function (): number {
        return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
      },
      left: function (): number {
        return hostElPos.left;
      },
      right: function (): number {
        return hostElPos.left + hostElPos.width;
      }
    };

    let shiftHeight = {
      center: function (): number {
        return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
      },
      top: function (): number {
        return hostElPos.top;
      },
      bottom: function (): number {
        return hostElPos.top + hostElPos.height;
      }
    };

    let targetElPos: { top: number, left: number };
    switch (pos0) {
      case 'right':
        targetElPos = {
          top: shiftHeight[pos1](),
          left: shiftWidth[pos0]()
        };
        break;
      case 'left':
        targetElPos = {
          top: shiftHeight[pos1](),
          left: (hostElPos.left - targetElWidth)// > 0 ? (hostElPos.left - targetElWidth) : (hostElPos.width + hostElPos.left)
        };
        break;
      case 'bottom':
        targetElPos = {
          top: shiftHeight[pos0](),
          left: shiftWidth[pos1]()
        };
        break;
      default:
        targetElPos = {
          top: hostElPos.top - targetElHeight,
          left: shiftWidth[pos1]()
        };
        break;
    }

    return targetElPos;
  }
  public offset(nativeEl: any): { width: number, height: number, top: number, left: number } {
    let boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop),
      left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft)
    };
  }
  private get window(): Window {
    return window;
  }

  private get document(): Document {
    return window.document;
  }
}