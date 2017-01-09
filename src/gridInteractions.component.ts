/**
 * Created by herur on 1/2/2017.
 */
var selectedCells : any = [];


interface iGridInteractions {
    (selectedGrid:string)
}

let GridInteractions : iGridInteractions;
GridInteractions = function(selectedGrid){



    $(selectedGrid).bind('cellunselect', function (event){
        selectedCells = $(selectedGrid).jqxGrid('getselectedcells');
        if(selectedCells.length == 0){
            $("#obscure-settings").hide();
            $("#flyout").hide();
            $("#carat-down").hide();

        }
    })

    $(selectedGrid).bind('cellselect', function (event) {
        var args = event.args;
        selectedCells = $(selectedGrid).jqxGrid('getselectedcells');
        if(selectedCells.length > 0){
            $("#obscure-settings").show();
        }

        switch (args.datafield){

            case "checkbox":
                console.log(args);
                var onlyCheckboxes:string = "yes";
                var selectedBox = $(selectedGrid).jqxGrid('getcell', args.rowindex, "checkbox" );

                if( selectedBox.value == "checked"){
                    $("#subPortfoliosGrid").jqxGrid('setcellvalue', args.rowindex, "checkbox", "unchecked");
                }else if(selectedBox.value == "unchecked"){
                    $("#subPortfoliosGrid").jqxGrid('setcellvalue', args.rowindex, "checkbox", "checked");
                }else if(selectedBox.value == null || selectedBox.value == ""){
                    $("#subPortfoliosGrid").jqxGrid('setcellvalue', args.rowindex, "checkbox", "checked");
                    console.log(args);
                }

                for(var i:number = 0; i<selectedCells.length; i++){
                    if(selectedCells[i].datafield != "checkbox"){
                        onlyCheckboxes = "no";
                    }
                }

                if(onlyCheckboxes == "yes"){
                    $("#obscure-settings").hide();
                    $("#flyout").hide();
                    $("#flyout-carat").hide();
                }



            break;

            case "section":
                ManageFlyoutDisplay("#subPortfoliosGrid", "sectionClicked");
                PositionFlyouts("#section", {enabled:false,width:0});
                ManageFocus("#subPortfoliosGrid","section");
            break;

            case "mainQuestion":
                ManageFlyoutDisplay("#subPortfoliosGrid", "questionClicked");
                PositionFlyouts("#mainQuestion", {enabled:false,width:0});
                ManageFocus("#subPortfoliosGrid","mainQuestion");
            break;

            case "explain":
                ManageFlyoutDisplay("#subPortfoliosGrid", "explainClicked");
                PositionFlyouts("#explain", {enabled:false,width:0});
                ManageFocus("#subPortfoliosGrid","explain");
            break;

            case "responses":
                ManageFlyoutDisplay("#subPortfoliosGrid", "responsesClicked");
                var screenWidth = $(window).width();
                PositionFlyouts("#responses",{enabled:true,width:"auto"});
                ManageFocus("#subPortfoliosGrid","responses");
            break;

            case "required":
                ManageFlyoutDisplay("#subPortfoliosGrid", "requiredClicked");
                PositionFlyouts("#required", {enabled:true,width:"auto"});
                ManageFocus("#subPortfoliosGrid","required");
            break;




        }

    });



}
