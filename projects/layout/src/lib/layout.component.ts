import { Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wz-layout',
  template: `
    <div [style]="container" [class]="styleClass">
    </div>
  `,
  styles: [
  ]
})
export class LayoutComponent implements OnInit {

  @Input() container : any;
  @Input() styleClass : any;
  
  constructor(public el: ElementRef,private renderer: Renderer2) { }

  ngOnInit(): void { }
}
