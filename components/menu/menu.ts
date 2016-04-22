import {Component, Input, ElementRef} from "angular2/core";

@Component({
    selector: "md2-menu",
    template: `
    <div class="md2-menu" [class.open]="isVisible">
        <button class="md2-menu-button" type="button" (click)="toggleMenu()"><span class="md2-menu-label" [innerHtml]="menuLabel"></span></button>
        <div class="md2-menu-content">
            <ng-content></ng-content>
        </div>
    </div>`,
    styles: [`
    .md2-menu { position: relative; }
    .md2-menu .md2-menu-button { border-radius: 3px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: currentColor; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; position: relative; outline: 0; border: 0; display: inline-block; padding: 0 6px; line-height: 36px; min-height: 36px; background: 0 0; white-space: nowrap; min-width: 88px; font-weight: 500; font-size: 14px; font-style: inherit; font-variant: inherit; font-family: inherit; text-decoration: none; cursor: pointer; overflow: hidden; }
    .md2-menu .md2-menu-content { position: absolute; top: 0; left: 0; display: inline-block; background: #fff; list-style: none; min-width: 100px; max-height: 304px; overflow-y: auto; padding: 8px 0; margin: 0; -moz-transform: scale(0); -ms-transform: scale(0); -o-transform: scale(0); -webkit-transform: scale(0); transform: scale(0); -moz-transform-origin: left top; -ms-transform-origin: left top; -o-transform-origin: left top; -webkit-transform-origin: left top; transform-origin: left top; -moz-transition: all .4s linear; -o-transition: all .4s linear; -webkit-transition: all .4s linear; transition: all .4s linear; -moz-transition-duration: 0.2s; -o-transition-duration: 0.2s; -webkit-transition-duration: 0.2s; transition-duration: 0.2s; box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12); z-index: 1; border-radius: 2px; }
    .md2-menu.open .md2-menu-content { -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }
    .md2-menu .md2-menu-item { position: relative; display: block; padding: 0 1rem; line-height: 36px; cursor: pointer; }
    `]
})

export class Md2Menu {
    @Input() menuLabel: string;
    private isVisible: boolean = false;
    private clickHandler: any;

    constructor(public element: ElementRef) { }

    ngOnInit() {
        this.clickHandler = this.getClickHandler(this);
        document.addEventListener('click', this.clickHandler);
    }

    ngOnDestroy() {
        document.removeEventListener('click', this.clickHandler);
        this.clickHandler = null;
    }

    private getClickHandler(context: any) {
        return (e: any) => {
            if (e.target && e.target.className && e.target.className.indexOf('md2-menu') >= 0) {
                return;
            }
            if (context.element.nativeElement.contains(e.srcElement)
                && e.srcElement && e.srcElement.className &&
                e.srcElement.className.indexOf('md2-menu') >= 0) {
                return;
            }
            context.isVisible = false;
        };
    }

    private toggleMenu(): void {
        this.isVisible = !this.isVisible;
    }
}