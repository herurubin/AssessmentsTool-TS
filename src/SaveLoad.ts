/// <reference path="Initialization.ts" />
/// <reference path="header.component.ts" />


interface iSaveLoad{
    (saveFromThisGrid: string, situation: any, selectedItem?:string );
}


let SaveLoad : iSaveLoad;

SaveLoad = function (grid, situation, selectedItem) {

    var rows = $(grid).jqxGrid('getrows');
    var transferObject:any=[];

    switch (situation){
        case "SaveNew":
            var assessmentInfo:any={
                whatIsAssessed: $("#assess-this").val(),
                AssessmentName: $("#assess-name").val(),
                YourName: $("#author-name").val(),
                CorpID: $("#author-corpid").val(),
            };

            for(var i:number = 0; i<rows.length; i++){
                var rowObj:any={
                    section: rows[i].section,
                    checkbox:rows[i].checkbox,
                    explain: rows[i].explain,
                    mainQuestion: rows[i].mainQuestion,
                    required: rows[i].required,
                    responses: rows[i].responses,
                    responsesData: JSON.parse(rows[i].responsesData)
                };

                console.log(rows[i].responsesData);
                transferObject.push(rowObj);
            }

            $.ajax({
                url:'api.php',
                data: {
                    assessment:{
                        assessmentInfo: assessmentInfo,
                        assessmentStructure: transferObject
                    }

                },
                type: 'POST',
                success: function (data) {
                    if(!data.error){
                        console.log("errors: ",data);
                    }
                }
            });


        break;


    }

}


