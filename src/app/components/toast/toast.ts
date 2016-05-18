import {Component} from '@angular/core';
import {Md2Toast} from '../../../components/toast/toast';

@Component({
  selector: 'toast',
  templateUrl: './app/components/toast/toast.html',
  providers: [Md2Toast]
})
export class Toast {
  constructor(public toast: Md2Toast) { }
  toastMe() {
    this.toast.pop('test message...');
    //this.toast.pop({ message: 'test object message...', hideDelay: 3000 });
    //console.log('Toasted...');
  }
}
