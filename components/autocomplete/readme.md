# md2-autocomplete

Native Angular2 Material Autocomplete component

## API

Example:
 
 ```html
<md2-autocomplete [items]="items"
            [initItem]="item"
            (selected)="selected($event)"
            placeholder="Placeholder Text">
</md2-autocomplete>
 ```
 ```ts
private items: Array<any> =
    [
        { name: 'Amsterdam', value: '1' },
        { name: 'Birmingham', value: '2' },
        { name: 'Dortmund', value: '3' },
        { name: 'Gothenburg', value: '4' },
        { name: 'London', value: '5' },
        { name: 'Seville', value: '6' }
    ];

private item: Array<any> = [{ name: 'Dortmund', value: '3' }];

private selected(value: any) {
    console.log('Selected value is: ', value);
}
 ```

### Properties

  - `items` - (`Array<any>`) - Array of items from which to autocomplete. Should be an array of objects with `value` and `name` properties.
  As convenience, you may also pass an array of strings, in which case the same string is used for both the VALUE and the name.
  Items may be nested by adding a `children` property to any item, whose value should be another array of items. Items that have children may omit having an ID.
  If `items` are specified, all items are expected to be available locally and all selection operations operate on this local array only.
  If omitted, items are not available locally, and the `query` option should be provided to fetch data.
  - `initItem` (`?Array<any>`) - Initial selection data to set. This should be an object with `value` and `name` properties in the case of input type 'Single',
  or an array of such objects otherwise. This option is mutually exclusive with value.
  - `placeholder` (`?string=''`) - Placeholder text to display when the element has no focus and selected items.
  - `disabled` (`?boolean=false`) - When `true`, it specifies that the component should be disabled.
  This option only applies to single-value inputs, as multiple-value inputs don't have the search input in the dropdown to begin with.

### Events

  - `data` - it fires during all events of this component; returns `Array<any>` - current selected data
  - `selected` - it fires after a new option selected; returns object with `value` and `name` properties that describes a new option.
  - `removed` - it fires after an option removed; returns object with `value` and `name` properties that describes a removed option.
  - `typed` - it fires after changing of search input; returns `string` with that value.


### Referenced From
ng2-select (see the repo [https://github.com/valor-software/ng2-select](https://github.com/valor-software/ng2-select) repository for the angular2 based select component)
