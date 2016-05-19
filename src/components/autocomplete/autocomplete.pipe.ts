import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hightlight'
})
export class HightlightPipe implements PipeTransform {
  transform(value: string, args: any[]) {
    if (args.length < 1) { return value; }
    let query = args[0];
    return query ?
      value.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') :
      value;
  }
  private escapeRegexp(queryToEscape: string) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }
}