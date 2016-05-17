import {Component} from '@angular/core';
import {Md2Toast} from '../../../components/toast/toast';

@Component({
  selector: 'toast',
  templateUrl: './app/components/tooltip/tooltip.html'
})
export class Toast {
  constructor(public toast: Md2Toast) { }
  toastMe() {
    this.toast.pop('test toast');
    console.log('Toasted...');
  }
}
