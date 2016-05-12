import {Component, ChangeDetectorRef, ElementRef, Inject, AfterViewInit} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import {positionService} from './position';
import {TooltipOptions} from './tooltip-options';

@Component({
  selector: 'tooltip-container',
  directives: [NgClass, NgStyle],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="tooltip" role="tooltip"
     [ngStyle]="{top: top, left: left, display: display}"
     [ngClass]="classMap">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">{{content}}</div>
    </div>`,
  styles: [`
    .tooltip {
    position: absolute;
    z-index: 1070;
    display: block;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: .875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;
    white-space: normal;
    line-break: auto;
} .tooltip-inner {
    max-width: 200px;
    padding: 3px 8px;
    color: #fff;
    text-align: center;
    background-color: #000;
    border-radius: .25rem;
}
  `]
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