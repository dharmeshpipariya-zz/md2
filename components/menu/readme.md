# md2-menu

Native Angular2 Material Menu component

### Selector

```html
<md2-menu></md2-menu>
```

## API

Example:
 
 ```html
<md2-menu [menuLabel]="menuLabel">
    <a class="md2-menu-item" href="#google">Google</a>
    <a class="md2-menu-item" href="#facebook">Facebook</a>
    <a class="md2-menu-item" href="#test1">Test 1</a>
    <a class="md2-menu-item" href="#test2">Test 2</a>
    <a class="md2-menu-item" href="#test3">Test 3</a>
</md2-menu>
 ```
 ```ts
private menuLabel: string = 'Lorum Ipsum';
 ```


### Properties

  - `[menuLabel]` _- string - (Default: `null`)(Optional)_ -
    The heading or title of the menu

### Referenced From
Fuel UI (see the repo [https://github.com/FuelInteractive/fuel-ui](https://github.com/FuelInteractive/fuel-ui) repository for the angular2 based dropdown component)
