import {Component, Optional, Inject, ViewEncapsulation} from '@angular/core';
import {Toast} from './toast';
//import {ToastOptions} from './toast.config';

@Component({
  selector: 'md2-toast',
  template: `
    <div class="md2-toast-wrapper">
      <div *ngFor="let toast of toasts" class="md2-toast" (click)="dismiss(toast)">
        <div class="md2-toast-message">{{toast.message}}</div>
      </div>
    </div>
  `,
  styles: [`
    .md2-toast-wrapper { position: fixed; top: 0; right: 0; z-index: 1050; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; cursor: default; overflow: hidden; min-width: 304px; padding: 8px; -moz-transition: all .4s cubic-bezier(.25,.8,.25,1); -o-transition: all .4s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .4s cubic-bezier(.25,.8,.25,1); transition: all .4s cubic-bezier(.25,.8,.25,1); }
    .md2-toast { position: relative; padding: 14px 24px; margin-bottom: 5px; display: block; background-color: #323232; color: #fafafa; box-shadow: 0 2px 5px 0 rgba(0,0,0,.26); border-radius: 2px; font-size: 14px; overflow: hidden; -ms-word-wrap: break-word; word-wrap: break-word; -moz-transition: all .4s cubic-bezier(.25,.8,.25,1); -o-transition: all .4s cubic-bezier(.25,.8,.25,1); -webkit-transition: all .4s cubic-bezier(.25,.8,.25,1); transition: all .4s cubic-bezier(.25,.8,.25,1); }
    .md2-toast-message { display: block; }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class Md2ToastComponent {
  toasts: Toast[] = [];
  maxShown = 5;

  //constructor( @Optional() @Inject(ToastOptions) options) {
  //  if (options) {
  //    Object.assign(this, options);
  //  }
  //}

  addToast(toast: Toast) {
    this.toasts.push(toast);
    if (this.toasts.length > this.maxShown) {
      this.toasts.splice(0, (this.toasts.length - this.maxShown));
    }
    //} else {
    //  this.toasts.unshift(toast);
    //  if (this.toasts.length > this.maxShown) {
    //    this.toasts.splice(this.maxShown, (this.toasts.length - this.maxShown));
    //  }
    //}

  }

  removeToast(toastId: number) {
    this.toasts = this.toasts.filter((toast) => {
      return toast.id !== toastId;
    });
  }

  dismiss(toast) { this.removeToast(toast.id); }

  anyToast(): boolean { return this.toasts.length > 0; }

  //findToast(toastId: number): Toast {
  //  for (let toast of this.toasts) {
  //    if (toast.id === toastId) {
  //      return toast;
  //    }
  //  }
  //  return null;
  //}
}