import { Injectable } from '@angular/core';

@Injectable()
export abstract class ColorLocale {
  formatColor: string;
  defaultColor: string;
}

export class DefaultColorLocale implements ColorLocale {
  formatColor = 'hex';
  defaultColor = 'black';
}
