/// <reference path="templates/statusBar.template.ts" />
/// <reference path="gridInteractions.component.ts" />

var appSettings : any ={
    creationGrid: ""
}

var navStates: any = {home:1, createHome:2, createItem:3, fillOutHome:4, fillOutItem:5, dashboard:6 };
var currentNav: number = navStates.home;


interface iNavigation{ (navStates:any, dataStructure?:any  )}
let Navigation : iNavigation;
Navigation = function (navigation, quizStructure) {
    switch (navigation){
        case navStates.createItem:
            $("#sizing-container").empty().append(editItemTemplate);
            subPortfoliosGrid.createGrid();
            createGenSettings(generalInfoTemplate);
            CreateFlyouts("#flyout-app",flyoutTemplate);
            StatusbarInteractions("#subPortfoliosGrid");
            ManageFocus("","initial");

            selectedCells = $("#subPortfoliosGrid").jqxGrid('getselectedcells');
            if(selectedCells.length == 0){
                $("#obscure-settings").hide();
                $("#flyout").hide();
            }

            // fill in text fields
            if(quizStructure != null){
                $("#author-name").val(quizStructure[0].AuthorName);
                $("#author-corpid").val(quizStructure[0].AuthorID);
                $("#assess-name").val(quizStructure[0].name);
                $("#assess-this").val(quizStructure[0].whatIsAssessed);
            }





        break;

        case navStates.createHome:
            $("#sizing-container").empty();
            $("#sizing-container").append(assessmentsListHeader);


            for (var i:number=0; i<quizStructure.length; i++){

                var templateHolder = assessmentsListItem;
                 templateHolder = templateHolder.replace("{{title}}",quizStructure[i].name);
                 templateHolder = templateHolder.replace("{{author}}",quizStructure[i].AuthorName);
                 templateHolder = templateHolder.replace("{{corpID}}",quizStructure[i].AuthorID);
                 templateHolder = templateHolder.replace("{{whatIsAssessed}}",quizStructure[i].whatIsAssessed);
                 templateHolder = templateHolder.replace("{{btnID}}",quizStructure[i].name+"Edit");

                $("#sizing-container").append(templateHolder);

            }




        break;
    }
}

$(document).ready(
    function () {
        MakeHeaderFunc(headerSettings, "#main-header", singleLineHeaderTemplate);
        Navigation(navStates.createItem);



        $(window).resize(function () {
            setTimeout(function(){
                SizeGridFunc("#subPortfoliosGrid");
            }, 300);
        })

        setTimeout(function(){
            SizeGridFunc("#subPortfoliosGrid");
            GridInteractions("#subPortfoliosGrid");

        }, 300);

    }
)

interface iGeneralSettings {
    (template : string) : void;
}

let createGenSettings : iGeneralSettings;

createGenSettings = function (template) {
 $("#generalSettings-app").append(template);
}



