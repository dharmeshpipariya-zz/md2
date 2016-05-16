//@Injectable()
//export class Md2Toast {
//  constructor(private loader: DynamicComponentLoader) { }
//  show(message: string) {
//    this.loader.loadNextToLocation(
//      Toast,
//      /* location: ElementRef - how do I get one? I want to load it into the body */
//    ).then((ref: ComponentRef) => {
//      console.log('loaded toast!');
//    });
//  }
//}



//@Component({
//  selector: 'toast',
//  template: `<div>This is a notification</div>`
//})
//export class Toast { }