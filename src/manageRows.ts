/// <reference path="./references.ts" />


module RowManagement{
    export class Rows{

        constructor(public gridSelector : string){
            this.gridSelector = gridSelector;
        }

    addRow(){
        (<any>$(this.gridSelector)).jqxGrid('addrow', null, {});
    }

    deleteSelectedRows(){
        console.log("delete selected")
    }


    }

}

