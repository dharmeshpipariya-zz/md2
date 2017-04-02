import {
  Injectable,
} from '@angular/core';

@Injectable()
export class ColorLocale {
  format: string = 'hex';
  defaultValue: string = '#000000';
}
