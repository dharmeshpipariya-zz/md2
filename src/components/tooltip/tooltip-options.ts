import {Injectable} from '@angular/core';

@Injectable()
export class TooltipOptions {
  public direction: string;
  public visible: boolean;

  public constructor(options: Object) {
    Object.assign(this, options);
  }
}
