/// <reference path="templates/header.template.ts" />
/// <reference path="SaveLoad.ts" />
/// <reference path="Initialization.ts" />

var headerSettings={
    headerType: "greenSingleLine"
};

var quizStructure:any =[];



interface iMakeHeader {
    (settings: any, target: string, template: string) : void;
}

let MakeHeaderFunc : iMakeHeader;

MakeHeaderFunc = function (settings, target, template) {


    var headerSettings = settings;

    switch (headerSettings.headerType){
        case "greenSingleLine":
            $(target).append(template);
        break;
    }

    HeaderMenu("initialize");

}


let headerAction:any = function () {
    $(this.id).click(function () {
        HeaderMenu("#"+this.id);
    })
}

var headerMenuSetup=[
    {
        id:"#home",
        action: headerAction
    },{
        id: "#create",
        action: headerAction
    },{
        id: "#fill-out",
        action: headerAction
    },{
        id: "#dashboard",
        action:headerAction
    }];


interface iGeneralSettings {
    (template : string) : void;
}

let createGenSettings : iGeneralSettings;

createGenSettings = function (template) {
    $("#generalSettings-app").append(template);
}





interface iHeaderMenu{
    (situation:any)
}
let HeaderMenu : iHeaderMenu;


interface iNavigation{ (navStates:any, dataStructure?:any  )}
let Navigation : iNavigation;

Navigation = function (navigation, dataStructure) {

    var quizStructure:any = dataStructure;

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
            if(dataStructure != null){
                $("#author-name").val(quizStructure[0].AuthorName);
                $("#author-corpid").val(quizStructure[0].AuthorID);
                $("#assess-name").val(quizStructure[0].name);
                $("#assess-this").val(quizStructure[0].whatIsAssessed);
            }

            break;

        case navStates.createHome:
            LoadExisting("LoadAllAssessments");
        break;

        case "createHome-complete":

            $("#sizing-container").empty();
            $("#sizing-container").append(assessmentsListHeader);
            console.log("Quiz Structure",quizStructure);

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

        case navStates.fillOutHome:
            $("#sizing-container").empty();

        break;
    }
}




interface iLoadExisting{
    (situation:string, selectedItem?:string)
}
let LoadExisting : iLoadExisting;

LoadExisting = function (situation, selectedItem) {
    switch (situation){
        case "LoadAllAssessments":

            var assessmentsList:any=[];

            $.ajax({
                url:'SaveLoad.php',
                data: {
                    loadAllAssessments:"load_assessments"
                },
                type: 'POST',
                success: function (data) {
                    if(!data.error){
                        var assessmentsAll = JSON.parse(data);
                        console.log("return messages from server: ", assessmentsAll);
                        Navigation("createHome-complete", assessmentsAll);

                    }else{}
                }
            });



            break;

        case "LoadSelected":
            var selectedTitle:string = selectedItem;


            $.ajax({
                url:'LoadSelected.php',
                data: {
                    loadSelected: selectedItem
                },
                type: 'POST',
                success: function (data) {
                    if(!data.error){
                        var assessmentsAll = JSON.parse(data);
                        console.log("return messages from server: ", assessmentsAll);
                        quizStructure = assessmentsAll;
                        Navigation("createHome-complete");

                    }else{}
                }
            });


            break;
    }


}






HeaderMenu = function(situation){
    switch (situation){
        case "initialize":
            for(var i:number=0; i<headerMenuSetup.length; i++){
                headerMenuSetup[i].action();
            }
            break;

        case headerMenuSetup[0].id:
            console.log(headerMenuSetup[0].id);
            Navigation(navStates.createHome);
            break;

        case headerMenuSetup[1].id:
            console.log(headerMenuSetup[1].id);
            Navigation(navStates.fillOutHome);
            break;

        case headerMenuSetup[2].id:
            console.log(headerMenuSetup[2].id);
            break;

        case headerMenuSetup[3].id:
            console.log(headerMenuSetup[3].id);
            break;

    }

}


