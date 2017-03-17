# Md2Colorpicker
Colorpicker allow the user to select color.

## `<md2-colorpicker>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `required` | `boolean` | Whether or not the datepicker is required |
| `disabled` | `boolean` | Whether or not the colorpicker is disabled |
| `placeholder` | `string` | Datepicker placeholder label |
| `format` | `string` | 	Color format:'hex', 'rgb', 'hsl'.Default :hex |
| `okLabel` | `string` | Datepicker Ok label |
| `cancelLabel` | `string` | Datepicker Cancel label |
| `tabindex` | `number` | The tabIndex of the colorpicker. |
| `openOnFocus` | `boolean` | Opend Calendar Whether or not the datepicker is openOnFocus. |
| `isOpen` | `boolean` | Opend Calendar Whether or not the datepicker is isOpen. |
| `container` | `'inline' | 'dialog'` | Container of the Datepicker, default inline. |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when change color |
| `onOpen` | `Event` | Fired when open the Datepicker Panel |
| `onClose` | `Event` | Fired when close the Datepicker Panel |


### Examples
A colorpicker would have the following markup.
```html
<md2-colorpicker [(ngModel)]="color"></md2-colorpicker>
```
