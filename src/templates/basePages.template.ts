
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
    <div class="col-lg-2 col-sm-2"><button class="btn btn-apply" id="{{btnID}}">Edit</button></div>
</div>
`

var assessmentsListHeader : string = `
<h1>Edit Available Assessments</h1>

`

