import {
  Component,
  ElementRef,
  Input,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'md2-tree',
  templateUrl: 'tree.html',
  styleUrls: ['tree.css'],
  host: {
    'role': 'tree',
    '[class.md2-tree-expanded]': 'isExpanded',
    '(click)': '_handleClick($event)'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Tree {

  private _isExpanded: boolean = false;

  @Input() value: Array<any> = [];

  get isExpanded(): boolean { return this._isExpanded; }

  _handleClick(event: Event) {
    this._isExpanded = !this._isExpanded;
  }

}

@NgModule({
  imports: [CommonModule],
  exports: [Md2Tree],
  declarations: [Md2Tree]
})
export class Md2TreeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2TreeModule,
      providers: []
    };
  }
}