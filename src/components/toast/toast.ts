import {Injectable, ComponentRef, DynamicComponentLoader, ApplicationRef, Inject, Optional, provide, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import {Md2ToastComponent} from './toast.component';
//import {ToastOptions} from './toast.config';
import {ViewContainerRef_} from '@angular/core/src/linker/view_container_ref';

@Injectable()
export class Md2Toast {
  private hideDelay: number = 3000;
  private index: number = 0;


  container: ComponentRef<any>;
  private options = {
    autoDismiss: true,
  };


  constructor(private loader: DynamicComponentLoader,
    private appRef: ApplicationRef
    //, @Optional() @Inject(ToastOptions) options
  ) {
    //if (options) {
    //  Object.assign(this.options, options);
    //}
  }

  show(toast: Toast) {
    if (!this.container) {
      // a hack to get app element in shadow dom
      let appElement: ViewContainerRef = new ViewContainerRef_(this.appRef['_rootComponents'][0]._hostElement);

      let bindings = ReflectiveInjector.resolve([
        //provide(ToastOptions, { useValue: <ToastOptions>this.options })
      ]);

      this.loader.loadNextToLocation(Md2ToastComponent, appElement, bindings)
        .then((ref) => {
          this.container = ref;
          this.setupToast(toast);
        });
    } else {
      this.setupToast(toast);
    }
  }

  createTimeout(toastId: number) {
    setTimeout(() => {
      this.clearToast(toastId);
    }, this.hideDelay);
  }

  setupToast(toast: Toast) {
    toast.id = ++this.index;
    this.container.instance.addToast(toast);
    this.createTimeout(toast.id);
  }

  clearToast(toastId: number) {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeToast(toastId);
      if (!instance.anyToast()) {
        this.hide();
      }
    }
  }

  hide() {
    this.container.destroy();
    this.container = null;
  }

  pop(message: string | any) {
    let toast;
    if (typeof message === 'string') {
      toast = new Toast(message);
    } else if (typeof message === 'object') {
      toast = new Toast(message.message);
      this.hideDelay = message.hideDelay;
    }
    if (toast) { this.show(toast); }
  }
}


export class Toast {
  id: number;
  message: string;
  constructor(message: string) { this.message = message; }
}
