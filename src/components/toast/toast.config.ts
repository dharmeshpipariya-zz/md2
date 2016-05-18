import {Injectable} from '@angular/core';

@Injectable()
export class ToastOptions {
  autoDismiss: boolean;
  maxShown: number;
  constructor(options: Object) {
    Object.assign(this, options);
  }
}