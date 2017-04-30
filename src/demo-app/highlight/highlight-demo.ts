import { Component } from '@angular/core';

@Component({
  selector: 'highlight-demo',
  templateUrl: '../highlight/highlight-demo.html'
})
export class HighlightDemo {
  text = `<aside class="sidenav" [class.open]="isSidenavOpened">
  <div class="sidenav-container">
    <header>
      <a (click)="sidenav(false)" [routerLink]="['']">
        <img src="./assets/img/logo.png" alt="MD2">
        <h3>Material Design 2</h3>
      </a>
    </header>
    <ul>
      <li *ngFor="let navItem of navItems"
          [class.active]="isActive(navItem.route)"
          (click)="sidenav(false)">
        <a [routerLink]="[navItem.route]">{{navItem.name}}</a>
      </li>
    </ul>
  </div>
</aside>`;
}
