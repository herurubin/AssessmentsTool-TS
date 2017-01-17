
var editItemTemplate : string = `
<div id="flyout-app"></div>
    <div id="generalSettings-app" class="row"></div>
    <div class="row"><div id="subPortfoliosGrid" class="grid-base"></div></div>
`;


var assessmentsListItem : string = `
<div class="row list-group-item">
    <div class="col-lg-3 col-md-3">
        <div class="row item-title">{{title}}</div>
        <div class="row item-author">{{author}}</div>
        <div class="row item-corpID">{{corpID}}</div>
    </div>
    <div class="col-lg-7 col-sm-7">{{whatIsAssessed}}</div>
    <div class="col-lg-2 col-sm-2 vert-cen">
        <button class="btn btn-apply editAssessment" id="{{btnID}}">
            <div class="btn-label">Edit</div>
            <div class="statusbar-icon icon-edit "></div>
        </button>
    </div>
</div>
`

var assessmentsListHeader : string = `
<div class="row">
    <div style="display: inline-block"><h1>Edit Available Assessments</h1></div>
    <div style="display: inline-block"> 
        <div style="display: inline-block">or</div>
        <div id="createNew" class="btn btn-saveAll">
            <div class="btn-label">Create New</div>
            <div class="icon-newDoc statusbar-icon"></div>
        </div>
    </div>
</div>
`

var fillOutListHeader : string = `
<h1>Fill Out Assessments</h1>

`


var fillOutAssessmentHeader : string = `
    <div class="col-lg-4 col-md-4">
        <div class="row item-title">{{title}}</div>
        <div class="row item-author">{{author}}</div>
        <div class="row item-corpID">{{corpID}}</div>
    </div>
    <div class="col-lg-8 col-md-8">
        <div class="row">{{explanation}}</div>
    </div>
`


var fillOutItem : string = `
    <div class="row">
        <div class="col-lg-5 col-md-5 col-sm-8">        
            <div class="row assessment-title" >
                {{assessmentName}}
            </div>
            <div class="row assessment-title" >
                {{authorName}}
            </div>
            <div class="row assessment-title" >
                {{corpID}}
            </div>
        </div>
        
        <div class="col-lg-7">
            {{assessmentdescription}}
        </div>
        
    </div>

`

