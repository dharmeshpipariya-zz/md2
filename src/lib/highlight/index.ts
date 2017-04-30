import {
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Highlight } from './highlight';

export * from './highlight';

@NgModule({
  imports: [CommonModule],
  exports: [Md2Highlight],
  declarations: [Md2Highlight],
})
export class Md2HighlightModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2HighlightModule,
    };
  }
}
