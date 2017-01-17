/// <reference path="EnterData.ts" />
/// <reference path="flyouts.component.ts" />
interface iApplyToSelected{
    (target:string, situation:string, bulkFillComplete?:string)
}

let ApplyToSelected : iApplyToSelected;


interface iManageFocus {
    (target:any, situation:string)
}


let ManageFocus : iManageFocus;

ManageFocus = function (target, situation) {


    switch (situation){

        case "initial":
            $("#cancel-edit").click(function () {
                ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
            })


        break;

        case "section":

            setTimeout(function(){
                $("#subPortfoliosGrid").blur();
                $("#input-section").focus();
                if(selectedCells.length == 1){
                    var cell = $(target).jqxGrid('getcellvalue', selectedCells[0].rowindex, "section");
                    $("#input-section").val(cell);
                }else if(selectedCells.length > 1){
                    $("#input-section").val("");
                }

            }, 200);


            $(window).unbind().keydown(function (event) {
                switch (event.which){
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid","section");
                    break;

                    case 27:
                        //escape key
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                    break;
                }

            }).resize(function () {
                setTimeout(function(){ SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });


            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid","section")

            })


        break;

        case "mainQuestion":
            setTimeout(function(){
                $("#subPortfoliosGrid").blur();
                $("#input-question").focus();
                if(selectedCells.length == 1){
                    var cell = $(target).jqxGrid('getcellvalue', selectedCells[0].rowindex, "mainQuestion");
                    $("#input-question").val(cell);
                }else if(selectedCells.length > 1){
                    $("#input-question").val("");
                }
            }, 200);



            $(window).unbind().keydown(function (event) {
                switch (event.which){
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid","mainQuestion");
                        break;

                    case 27:
                        //escape key
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                        break;
                }


            }).resize(function () {
                setTimeout(function(){ SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });


            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid","mainQuestion");

            });


        break;

        case "explain":

            setTimeout(function(){
                $("#subPortfoliosGrid").blur();
                $("#input-explain").focus();
                if(selectedCells.length == 1){
                    var cell = $(target).jqxGrid('getcellvalue', selectedCells[0].rowindex, "explain");
                    $("#input-explain").val(cell);
                }else if(selectedCells.length > 1){
                    $("#input-explain").val("");
                }
            }, 200);


            $(window).unbind().keydown(function (event) {
                switch (event.which){
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid","explain");
                        break;

                    case 27:
                        //escape key
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                        break;
                }


            }).resize(function () {
                setTimeout(function(){ SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });


            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid","explain");
            });

        break;

        case "responses":

            setTimeout(function(){
                $("#subPortfoliosGrid").blur();
                $("#input-r1").focus();
                if(selectedCells.length == 1){
                    var lastSelected = selectedCells[selectedCells.length-1].rowindex;
                    var cell = $(target).jqxGrid('getcell', lastSelected, "responsesData");
                    console.log(cell.value);

                    if(cell.value != "undefined" && cell.value != null && cell.value != "" ){
                        var responsesObj = JSON.parse(cell.value);

                        setTimeout(function () {
                            $("#input-r1").val(responsesObj.r1);
                            $("#input-r2").val(responsesObj.r2);
                            $("#input-r3").val(responsesObj.r3);
                            $("#input-r4").val(responsesObj.r4);
                            $("#input-r5").val(responsesObj.r5);
                        }, 300);

                    }else if(cell.value == ""){
                        setTimeout(function () {
                            $("#input-r1").val("");
                            $("#input-r2").val("");
                            $("#input-r3").val("");
                            $("#input-r4").val("");
                            $("#input-r5").val("");
                        }, 300);
                    }


                }else if(selectedCells.length > 1){
                    setTimeout(function () {
                        $("#input-r1").val("");
                        $("#input-r2").val("");
                        $("#input-r3").val("");
                        $("#input-r4").val("");
                        $("#input-r5").val("");
                    }, 300)

                }
            }, 200);

            $(window).unbind().keydown(function (event) {
                switch (event.which){
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid","responses");
                        break;

                    case 27:
                        //escape key
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                        break;
                }


            }).resize(function () {
                setTimeout(function(){ SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });

            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid","responses");

            });

        break;

        case "required":

            $(window).unbind().keydown(function (event) {
                switch (event.which){
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid","required");
                        break;

                    case 27:
                        //escape key
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                        break;
                }


            }).resize(function () {
                setTimeout(function(){ SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });

            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid","required");

            });

        break;


    }





}