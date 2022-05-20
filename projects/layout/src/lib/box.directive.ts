import { AfterContentInit, Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { LayoutComponent } from './layout.component';

@Directive({
  selector: 'wz-box'
})
export class BoxDirective implements AfterContentInit {
  @Input() grid!: Record<string,string>;
  @Input() styleClass: any;
  
  constructor(@Inject(LayoutComponent) private parent: LayoutComponent,private el : ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    let container = this.parent.el.nativeElement.firstChild;
 
    let box = this.renderer.createElement('div');
    for(let str in this.grid){
      this.renderer.setStyle(box,str,this.grid[str]);
    }

    if(this.styleClass){
      this.renderer.addClass(box,this.styleClass);
    }
    
    let nodes = this.el.nativeElement.childNodes;
    for(let node of nodes){
      this.renderer.appendChild(box,node);
    }

    this.renderer.appendChild(container,box); 
  }
}
