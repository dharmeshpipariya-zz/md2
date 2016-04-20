import {Component, ElementRef, Input, Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'md2-dialog',
    template: `
    <div class="modal" [ngClass]="{customFadeIn: displayed}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" [style.display]="displayed ? 'block' : 'none'">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button *ngIf="closeButton" type="button" class="close" aria-label="Close" (click)="show(false)">
                    <span aria-hidden="true">&#215;</span>
                    <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">{{modalTitle}}</h4>
            </div>
            <ng-content></ng-content>
        </div>
    </div>
</div>
<div class="modal-backdrop" [ngClass]="{fade: displayed, in: displayed}" [style.display]="displayed ? 'block' : 'none'"></div>
    `,
    styles: [``],
    host: {
        '(click)': 'clickElement($event)'
    },
    directives: [CORE_DIRECTIVES]
})

export class Md2Dialog {
    private _el: HTMLElement;
    displayed: boolean = false;
    @Input() closeOnUnfocus: boolean = true;
    @Input() closeButton: boolean = true;
    @Input() dialogTitle: string = '';

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

    clickElement(e: any) {
        if (this.closeOnUnfocus) {
            if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog') {
                this.show(false);
            }
        }
    }

    getElement(): HTMLElement {
        return this._el;
    }

    hide(): boolean {
        return this.show(false);
    }

    show(isDisplayed: boolean): boolean {
        var body = document.body;
        if (isDisplayed === undefined) {
            this.displayed = !this.displayed;
        } else {
            this.displayed = isDisplayed;
        }

        if (this.displayed) {
            body.classList.add('modal-open');
        } else {
            body.classList.remove('modal-open');
            if (this.closeOnUnfocus) {
                this._el.childNodes[0].removeEventListener('click', (e: Event) => {
                    if (e.srcElement.className == 'modal customFadeIn' || e.srcElement.className == 'modal-dialog') {
                        this.show(false);
                    }
                });
            }
        }
        return false;
    }
}