import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tree-demo',
  templateUrl: 'tree-demo.html'
})
export class TreeDemo {
  tree: Array<any> = [
    {
      value: 'Node 1',
      children: [
        { value: 'Child 1' },
        { value: 'Child 2' },
        { value: 'Child 3' }
      ]
    },
    {
      value: 'Node 2',
      children: [
        { value: 'Child 11' },
        { value: 'Child 12' },
        { value: 'Child 13' }
      ]
    }
  ]
}
