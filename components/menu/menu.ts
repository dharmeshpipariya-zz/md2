import {Component, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
    selector: "dropdown",
    template: `<div class="dropdown open">
  <button class="btn btn-secondary" type="button" 
    aria-haspopup="true" aria-expanded="false" (click)="toggleDropdown()">
    {{label}}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu1"
    *ngIf="dropdownOpen" (click)="toggleDropdown()">
    <ng-content></ng-content>
  </div>
</div>`
})

export class Dropdown {
    @Input() label: string;
    dropdownOpen: boolean = false;

    public toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
    }
}

export var DROPDOWN_COMPONENT_PROVIDERS = [
    Dropdown
];