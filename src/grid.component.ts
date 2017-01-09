/// <reference path="./references.ts" />
module GridCreation{

    export class CustomGrid {

        constructor(public selector: string, public assessmentGridSettings: any) {
            this.selector = selector;
            this.assessmentGridSettings = assessmentGridSettings;

        }

        // testJquery(){
        //     (<any>$("#subPortfoliosGrid")).css({"width":"100px", "height":"100px", "background-color":"#000000"});
        //
        // }

        createGrid() {

            (<any>$(this.selector)).jqxGrid(
               this.assessmentGridSettings
            )
        }

    }

}

var spGridData = {
    localdata: [{}],
    datafields: [
        {
            name: 'checkbox',
            type: 'string'
        },{
            name: 'section',
            type: 'string'
        }, {
            name: 'mainQuestion',
            type: 'string'
        }, {
            name: 'explain',
            type: 'string'
        }, {
            name: 'responses',
            type: 'string'
        }, {
            name: 'required',
            type: 'string'
        }, {
            name: 'responsesData',
            type: 'string'
        }

    ],

    datatype: "array"
};


interface iHeaderCustom{
    (header:any)
}

let HeaderCustom : iHeaderCustom;
HeaderCustom = function (header) {
    var columnText = this.text;
    var columnDatafield = this.datafield;
    header.html('<div class=\"app-grid-header\" id="'+columnDatafield+'"> <div class="header-label">'+columnText+'</div></div>');
}


interface  iCheckBoxCol{
    (row:any, columnfield:any, value:any, defaulthtml:string, columnproperties:any)
}

var checkBoxColumn : iCheckBoxCol;

checkBoxColumn = function (row, columnfield, value, defaulthtml, columnproperties) {
    if(value == "unchecked"){
        return '<div class=\"unchecked\"></div>';
    }else if(value == "checked"){
        return '<div class=\"checked\"></div>';
    }else{
        return '<div class=\"unchecked\"></div>';
    }

}



var CustomStatusBar = function (statusbar) {
    // appends buttons to the status bar.
    var container = statusBarTemplate;
    statusbar.append(container);


}



var spColumns = [{
    text: '',
    datafield: 'checkbox',
    cellsrenderer: checkBoxColumn
},
    {
        text: 'Section',
        datafield: 'section',
        rendered: HeaderCustom
    },
    {
    text: 'Question Text To Display',
    datafield: 'mainQuestion',
    rendered: HeaderCustom
}, {
    text: 'Explain Answer Expectations',
    datafield: 'explain',
    rendered: HeaderCustom
}, {
    text: 'Responses',
    datafield: 'responses',
    rendered: HeaderCustom
}, {
    text: 'Required?',
    datafield: 'required',
    rendered: HeaderCustom

},{
        text: '',
        datafield: 'responsesData',
        hidden: true
    }

]

var adapter = new $.jqx.dataAdapter(spGridData);

var assessmentGridSettings = {
    width: '100%',
    height: 500,
    theme:'forec',
    editmode: 'programmatic',
    selectionmode: 'multiplecellsextended',
    columnsautoresize: true,
    columnsresize: true,
    showstatusbar: true,
    statusbarheight: 60,
    renderstatusbar: CustomStatusBar,
    source: adapter,
    columns: spColumns
}

var subPortfoliosGrid : any = new GridCreation.CustomGrid("#subPortfoliosGrid", assessmentGridSettings  );







