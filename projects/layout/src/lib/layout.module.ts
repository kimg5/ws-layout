import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { BoxDirective } from './box.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LayoutComponent,
    BoxDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent,
    BoxDirective
  ]
})
export class LayoutModule { }
