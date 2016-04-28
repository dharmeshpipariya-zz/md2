# md2-dialog

Native Angular2 Material Dialog component

### Selector

```html
<md2-dialog></md2-dialog>
```

## API

Example:
 
 ```html
<button type="button" (click)="launchDialog(dialog)">Launch Dialog</button>

<md2-dialog #dialog [dialogTitle]="dialogTitle">
    <div class="md2-dialog-body">
        <p>Body of Dialog...</p>
    </div>
    <div class="md2-dialog-footer">
        <button type="button" class="btn btn-primary" (click)="dialog.show(false)">Close</button>
    </div>
</md2-dialog>
 ```
 ```ts

...

import {Md2Dialog} from 'md2/dialog';

@Component({
    selector: "...",
    directives: [Md2Dialog]
})

export class ... {
    
    ...
    
    private dialogTitle: string = 'Lorum Ipsum';
    
    private launchDialog(dialog: any) {
        dialog.show();
    }

    ...

}
 ```


### Properties

  - `[closeButton]` _- boolean - (Default: `true`)(Optional)_ Takes a boolean that causes the close button to be displayed in the top right corner
  - `[closeOnUnfocus]` _- boolean - (Default: `true`)(Optional)_-
    Takes a boolean that causes the dialog to close when a user clicks outside of the dialog
  - `[dialogTitle]` _- string - (Default: `null`)(Optional)_ -
    The heading of the dialog


### Open/Close Dialog
Use the component's `show(displayed: boolean)` method to properly trigger the dialog's display. Reference the dialog using in your view to have access to the method to use.


### Referenced From
Fuel UI (see the repo [https://github.com/FuelInteractive/fuel-ui](https://github.com/FuelInteractive/fuel-ui) repository for the angular2 based modal component)
