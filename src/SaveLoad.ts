/// <reference path="./templates/statusBar.template.ts" />
/// <reference path="Initialization.ts" />
/// <reference path="gridInteractions.component.ts" />
/// <reference path="header.component.ts" />
/// <reference path="GridManagement.ts" />



interface iAddRow {
    (target:string)
}

let AddRow : iAddRow;
AddRow= function (target) {
    $(target).jqxGrid('addrow', null, {}, 'first' );
}

interface iStatusbarInteractions {
    (target:string)
}

let StatusbarInteractions : iStatusbarInteractions;


StatusbarInteractions = function (target) {

    $("#add-new").click(function () {  $(target).jqxGrid('addrow', null, {}, 'last' );  });

    $("#delete").click(function () {   DeleteSelectedRows("#subPortfoliosGrid");  });

    $("#saveAll").click(function () {  SaveAll("#subPortfoliosGrid");  });

    $("#duplicate").click(function () {   DuplicateSelected("#subPortfoliosGrid");  });

    $("#move-up").click(function () {  ReorderRows("#subPortfoliosGrid","up");  });

    $("#move-down").click(function () {  ReorderRows("#subPortfoliosGrid","down");  });

    $("#saveAll").click(function () { SaveLoad("#subPortfoliosGrid","SaveNew"); })

};

var returnedDataStructure : any = {
    quizInfo: "",
    quizStructure: "",
    responsesData: ""
}



var headerSettings={
    headerType: "greenSingleLine"
};

var returnedData:any =[];



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

interface iHeaderMenu{
    (situation:any)
}
let HeaderMenu : iHeaderMenu;
HeaderMenu = function(situation){
    switch (situation){
        case "initialize":
            for(var i:number=0; i<headerMenuSetup.length; i++){
                headerMenuSetup[i].action();
            }
            break;

        case headerMenuSetup[0].id://home
            console.log(headerMenuSetup[0].id);
            Navigation(navStates.home);
            break;

        case headerMenuSetup[1].id: //create assessments
            console.log(headerMenuSetup[1].id);
            Navigation(navStates.createHome);
            break;

        case headerMenuSetup[2].id: //fill out assessments
            Navigation("fillOutAssessments")
            break;

        case headerMenuSetup[3].id: //dashboard
            console.log(headerMenuSetup[3].id);
            break;

    }

}


var selectedAssessment : string;
var currentNav : any = {screen:"", hasGrid:""};

interface iGeneralSettings {
    (template : string) : void;
}

let createGenSettings : iGeneralSettings;

createGenSettings = function (template) {
    $("#generalSettings-app").append(template);
}




interface iNavigation{ (navStates:any, dataStructure?:any  )}
let Navigation : iNavigation;

Navigation = function (navigation, dataStructure) {

    var quizStructure:any = dataStructure;

    switch (navigation){

        case navStates.home:
            $("#sizing-container").empty();
            break;

        case "CreateNewAssessment":
            currentNav = {screen: "CreateNewAssessment", hasGrid: false};

            $("#sizing-container").empty().append(editItemTemplate);
            subPortfoliosGrid.createGrid();
            GridInteractions("#subPortfoliosGrid");
            StatusbarInteractions("#subPortfoliosGrid");
            createGenSettings(generalInfoTemplate);
            CreateFlyouts("#flyout-app",flyoutTemplate);
            setTimeout(function(){
                SizeGridFunc("#subPortfoliosGrid");
            }, 400);


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
            currentNav = {screen: "CreateNewAssessment", hasGrid: false};
            SaveLoad('#subPortfoliosGrid','loadAll');
            break;

        case "createHome-complete":
            $("#sizing-container").empty().append(assessmentsListHeader);

            $("#createNew").click(function () {
                Navigation("CreateNewAssessment");
            });


            for (var i:number=0; i<returnedData.length; i++){

                var templateHolder :string = assessmentsListItem;
                templateHolder = templateHolder.replace("{{title}}",returnedData[i].assessmentsname);
                templateHolder = templateHolder.replace("{{author}}",returnedData[i].yourName);
                templateHolder = templateHolder.replace("{{corpID}}",returnedData[i].corpID);
                templateHolder = templateHolder.replace("{{whatIsAssessed}}",returnedData[i].whatIsAssessed);
                templateHolder = templateHolder.replace("{{btnID}}",returnedData[i].assessmentsname);

                $("#sizing-container").append(templateHolder);
            }

            //set up events
            $(".editAssessment").unbind().click(function () {
                    selectedAssessment= this.id;
                    Navigation("editSelectedAssessment");
            });
            break;

        case "fillOutAssessments":
            currentNav = {screen: "fillOutAssessments", hasGrid: false};
            $.ajax({
                url:'api.php',
                data: {loadAll : 'loadAll'},
                type: 'POST',
                success: function (data) {
                    if(!data.error){
                        returnedData = JSON.parse(data);
                        Navigation("fillOutAssessments-complete");
                    }
                }
            });

        break;

        case "fillOutAssessments-complete":
            $("#sizing-container").empty().append(fillOutListHeader);

            for (var i:number=0; i<returnedData.length; i++){

                var templateHolder :string = assessmentsListItem;
                templateHolder = templateHolder.replace("{{title}}",returnedData[i].assessmentsname);
                templateHolder = templateHolder.replace("{{author}}",returnedData[i].yourName);
                templateHolder = templateHolder.replace("{{corpID}}",returnedData[i].corpID);
                templateHolder = templateHolder.replace("{{whatIsAssessed}}",returnedData[i].whatIsAssessed);
                templateHolder = templateHolder.replace("{{btnID}}",returnedData[i].assessmentsname);

                $("#sizing-container").append(templateHolder);
            }

            //set up events
            $(".editAssessment").click(function () {
                selectedAssessment= this.id;
                alert(this.id);
                Navigation("fillOutSelected");
            });


        break;

        case "fillOutSelected":
            currentNav = {screen: "fillOutSelected", hasGrid: false};
            $("#sizing-container").empty();
            $.ajax({
                url:'api.php',
                data:{loadSpecific:selectedAssessment},
                type:'POST',
                success: function (data) {
                    returnedData = data;
                    console.log(returnedData);
                    Navigation("fillOutSelected-complete");
                }
            });


        break;

        case "fillOutSelected-complete":
            var templateHolder : string = fillOutAssessmentHeader;
            templateHolder = templateHolder.replace("", "")
            $("#sizing-container").append(returnedData);

            break;


        case "editSelectedAssessment":

            $.ajax({
                url:'api.php',
                data: {editSelectedAssessment : selectedAssessment},
                type: 'POST',
                success: function (data) {
                    if(!data.error){

                        var toJSON = JSON.parse(data);
                        console.log("JSON for quiz part:", toJSON)
                        returnedDataStructure.quizInfo = toJSON[0];
                        var someStr : string = toJSON[1];
                        var quizCleaned : string = someStr.replace(/^"?(.+?)"?$/,'$1');
                        var quizData : any = JSON.parse(quizCleaned);

                        returnedDataStructure.quizStructure = quizData;
                        Navigation("editSelectedAssessment-getResponses", returnedDataStructure);
                    }
                }
            });

            break;

        case "editSelectedAssessment-getResponses":

            $.ajax({
                url:'api.php',
                data: {getAssessmentResponses : selectedAssessment},
                type: 'POST',
                success: function (data) {
                   if(!data.error){


                       console.log("toJson only parse: ",data);

                        Navigation("editSelectedAssessment-complete", returnedDataStructure);

                   }
                }


            });



            break;


        case "editSelectedAssessment-complete":
            currentNav = {screen: "editSelectedAssessment", hasGrid: true};


            $("#sizing-container").empty().append(editItemTemplate);
            subPortfoliosGrid.createGrid();
            GridInteractions("#subPortfoliosGrid");
            StatusbarInteractions("#subPortfoliosGrid");
            createGenSettings(generalInfoTemplate);
            SizeGridFunc("#subPortfoliosGrid");
            CreateFlyouts("#flyout-app",flyoutTemplate);
            ManageFocus("","initial");

            selectedCells = $("#subPortfoliosGrid").jqxGrid('getselectedcells');
            if(selectedCells.length == 0){
                $("#obscure-settings").hide();
                $("#flyout").hide();
            }

            // fill in text fields

                $("#author-name").val(dataStructure.quizInfo.yourName);
                $("#author-corpid").val(dataStructure.quizInfo.corpID);
                $("#assess-name").val(dataStructure.quizInfo.assessmentsname);
                $("#assess-this").val(dataStructure.quizInfo.whatIsAssessed);


            console.log("responsesDAta", dataStructure.responsesData);
                var quizStructure : any = dataStructure.quizStructure;

                $('#subPortfoliosGrid').jqxGrid('clear');


                for(var i:number =0; i<quizStructure.length; i++){

                    var rowItem:any = {
                        checkbox: "unchecked",
                        explain: dataStructure.quizStructure[i].explain,
                        mainQuestion: dataStructure.quizStructure[i].mainQuestion,
                        required: dataStructure.quizStructure[i].required,
                        section: dataStructure.quizStructure[i].section,
                        responses: dataStructure.quizStructure[i].responses
                    }

                    var value = $('#subPortfoliosGrid').jqxGrid('addrow', i, rowItem);
                }
            break;


    }
}


interface iSaveLoad{
    (saveFromThisGrid: string, situation: any, selectedItem?:string );
}


let SaveLoad : iSaveLoad;

SaveLoad = function (grid, situation, selectedItem) {

    switch (situation){
        case "SaveNew":

            var rows:any = $(grid).jqxGrid('getrows');
            var assessment: any={};
            var assessmentStructure:any=[];
            var responsesData : string = "";

            var assessmentInfo:any={
                whatIsAssessed: $("#assess-this").val(),
                AssessmentName: $("#assess-name").val(),
                YourName: $("#author-name").val(),
                CorpID: $("#author-corpid").val(),
                emailList: $("#email-list").val(),
            };

            for(var i:number = 0; i<rows.length; i++){
                var rowObj:any={
                    section: rows[i].section,
                    checkbox:rows[i].checkbox,
                    explain: rows[i].explain,
                    mainQuestion: rows[i].mainQuestion,
                    required: rows[i].required,
                    responses: rows[i].responses
                };

                responsesData = responsesData + rows[i].responsesData;
                assessmentStructure.push(rowObj);
            }

            assessment={
                assessmentInfo: assessmentInfo,
                assessmentStructure: assessmentStructure,
                responsesData: responsesData
            };

            $.ajax({
                url:'api.php',
                data: {assessment : assessment},
                type: 'POST',
                success: function (data) {
                    if(!data.error){
                        console.log("returned data: ",data);
                    }
                }
            });

        break;

        case 'loadAll':
            $.ajax({
                url:'api.php',
                data: {loadAll : 'loadAll'},
                type: 'POST',
                success: function (data) {
                    if(!data.error){
                        returnedData = JSON.parse(data);
                        Navigation("createHome-complete");
                        //console.log("returned data: ",data);
                    }
                }
            });
            Navigation("createHome-complete");
            break;
    }

};


