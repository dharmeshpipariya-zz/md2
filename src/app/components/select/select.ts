import {Component} from '@angular/core';
import {SELECT_DIRECTIVES, Md2SelectDispatcher} from '../../../components/select/select';

@Component({
  selector: 'selectcomp',
  templateUrl: './app/components/select/select.html',
  directives: [SELECT_DIRECTIVES],
  providers: [Md2SelectDispatcher]
})
export class Select {
  private disabled: boolean = false;
  private items: Array<any> =
  [
    { name: 'Amsterdam', value: '1' },
    { name: 'Birmingham', value: '2' },
    { name: 'Dortmund', value: '3' },
    { name: 'Gothenburg', value: '4' },
    { name: 'London', value: '5' },
    { name: 'Seville', value: '6' }
    //'Amsterdam', 'Birmingham', 'Dortmund', 'Gothenburg', 'London', 'Seville'
  ];
  private items1: Array<string> = ['Amsterdam', 'Birmingham', 'Dortmund', 'Gothenburg', 'London', 'Seville'];
  private item2: string = 'Gothenburg';
  //private item: Array<any> = [{ name: 'Dortmund', value: '3' }];
  //private item: any = { name: 'Dortmund', value: '3' };
  private item: string = '3';
  private item1: any = { name: 'Dortmund', value: '3' };
  private change(value: any) {
    console.log('Changed data: ', value);
  }

  xyz = 1;
  obj1 = { id: 1, name: 'ssss' };
  obj2 = { id: 2, name: 'dff' };
  serverList = [this.obj1, this.obj2];
  copyList = [this.obj1, this.obj2];
  update(i, e) {
    console.log(i);
    console.log(e);
    let s = this.serverList.find(x=> x.id === parseInt(e));
    this.copyList[i] = s;
  }

}
