import {Injectable} from '@angular/core';

@Injectable()
export class Md2TooltipOptions {
  public direction: string;
  public visible: boolean;

  public constructor(options: Object) {
    Object.assign(this, options);
  }
}
