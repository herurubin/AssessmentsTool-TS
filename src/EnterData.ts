/// <reference path="focusmanager.component.ts" />
/// <reference path="flyouts.component.ts" />





interface iSaveAll{
    (gridSelector:string)
}

let SaveAll : iSaveAll;
SaveAll = function (gridSelector) {
    var rows = $(gridSelector).jqxGrid('getrows');

}

interface iBulkFillData{
    (target:string, targetDatafield:string, value: string)
}
let BulkFillData : iBulkFillData;
BulkFillData = function (target, targetDatafield, value) {
    for(var i:number=0; i<selectedCells.length; i++){
        $(target).jqxGrid('setcellvalue', selectedCells[i].rowindex, targetDatafield, value);
    }
}

interface iDuplicateSelected{
    (gridSelector:string)
}

let DuplicateSelected : iDuplicateSelected;
DuplicateSelected = function (gridSelector) {
    var rows = $(gridSelector).jqxGrid('getrows');
    var selectedRows:any=[];
    for(var i:number = 0; i < rows.length; i++){
        if(rows[i].checkbox == "checked"){
            var checkedRow = $(gridSelector).jqxGrid('getrowdata', i);
            selectedRows.push(checkedRow);
        }else{}
    }

    for(var j:number=0; j<selectedRows.length; j++){
        var newRowData ={
            checkbox:"unchecked",
            explain: selectedRows[j].explain,
            mainQuestion:selectedRows[j].mainQuestion,
            required: selectedRows[j].required,
            responses: selectedRows[j].responses,
            responsesData: selectedRows[j].responsesData,
            section: selectedRows[j].section
        }
        $(gridSelector).jqxGrid('addrow', null, newRowData);
    }

    console.log(selectedRows)

}


ApplyToSelected = function (target,situation) {
    var value:any;
    var targetDatafield:string;
    var finalColumnEntered:string="false";


    switch(situation){
        case "section":
            value = $("#input-section").val();
            targetDatafield = "section";
            BulkFillData(target, targetDatafield, value);


            ManageFlyoutDisplay("#subPortfoliosGrid", "questionClicked");
            PositionFlyouts("#mainQuestion", {enabled:false,width:0});

            $(target).jqxGrid('focus');
            $(target).jqxGrid('clearselection');
            var lastSelected = selectedCells.length-1;
            $(target).jqxGrid('selectcell', selectedCells[lastSelected].rowindex, 'mainQuestion');

            setTimeout(function(){
                document.getElementById("subPortfoliosGrid").blur();
                document.getElementById("input-question").focus();
            }, 200);

        break;

        case "mainQuestion":
            value = $("#input-question").val();
            targetDatafield = "mainQuestion";
            BulkFillData(target, targetDatafield, value);

            ManageFlyoutDisplay("#subPortfoliosGrid", "explainClicked");
            PositionFlyouts("#explain", {enabled:false,width:0});

            $(target).jqxGrid('focus');
            $(target).jqxGrid('clearselection');
            var lastSelected = selectedCells.length-1;
            $(target).jqxGrid('selectcell', selectedCells[lastSelected].rowindex, 'explain');

            setTimeout(function(){
                $("#subPortfoliosGrid").blur();
                $("#input-explain").focus();
            }, 200);

        break;

        case "explain":
            value = $("#input-explain").val();
            targetDatafield = "explain";
            BulkFillData(target, targetDatafield, value);

            ManageFlyoutDisplay("#subPortfoliosGrid", "responsesClicked");
            var screenWidth = $(window).width();
            PositionFlyouts("#responses",{enabled:true,width:"auto"});

            $(target).jqxGrid('focus');
            $(target).jqxGrid('clearselection');
            var lastSelected = selectedCells.length-1;
            $(target).jqxGrid('selectcell', selectedCells[lastSelected].rowindex, 'responses');

            setTimeout(function(){
                $("#subPortfoliosGrid").blur();
                $("#input-r1").focus();
            }, 200);
        break;

        case "responses":
            var ratings:any = {
                r1 : $("#input-r1").val(),
                r2 : $("#input-r2").val(),
                r3 : $("#input-r3").val(),
                r4 : $("#input-r4").val(),
                r5 : $("#input-r5").val(),
            }

            targetDatafield = "responses";

            var dataValue = JSON.stringify(ratings);

            if(dataValue != null || dataValue != ""){
                for(var i:number=0; i<selectedCells.length; i++){
                    $(target).jqxGrid('setcellvalue', selectedCells[i].rowindex, "responsesData", dataValue);
                }
            }


            value = ` 1 of 5: ${ratings.r1}  2 of 5: ${ratings.r2}  3 of 5: ${ratings.r3}   4 of 5: ${ratings.r4}   5 of 5: ${ratings.r4} `;
            BulkFillData(target, targetDatafield, value);

            ManageFlyoutDisplay("#subPortfoliosGrid", "requiredClicked");
            PositionFlyouts("#required", {enabled:true,width:"auto"});

            $(target).jqxGrid('focus');
            $(target).jqxGrid('clearselection');
            var lastSelected = selectedCells.length-1;
            $(target).jqxGrid('selectcell', selectedCells[lastSelected].rowindex, 'required');

            setTimeout(function(){
                $("#subPortfoliosGrid").blur();
                $("#required-form").focus();
            }, 200);

        break;

        case "required":
            value = $("input:radio[name='opt-or-req']:checked").val()
            targetDatafield = "required";
            BulkFillData(target, targetDatafield, value);

            ManageFlyoutDisplay("#subPortfoliosGrid", "sectionClicked");
            PositionFlyouts("#section", {enabled:false,width:0});
            finalColumnEntered="true";

            setTimeout(function(){
                $("#subPortfoliosGrid").blur();
                $("#input-req").focus();
            }, 200);

        break;
    }



    if(finalColumnEntered == "true"){
        var rows = $(target).jqxGrid('getrows');
        $(target).jqxGrid('focus');
        $(target).jqxGrid('clearselection');
        $(target).jqxGrid('addrow',null,{},"last");
        $(target).jqxGrid('selectcell', rows.length-1, 'section');
    }


}

