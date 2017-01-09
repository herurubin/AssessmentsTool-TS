///<reference path = "./references.ts" />

module GridManagement{

    export class EditGrid{
        constructor( public gridSelector : string){
            this.gridSelector = gridSelector;
        }

        CreateNewRow(){
            (<any>$(this.gridSelector)).jqxGrid('addrow',null,{});
        }
    }

    export class SizeGrid{
        constructor( public sizingContainer : string ){
            this.sizingContainer = sizingContainer;
        }
        SizeGrid(){
            var screenSize = $(this.sizingContainer).width();
            (<any>$(this.sizingContainer)).jqxGrid({width: screenSize});

        }
    }
}


var SizeGridMax = new GridManagement.SizeGrid("#sizing-container");



//////// Size Grid Columns

interface iSizeGrid{
    ( target : string) : void;
}

var SizeGridFunc : iSizeGrid;

SizeGridFunc = function (target) {
    (<any>($(target).jqxGrid('autoresizecolumns')));
    var columns : any = (<any>($(target).jqxGrid('columns')));
    var columnsTotalWidth : number = 0;
    for(var i:number = 0; i<columns.records.length-1; i++){
        var indexColWidth = (<any>($(target).jqxGrid('getcolumnproperty', columns.records[i].datafield, 'width')));
        var calcTotalWidth = columnsTotalWidth + indexColWidth;
        columnsTotalWidth = calcTotalWidth;
    }
    //check if scrollbars are visible
    var adjustedTarget = target.replace("#","");
    var scrollSelector = "#"+"verticalScrollBar"+adjustedTarget;
    var scrollVis :any = $(scrollSelector).css('visibility');
    if(scrollVis == "hidden"){
        console.log("scroll hidden")
    }else if(scrollVis == "visible"){
        var calcAdjusted:number = calcTotalWidth + 20;
        calcTotalWidth = calcAdjusted;
        console.log("scroll visible")
    }
    //

    var totalGridWidth : number = $(target).width();
    var remainder : number = totalGridWidth - calcTotalWidth;
    var addThisToEachColumn = remainder/(columns.records.length-2);

    ///start loop at One because we want to ignore the checkbox column
    for(var j:number = 1; j< columns.records.length-1; j++){
        (<any>$(target).jqxGrid('autoresizecolumn',columns.records[j].datafield));
        var indexColWidth = (<any>($(target).jqxGrid('getcolumnproperty', columns.records[j].datafield, 'width')));
        (<any>($(target).jqxGrid('setcolumnproperty', columns.records[j].datafield, 'width', indexColWidth+addThisToEachColumn )));

    }

    //set the height so it fits on screen
    var gridPosition = $(target).position();
    var screenHeight = $(window).height();
    var calculatedHeight = screenHeight - gridPosition.top -20;
    (<any>($(target).jqxGrid('height', calculatedHeight)));

}


//reorder rows

interface iReorderRows{
    (targetGrid:string, upOrDown:string)
}

let ReorderRows:iReorderRows;

ReorderRows = function (targetGrid, upOrDown) {
    //get selected rows
    var rows:any = $(targetGrid).jqxGrid('getrows');
    var rowsHolding:any=[];
    var rowsChecked:any=[];
    var selectedindexes:any=[];

    for(var i:number =0; i<rows.length; i++){

            var newRow:any={
                checkbox: "unchecked",
                explain: rows[i].explain,
                mainQuestion: rows[i].mainQuestion,
                required: rows[i].required,
                responses: rows[i].responses,
                section: rows[i].section
            }


           if(rows[i].checkbox == "checked"){
                newRow.checkbox="checked";
               selectedindexes.push(i);
               rowsChecked.push(newRow);
           }else {
               newRow.checkbox="unchecked"
               rowsHolding.push(newRow);
           }
    }


    switch (upOrDown){
        case "up":
            if(selectedindexes[0] != 0){
                rowsHolding.splice( selectedindexes[0]-1 ,0, rowsChecked);
            }else{
                rowsHolding.splice( selectedindexes[0] ,0, rowsChecked);
            }

        break;

        case "down":
            rowsHolding.splice( selectedindexes[0]+1 ,0, rowsChecked);
        break;
    }







    $(targetGrid).jqxGrid('clear');
    for(var k:number=0; k<rowsHolding.length; k++){
        $(targetGrid).jqxGrid('addrow', k, rowsHolding[k]);
    }




}

// Delete Rows

interface iDeleteSelectedRows{
    (targetGrid:string)
}

let DeleteSelectedRows : iDeleteSelectedRows;

DeleteSelectedRows = function (targetGrid) {
    var rows = $(targetGrid).jqxGrid('getrows');
    var deleteThese: any = [];
    for (var i: number = 0; i < rows.length; i++) {
        var id = $(targetGrid).jqxGrid('getrowid', i);
        if (rows[i].checkbox == "checked") {
            deleteThese.push(id);
        }
    }

    for (var i: number = 0; i < deleteThese.length; i++) {

        $(targetGrid).jqxGrid('deleterow', deleteThese[i]);

    }
}

