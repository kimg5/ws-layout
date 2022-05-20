export class CssGridLayout {
    public static readonly KEY_DISPLAY : string = "display";
    public static readonly KEY_ROWS : string  = "grid-template-rows";
    public static readonly KEY_COLUMNS : string  = "grid-template-columns";
    //grid-gap: <grid-row-gap> <grid-column-gap> 
    public static readonly KEY_GAP : string  = "grid-gap";
    public static readonly KEY_AUTOFLOW : string  = "grid-auto-flow";
    
    //place-items: <align-items> <justify-items>;
    public static readonly KEY_PLACE_ITEMS : string  = "place-items";

    //place-content: <align-content> <justify-content>
    public static readonly KEY_PLACE_CONTENT : string  = "place-content";

    //grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
    public static readonly KEY_AREA : string  = "grid-area";

    //grid-column: <start-line> / <end-line>;
    public static readonly KEY_GRID_COLUMN : string  = "grid-column";

    //grid-row: <start-line> / <end-line>;
    public static readonly KEY_GRID_ROW : string  = "grid-row";

    public static readonly KEY_JUSTIFY_SELF : string  = "justify-self";
    public static readonly KEY_ALIGN_SELF : string  = "align-self";
    //place-self: <align-self> <justify-self>;
    public static readonly KEY_PLACE_SELF : string  = "place-self";

    public static readonly GRID : string  = "grid";
    public static readonly GRID_LINE : string  = "inline-grid";

    public static readonly START : string  = "start";
    public static readonly END : string  = "end";
    public static readonly CENTER : string  = "center";
    public static readonly STRETCH : string  = "stretch";

    public static readonly SPACE_AROUND : string  = "space-around";
    public static readonly SPACE_BETWEEN : string  = "space-between";
    public static readonly SPACE_EVENLY : string  = "space-evenly";

    container!: Record<string, string>;
    boxes! : Map<string,Record<string,string>>;

    constructor(){
        this.container = {};
        /*
          when creating the child layout container, the child container will not fully fill the heigth space.
          so setting up the height to 100% can solve this issue
          Another issue comes from place-self,if you want to add a container to a box and fully fill the heigth space,
          you must not setup the box's place-self, or set it stretch

        */ 
        this.container["height"] = "100%";
        this.container[CssGridLayout.KEY_DISPLAY] = CssGridLayout.GRID;
        this.boxes = new Map();
    }

    setContainer(type?: string,
        rows?: string,
        columns?: string,
        gap?: string,
        autoFlow?: string,
        placeItems?: string,
        placeContent?: string){
            this.container[CssGridLayout.KEY_DISPLAY] = type || CssGridLayout.GRID;
            this.container[CssGridLayout.KEY_ROWS] = rows || '100%';
            this.container[CssGridLayout.KEY_COLUMNS] = columns || '100%';
            this.container[CssGridLayout.KEY_GAP] = gap || '0px';
            
            if(autoFlow)
            this.container[CssGridLayout.KEY_AUTOFLOW] = autoFlow;
            
            if(placeItems)
            this.container[CssGridLayout.KEY_PLACE_ITEMS] = placeItems;
            
            this.container[CssGridLayout.KEY_PLACE_CONTENT] = placeContent || CssGridLayout.CENTER + ' ' + CssGridLayout.CENTER;
    }

    setArea(rows: string,columns: string) {
        this.container[CssGridLayout.KEY_ROWS] = rows;
        this.container[CssGridLayout.KEY_COLUMNS] = columns;
        return this;
    }

    setGap(rowGap : string, columnGap : string) {
        this.container[CssGridLayout.KEY_GAP] = rowGap + " " + columnGap;
        return this; 
    }

    placeItems(placeItems : string) {
        this.container[CssGridLayout.KEY_PLACE_ITEMS] = placeItems;
        return this;
    }

    placeContainer(horizon : string, vertical : string){
        this.container[CssGridLayout.KEY_PLACE_CONTENT] = horizon + " " + vertical;
        return this;
    }

    getBoxKeys(){
        return Array.from(this.boxes.keys());
    }

    getBox(key : string) : any{
       return this.boxes.get(key);
    }

    addBox(id: string,style: Record<string,string>){
        this.boxes.set(id,style);
        return this;
    }

    add(id: string, itemArea: string, align: string){
        let style : Record<string,string>= {};
        style[CssGridLayout.KEY_AREA] = itemArea;
        style[CssGridLayout.KEY_ALIGN_SELF] = align;  
        this.boxes.set(id,style);
        return this;
    }

    setItemArea(boxId: string,startRow: number, endRow: number, startColumn: number,endColumn: number){
        let box = this.getOrCreate(boxId);
        
        box[CssGridLayout.KEY_AREA] = startRow + "/" + startColumn + "/" + this.span(startRow,endRow) + "/" + this.span(startColumn,endColumn); 
        /*
          Solve the fully fill the box's height 
        */
        box[CssGridLayout.KEY_PLACE_SELF] = CssGridLayout.STRETCH + " " + CssGridLayout.STRETCH;
        return this;
    }

    setItemRows(boxId: string,startRow: number, endRow: number){
        let box = this.getOrCreate(boxId);
        
        box[CssGridLayout.KEY_AREA] = startRow + "/" + this.span(startRow,endRow); 
        return this;
    }

    setItemColumns(boxId: string, startColumn: number, endColumn: number){
        let box = this.getOrCreate(boxId);
        
        box[CssGridLayout.KEY_AREA] = startColumn + "/" + this.span(startColumn,endColumn); 
        return this;
    }
    
    
    setItemAlign(boxId: string,horizon: string, vertical: string){
        let box = this.getOrCreate(boxId);
        box[CssGridLayout.KEY_PLACE_SELF] = horizon + " " + vertical;
        return this; 
    }

    span(startNum:number,endNum : number) : string{
        let str :string = "" + endNum;
        if(startNum < endNum){
            str = "span " + endNum;
        }
        return str;
    }

    getOrCreate(boxId: string): Record<string,string>{
        let box = this.boxes.get(boxId);
        if (box === null || box == undefined){
          box = {};
          this.boxes.set(boxId,box);
        }
        return box;
    }

}
