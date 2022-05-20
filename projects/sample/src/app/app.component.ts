import { Component, OnInit } from '@angular/core';
import { CssGridLayout } from 'projects/layout/src/lib/css-grid-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  parentContainer: Record<string, string>;
  parentHeader: Record<string, string>;
  parentMain1: Record<string, string>;
  parentMain2: Record<string, string>;
  parentFooter: Record<string, string>;

  child1Layout: CssGridLayout;
  child2Layout: CssGridLayout;

  constructor() {
    this.parentContainer = {
      "display": "grid",
      "grid-template-rows": "1fr 8fr 1fr",
      "grid-template-columns": "1fr 1fr 1fr"
    };
    this.parentHeader = { "grid-row": "1/1", "grid-column": "1/span 2" };
    this.parentMain1 = { "grid-row": "2/2", "grid-column": "1/span 2" };
    this.parentMain2 = { "grid-row": "1/span 2", "grid-column": "3/3" };
    this.parentFooter = { "grid-row": "3/3", "grid-column": "1/span 3" };

    this.child1Layout = new CssGridLayout();
    this.child2Layout = new CssGridLayout();

  }

  ngOnInit(): void {
     this.child1Layout.setArea("1fr 1fr", "1fr 1fr").setGap("2px", "2px").placeContainer("stretch","stretch").setItemArea("child1",1,2,1,2);

     this.child2Layout.setArea("1fr 1fr 1fr 1fr", "1fr 1fr").setGap("2px","2px");

     this.child2Layout.addBox("child2",{"grid-area":"1/1/span 2/span 2","place-self":"stretch stretch"});
     
     this.child2Layout.addBox("child3",{});
     this.child2Layout.setItemArea("child3",3,4,1,1);

     this.child2Layout.addBox("child4",{});
     this.child2Layout.setItemArea("child4",3,4,2,2);
     

  }
}
