# WsLayout

The layout library was built with [Angular](https://angular.io) version 13.1.2. 
And it uses css grid layout to layout the page or component. 

## Import
local mode : with the library code in the same project
import { LayoutModule } from 'projects/layout/src/public-api';

If using CssGridLayout class to build the css grid layout in the component class.
 
import { CssGridLayout } from 'projects/layout/src/lib/css-grid-layout';

## Getting started
    The layout is only one root container, there are more than one boxes in each container,
    in one box , there can be another container and so on.

    Please read the [CSS GRID](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)    

    <wz-layout [container]="*container's css grid styles*" [styleClass]="*global css class*">  
      <wz-box [grid]="box's css grid styles" [styleClass]="global css class">
        *content*
      </wz-box>
    </wz-layout>

    wz-layout : it is the tag for the container
                1. container : Record<string,string> 
                            it is the css container grid layout styles, can be setup directly with the css style.
                            or setup with CssGridLayout class  
                for example,
                container = {
                     "display": "grid",
                     "grid-template-rows": "1fr 8fr 1fr",
                     "grid-template-columns": "1fr 1fr 1fr"
                }
                
                2. styleClass: it is a global css class , normally it is in the styles.css file.
                any css features can be added with the style class  
       
    wz-box: this directive is used to create a box in the container. 
            1. grid : Record<string,string> 
                      it is the css container grid layout styles, can be setup directly with the css style.
                      or setup with CssGridLayout class  
               for example:
               grid = { "grid-row": "1/1", "grid-column": "1/span 2" };

            2. styleClass: it is a global css class , normally it is in the styles.css file.
                any css features can be added with the style class
         
 ## Notice:  
    1. The heigth should be setting up for the root container
    2. When directly setting up the css layout attributes, if the box's size crossed the rows or columns,
       'span' has to be used  
    3. When directly setting up the css layout attributes,in order to fully filled the box space,
       place-self should be setup to stretch or not setup , and then it is better to setup the heigth to 100% in the box style class
           

 2. helper class for creating the css grid layout attributes 
    CssGridLayout
    1. attributes:
       container!: Record<string, string>;
       boxes! : Map<string,Record<string,string>>;
    2. API
       - setContainer(type?: string,
                    rows?: string,
                    columns?: string,
                    gap?: string,
                    autoFlow?: string,
                    placeItems?: string,
                    placeContent?: string)
       - setArea(rows: string,columns: string)
         set the container's size  
       - setGap(rowGap : string, columnGap : string)
         set the container's gap, include the gap between rows and gap between columns
       - placeItems(placeItems : string) 
       - placeContainer(horizon : string, vertical : string)
       - getBoxKeys()    
         get all the ids of the boxes
       - getBox(key : string)
       - addBox(id: string,style: Record<string,string>)
       - add(id: string, itemArea: string, align: string) 
       - setItemArea(boxId: string,startRow: number, endRow: number, startColumn: number,endColumn: number)
         set the box's place and size
       - setItemRows(boxId: string,startRow: number, endRow: number)
         set the box's row place  
       - setItemColumns(boxId: string, startColumn: number, endColumn: number)
         set the box's columns place
       - setItemAlign(boxId: string,horizon: string, vertical: string)  

## Sample
   In the sample application, there are two methods to demo how to setup the container and box.
   