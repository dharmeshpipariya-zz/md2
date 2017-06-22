import {
  Component,
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
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Tree {

  @Input() value: Array<any> = [];

}

@Component({
  moduleId: module.id,
  selector: 'md2-tree-item',
  templateUrl: 'tree-item.html',
  styleUrls: ['tree.css'],
  host: {
    'role': 'tree-item',
    '[class.md2-tree-expanded]': 'isExpanded',
    '[class.md2-tree-node-leaf]': '!value.children',
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2TreeItem {

  private _isExpanded: boolean = false;

  @Input() value: any = null;

  get isExpanded(): boolean { return this._isExpanded; }

  _handleClick() {
    this._isExpanded = !this._isExpanded;
  }

}

@NgModule({
  imports: [CommonModule],
  exports: [Md2Tree, Md2TreeItem],
  declarations: [Md2Tree, Md2TreeItem]
})
export class Md2TreeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2TreeModule,
      providers: []
    };
  }
}
