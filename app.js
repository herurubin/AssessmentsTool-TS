var ManageFlyoutDisplay;
ManageFlyoutDisplay = function (targetFlyoutID, situation) {
    switch (situation) {
        case "pressedEscape":
            $("#flyout").hide();
            $("#flyout-carat").hide();
            $("#obscure-settings").hide();
            $('#subPortfoliosGrid').jqxGrid('clearselection');
            break;
        case "sectionClicked":
            $("#flyout").show();
            $("#flyout-carat").show();
            $("#edit-section").show();
            $("#edit-question").hide();
            $("#edit-explain").hide();
            $("#edit-response").hide();
            $("#edit-required").hide();
            break;
        case "questionClicked":
            $("#flyout").show();
            $("#flyout-carat").show();
            $("#edit-section").hide();
            $("#edit-question").show();
            $("#edit-explain").hide();
            $("#edit-response").hide();
            $("#edit-required").hide();
            break;
        case "explainClicked":
            $("#flyout").show();
            $("#flyout-carat").show();
            $("#edit-section").hide();
            $("#edit-question").hide();
            $("#edit-explain").show();
            $("#edit-response").hide();
            $("#edit-required").hide();
            break;
        case "responsesClicked":
            $("#flyout").show();
            $("#flyout-carat").show();
            $("#edit-section").hide();
            $("#edit-question").hide();
            $("#edit-explain").hide();
            $("#edit-response").show();
            $("#edit-required").hide();
            break;
        case "requiredClicked":
            $("#flyout").show();
            $("#flyout-carat").show();
            $("#edit-section").hide();
            $("#edit-question").hide();
            $("#edit-explain").hide();
            $("#edit-response").hide();
            $("#edit-required").show();
            break;
    }
};
var CreateFlyouts;
CreateFlyouts = function (appendToThis, template) {
    $(appendToThis).append(template);
    $(appendToThis).append(caratTemplate);
};
var PositionFlyouts;
PositionFlyouts = function (target, overrideFlyoutWidth) {
    $("#flyout").css({ "left": 30 });
    var targetHeaderPosition = $(target).offset();
    var targetHeaderWidth = $(target).width();
    if (overrideFlyoutWidth.enabled == true) {
        $("#flyout").css({ "width": overrideFlyoutWidth.width });
    }
    else {
        $("#flyout").css({ "width": targetHeaderWidth * 1.6 });
    }
    var screenWidth = $(window).width();
    var flyoutWidth = $("#flyout").width();
    var positionFlyoutHorizontally = targetHeaderPosition.left - (flyoutWidth / 2) + (targetHeaderWidth / 2);
    if (targetHeaderPosition.left + flyoutWidth >= screenWidth) {
        $("#flyout").css({ "left": screenWidth - flyoutWidth - 40 });
    }
    else if (positionFlyoutHorizontally < 0) {
        $("#flyout").css({ "left": 30 });
    }
    else {
        $("#flyout").css({ "left": positionFlyoutHorizontally });
    }
    var caratWidth = $("#flyout-carat").width();
    var flyoutHeight = $("#flyout").outerHeight();
    var flyoutOffset = $("#flyout").offset();
    $("#flyout-carat").css({ "left": targetHeaderPosition.left + (targetHeaderWidth / 2) - (caratWidth / 2), "top": flyoutOffset.top + flyoutHeight - 5 });
};
var ApplyToSelected;
var ManageFocus;
ManageFocus = function (target, situation) {
    switch (situation) {
        case "initial":
            $("#cancel-edit").click(function () {
                ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
            });
            break;
        case "section":
            setTimeout(function () {
                $("#subPortfoliosGrid").blur();
                $("#input-section").focus();
                if (selectedCells.length == 1) {
                    var cell = $(target).jqxGrid('getcellvalue', selectedCells[0].rowindex, "section");
                    $("#input-section").val(cell);
                }
                else if (selectedCells.length > 1) {
                    $("#input-section").val("");
                }
            }, 200);
            $(window).unbind().keydown(function (event) {
                switch (event.which) {
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid", "section");
                        break;
                    case 27:
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                        break;
                }
            }).resize(function () {
                setTimeout(function () { SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });
            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid", "section");
            });
            break;
        case "mainQuestion":
            setTimeout(function () {
                $("#subPortfoliosGrid").blur();
                $("#input-question").focus();
                if (selectedCells.length == 1) {
                    var cell = $(target).jqxGrid('getcellvalue', selectedCells[0].rowindex, "mainQuestion");
                    $("#input-question").val(cell);
                }
                else if (selectedCells.length > 1) {
                    $("#input-question").val("");
                }
            }, 200);
            $(window).unbind().keydown(function (event) {
                switch (event.which) {
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid", "mainQuestion");
                        break;
                    case 27:
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                        break;
                }
            }).resize(function () {
                setTimeout(function () { SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });
            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid", "mainQuestion");
            });
            break;
        case "explain":
            setTimeout(function () {
                $("#subPortfoliosGrid").blur();
                $("#input-explain").focus();
                if (selectedCells.length == 1) {
                    var cell = $(target).jqxGrid('getcellvalue', selectedCells[0].rowindex, "explain");
                    $("#input-explain").val(cell);
                }
                else if (selectedCells.length > 1) {
                    $("#input-explain").val("");
                }
            }, 200);
            $(window).unbind().keydown(function (event) {
                switch (event.which) {
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid", "explain");
                        break;
                    case 27:
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                        break;
                }
            }).resize(function () {
                setTimeout(function () { SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });
            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid", "explain");
            });
            break;
        case "responses":
            setTimeout(function () {
                $("#subPortfoliosGrid").blur();
                $("#input-r1").focus();
                if (selectedCells.length == 1) {
                    var lastSelected = selectedCells[selectedCells.length - 1].rowindex;
                    var cell = $(target).jqxGrid('getcell', lastSelected, "responsesData");
                    console.log(cell.value);
                    if (cell.value != "undefined" && cell.value != null && cell.value != "") {
                        var responsesObj = JSON.parse(cell.value);
                        $("#input-r1").val(responsesObj.r1);
                        $("#input-r2").val(responsesObj.r2);
                        $("#input-r3").val(responsesObj.r3);
                        $("#input-r4").val(responsesObj.r4);
                        $("#input-r5").val(responsesObj.r5);
                    }
                    else if (cell.value == "") {
                        $("#input-r1").val("");
                        $("#input-r2").val("");
                        $("#input-r3").val("");
                        $("#input-r4").val("");
                        $("#input-r5").val("");
                    }
                }
                else if (selectedCells.length > 1) {
                    $("#input-r1").val("");
                    $("#input-r2").val("");
                    $("#input-r3").val("");
                    $("#input-r4").val("");
                    $("#input-r5").val("");
                }
            }, 200);
            $(window).unbind().keydown(function (event) {
                switch (event.which) {
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid", "responses");
                        break;
                    case 27:
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                        break;
                }
            }).resize(function () {
                setTimeout(function () { SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });
            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid", "responses");
            });
            break;
        case "required":
            $(window).unbind().keydown(function (event) {
                switch (event.which) {
                    case 13:
                        ApplyToSelected("#subPortfoliosGrid", "required");
                        break;
                    case 27:
                        ManageFlyoutDisplay("#subPortfoliosGrid", "pressedEscape");
                        break;
                }
            }).resize(function () {
                setTimeout(function () { SizeGridFunc("#subPortfoliosGrid"); }, 300);
            });
            $("#apply").unbind().click(function () {
                ApplyToSelected("#subPortfoliosGrid", "required");
            });
            break;
    }
};
var SaveAll;
SaveAll = function (gridSelector) {
    var rows = $(gridSelector).jqxGrid('getrows');
};
var BulkFillData;
BulkFillData = function (target, targetDatafield, value) {
    for (var i = 0; i < selectedCells.length; i++) {
        $(target).jqxGrid('setcellvalue', selectedCells[i].rowindex, targetDatafield, value);
    }
};
var DuplicateSelected;
DuplicateSelected = function (gridSelector) {
    var rows = $(gridSelector).jqxGrid('getrows');
    var selectedRows = [];
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].checkbox == "checked") {
            var checkedRow = $(gridSelector).jqxGrid('getrowdata', i);
            selectedRows.push(checkedRow);
        }
        else { }
    }
    for (var j = 0; j < selectedRows.length; j++) {
        var newRowData = {
            checkbox: "unchecked",
            explain: selectedRows[j].explain,
            mainQuestion: selectedRows[j].mainQuestion,
            required: selectedRows[j].required,
            responses: selectedRows[j].responses,
            responsesData: selectedRows[j].responsesData,
            section: selectedRows[j].section
        };
        $(gridSelector).jqxGrid('addrow', null, newRowData);
    }
    console.log(selectedRows);
};
ApplyToSelected = function (target, situation) {
    var value;
    var targetDatafield;
    var finalColumnEntered = "false";
    switch (situation) {
        case "section":
            value = $("#input-section").val();
            targetDatafield = "section";
            BulkFillData(target, targetDatafield, value);
            ManageFlyoutDisplay("#subPortfoliosGrid", "questionClicked");
            PositionFlyouts("#mainQuestion", { enabled: false, width: 0 });
            $(target).jqxGrid('focus');
            $(target).jqxGrid('clearselection');
            var lastSelected = selectedCells.length - 1;
            $(target).jqxGrid('selectcell', selectedCells[lastSelected].rowindex, 'mainQuestion');
            setTimeout(function () {
                document.getElementById("subPortfoliosGrid").blur();
                document.getElementById("input-question").focus();
            }, 200);
            break;
        case "mainQuestion":
            value = $("#input-question").val();
            targetDatafield = "mainQuestion";
            BulkFillData(target, targetDatafield, value);
            ManageFlyoutDisplay("#subPortfoliosGrid", "explainClicked");
            PositionFlyouts("#explain", { enabled: false, width: 0 });
            $(target).jqxGrid('focus');
            $(target).jqxGrid('clearselection');
            var lastSelected = selectedCells.length - 1;
            $(target).jqxGrid('selectcell', selectedCells[lastSelected].rowindex, 'explain');
            setTimeout(function () {
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
            PositionFlyouts("#responses", { enabled: true, width: "auto" });
            $(target).jqxGrid('focus');
            $(target).jqxGrid('clearselection');
            var lastSelected = selectedCells.length - 1;
            $(target).jqxGrid('selectcell', selectedCells[lastSelected].rowindex, 'responses');
            setTimeout(function () {
                $("#subPortfoliosGrid").blur();
                $("#input-r1").focus();
            }, 200);
            break;
        case "responses":
            var ratings = {
                'r1': $("#input-r1").val(),
                'r2': $("#input-r2").val(),
                'r3': $("#input-r3").val(),
                'r4': $("#input-r4").val(),
                'r5': $("#input-r5").val(),
            };
            targetDatafield = "responses";
            var dataValue = JSON.stringify(ratings);
            for (var i = 0; i < selectedCells.length; i++) {
                $(target).jqxGrid('setcellvalue', selectedCells[i].rowindex, "responsesData", dataValue);
            }
            value = "| 1 of 5: " + ratings.r1 + " | 2 of 5: " + ratings.r2 + " | 3 of 5: " + ratings.r3 + " |  4 of 5: " + ratings.r4 + " |  5 of 5: " + ratings.r4 + " ";
            BulkFillData(target, targetDatafield, value);
            ManageFlyoutDisplay("#subPortfoliosGrid", "requiredClicked");
            PositionFlyouts("#required", { enabled: true, width: "auto" });
            $(target).jqxGrid('focus');
            $(target).jqxGrid('clearselection');
            var lastSelected = selectedCells.length - 1;
            $(target).jqxGrid('selectcell', selectedCells[lastSelected].rowindex, 'required');
            setTimeout(function () {
                $("#subPortfoliosGrid").blur();
                $("#required-form").focus();
            }, 200);
            break;
        case "required":
            value = $("input:radio[name='opt-or-req']:checked").val();
            targetDatafield = "required";
            BulkFillData(target, targetDatafield, value);
            ManageFlyoutDisplay("#subPortfoliosGrid", "sectionClicked");
            PositionFlyouts("#section", { enabled: false, width: 0 });
            finalColumnEntered = "true";
            setTimeout(function () {
                $("#subPortfoliosGrid").blur();
                $("#input-req").focus();
            }, 200);
            break;
    }
    if (finalColumnEntered == "true") {
        var rows = $(target).jqxGrid('getrows');
        $(target).jqxGrid('focus');
        $(target).jqxGrid('clearselection');
        $(target).jqxGrid('addrow', null, {}, "last");
        $(target).jqxGrid('selectcell', rows.length - 1, 'section');
    }
};
var GridManagement;
(function (GridManagement) {
    var EditGrid = (function () {
        function EditGrid(gridSelector) {
            this.gridSelector = gridSelector;
            this.gridSelector = gridSelector;
        }
        EditGrid.prototype.CreateNewRow = function () {
            $(this.gridSelector).jqxGrid('addrow', null, {});
        };
        return EditGrid;
    }());
    GridManagement.EditGrid = EditGrid;
    var SizeGrid = (function () {
        function SizeGrid(sizingContainer) {
            this.sizingContainer = sizingContainer;
            this.sizingContainer = sizingContainer;
        }
        SizeGrid.prototype.SizeGrid = function () {
            var screenSize = $(this.sizingContainer).width();
            $(this.sizingContainer).jqxGrid({ width: screenSize });
        };
        return SizeGrid;
    }());
    GridManagement.SizeGrid = SizeGrid;
})(GridManagement || (GridManagement = {}));
var SizeGridMax = new GridManagement.SizeGrid("#sizing-container");
var SizeGridFunc;
SizeGridFunc = function (target) {
    ($(target).jqxGrid('autoresizecolumns'));
    var columns = ($(target).jqxGrid('columns'));
    var columnsTotalWidth = 0;
    for (var i = 0; i < columns.records.length - 1; i++) {
        var indexColWidth = ($(target).jqxGrid('getcolumnproperty', columns.records[i].datafield, 'width'));
        var calcTotalWidth = columnsTotalWidth + indexColWidth;
        columnsTotalWidth = calcTotalWidth;
    }
    var adjustedTarget = target.replace("#", "");
    var scrollSelector = "#" + "verticalScrollBar" + adjustedTarget;
    var scrollVis = $(scrollSelector).css('visibility');
    if (scrollVis == "hidden") {
    }
    else if (scrollVis == "visible") {
        var calcAdjusted = calcTotalWidth + 20;
        calcTotalWidth = calcAdjusted;
        console.log("scroll visible");
    }
    var totalGridWidth = $(target).width();
    var remainder = totalGridWidth - calcTotalWidth;
    var addThisToEachColumn = remainder / (columns.records.length - 2);
    for (var j = 1; j < columns.records.length - 1; j++) {
        $(target).jqxGrid('autoresizecolumn', columns.records[j].datafield);
        var indexColWidth = ($(target).jqxGrid('getcolumnproperty', columns.records[j].datafield, 'width'));
        ($(target).jqxGrid('setcolumnproperty', columns.records[j].datafield, 'width', indexColWidth + addThisToEachColumn));
    }
    var gridPosition = $(target).position();
    var screenHeight = $(window).height();
    var calculatedHeight = screenHeight - gridPosition.top - 20;
    ($(target).jqxGrid('height', calculatedHeight));
};
var ReorderRows;
ReorderRows = function (targetGrid, upOrDown) {
    var rows = $(targetGrid).jqxGrid('getrows');
    var rowsHolding = [];
    var rowsChecked = [];
    var selectedindexes = [];
    for (var i = 0; i < rows.length; i++) {
        var newRow = {
            checkbox: "unchecked",
            explain: rows[i].explain,
            mainQuestion: rows[i].mainQuestion,
            required: rows[i].required,
            responses: rows[i].responses,
            section: rows[i].section
        };
        if (rows[i].checkbox == "checked") {
            newRow.checkbox = "checked";
            selectedindexes.push(i);
            rowsChecked.push(newRow);
        }
        else {
            newRow.checkbox = "unchecked";
            rowsHolding.push(newRow);
        }
    }
    switch (upOrDown) {
        case "up":
            if (selectedindexes[0] != 0) {
                rowsHolding.splice(selectedindexes[0] - 1, 0, rowsChecked);
            }
            else {
                rowsHolding.splice(selectedindexes[0], 0, rowsChecked);
            }
            break;
        case "down":
            rowsHolding.splice(selectedindexes[0] + 1, 0, rowsChecked);
            break;
    }
    $(targetGrid).jqxGrid('clear');
    for (var k = 0; k < rowsHolding.length; k++) {
        $(targetGrid).jqxGrid('addrow', k, rowsHolding[k]);
    }
};
var DeleteSelectedRows;
DeleteSelectedRows = function (targetGrid) {
    var rows = $(targetGrid).jqxGrid('getrows');
    var deleteThese = [];
    for (var i = 0; i < rows.length; i++) {
        var id = $(targetGrid).jqxGrid('getrowid', i);
        if (rows[i].checkbox == "checked") {
            deleteThese.push(id);
        }
    }
    for (var i = 0; i < deleteThese.length; i++) {
        $(targetGrid).jqxGrid('deleterow', deleteThese[i]);
    }
};
var statusBarTemplate = "\n\n<nav class=\"navbar grid-footer\">\n  <div class=\"container-fluid footer-menu width-full\">\n   <ul class=\"nav navbar-nav width-full\">\n      <li><button id=\"add-new\" class=\"btn btn-apply\"><div class=\"btn-label\">Add New Question</div> <div class=\"icon-add statusbar-icon\"></div></button> </li>\n      <li><button id=\"duplicate\" class=\"btn btn-apply\"><div class=\"btn-label\">Duplicate Selected </div><div class=\"icon-dup statusbar-icon\"></div></button></li>\n      \n      \n      <li><button id=\"move-up\" class=\"btn btn-apply\"><div class=\"icon-up statusbar-icon\"> </div></button></li>\n      <li><button id=\"move-down\" class=\"btn btn-apply\"><div class=\"icon-down statusbar-icon\"> </div></button></li>\n      \n      <li><button id=\"delete\" class=\"btn btn-delete\"><div class=\"btn-label\">Delete Selected</div> <div class=\"icon-delete statusbar-icon\"></div></button></li>\n      <li class=\"btn-save\"><button id=\"saveAll\" class=\"btn btn-saveAll \"><div class=\"btn-label\">Save Assessment</div>  <div class=\"icon-save statusbar-icon\"></div> </button></li>\n    </ul>\n  </div>\n</nav>\n";
var AddRow;
AddRow = function (target) {
    $(target).jqxGrid('addrow', null, {}, 'first');
};
var StatusbarInteractions;
StatusbarInteractions = function (target) {
    $("#add-new").click(function () { $(target).jqxGrid('addrow', null, {}, 'last'); });
    $("#delete").click(function () { DeleteSelectedRows("#subPortfoliosGrid"); });
    $("#saveAll").click(function () { SaveAll("#subPortfoliosGrid"); });
    $("#duplicate").click(function () { DuplicateSelected("#subPortfoliosGrid"); });
    $("#move-up").click(function () { ReorderRows("#subPortfoliosGrid", "up"); });
    $("#move-down").click(function () { ReorderRows("#subPortfoliosGrid", "down"); });
};
var selectedCells = [];
var GridInteractions;
GridInteractions = function (selectedGrid) {
    $(selectedGrid).bind('cellunselect', function (event) {
        selectedCells = $(selectedGrid).jqxGrid('getselectedcells');
        if (selectedCells.length == 0) {
            $("#obscure-settings").hide();
            $("#flyout").hide();
            $("#carat-down").hide();
        }
    });
    $(selectedGrid).bind('cellselect', function (event) {
        var args = event.args;
        selectedCells = $(selectedGrid).jqxGrid('getselectedcells');
        if (selectedCells.length > 0) {
            $("#obscure-settings").show();
        }
        switch (args.datafield) {
            case "checkbox":
                console.log(args);
                var onlyCheckboxes = "yes";
                var selectedBox = $(selectedGrid).jqxGrid('getcell', args.rowindex, "checkbox");
                if (selectedBox.value == "checked") {
                    $("#subPortfoliosGrid").jqxGrid('setcellvalue', args.rowindex, "checkbox", "unchecked");
                }
                else if (selectedBox.value == "unchecked") {
                    $("#subPortfoliosGrid").jqxGrid('setcellvalue', args.rowindex, "checkbox", "checked");
                }
                else if (selectedBox.value == null || selectedBox.value == "") {
                    $("#subPortfoliosGrid").jqxGrid('setcellvalue', args.rowindex, "checkbox", "checked");
                    console.log(args);
                }
                for (var i = 0; i < selectedCells.length; i++) {
                    if (selectedCells[i].datafield != "checkbox") {
                        onlyCheckboxes = "no";
                    }
                }
                if (onlyCheckboxes == "yes") {
                    $("#obscure-settings").hide();
                    $("#flyout").hide();
                    $("#flyout-carat").hide();
                }
                break;
            case "section":
                ManageFlyoutDisplay("#subPortfoliosGrid", "sectionClicked");
                PositionFlyouts("#section", { enabled: false, width: 0 });
                ManageFocus("#subPortfoliosGrid", "section");
                break;
            case "mainQuestion":
                ManageFlyoutDisplay("#subPortfoliosGrid", "questionClicked");
                PositionFlyouts("#mainQuestion", { enabled: false, width: 0 });
                ManageFocus("#subPortfoliosGrid", "mainQuestion");
                break;
            case "explain":
                ManageFlyoutDisplay("#subPortfoliosGrid", "explainClicked");
                PositionFlyouts("#explain", { enabled: false, width: 0 });
                ManageFocus("#subPortfoliosGrid", "explain");
                break;
            case "responses":
                ManageFlyoutDisplay("#subPortfoliosGrid", "responsesClicked");
                var screenWidth = $(window).width();
                PositionFlyouts("#responses", { enabled: true, width: "auto" });
                ManageFocus("#subPortfoliosGrid", "responses");
                break;
            case "required":
                ManageFlyoutDisplay("#subPortfoliosGrid", "requiredClicked");
                PositionFlyouts("#required", { enabled: true, width: "auto" });
                ManageFocus("#subPortfoliosGrid", "required");
                break;
        }
    });
};
var singleLineHeaderTemplate = "\n\n<nav class=\"navbar green-header\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">Assessments Tool</a>\n    </div>\n    <ul class=\"nav navbar-nav\">\n      <li class=\"header-item active-header\"><a href=\"#\" id=\"home\">Home</a></li>\n      <li class=\"header-item\" ><a href=\"#\" id=\"create\">Create Assessments</a></li>\n      <li class=\"header-item\"><a href=\"#\" id=\"fill-out\">Fill Out Assessments</a></li>\n      <li class=\"header-item\"><a href=\"#\" id=\"dashboard\">Dashboard</a></li>\n    </ul>\n  </div>\n</nav>\n";
var SaveLoad;
SaveLoad = function (grid, situation, selectedItem) {
    var rows = $(grid).jqxGrid('getrows');
    var transferObject = [];
    switch (situation) {
        case "SaveNew":
            var assessmentInfo = {
                whatIsAssessed: $("#assess-this").val(),
                AssessmentName: $("#assess-name").val(),
                YourName: $("#author-name").val(),
                CorpID: $("#author-corpid").val(),
            };
            for (var i = 0; i < rows.length; i++) {
                var rowObj = {
                    section: rows[i].section,
                    checkbox: rows[i].checkbox,
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
                url: 'api.php',
                data: {
                    assessment: {
                        assessmentInfo: assessmentInfo,
                        assessmentStructure: transferObject
                    }
                },
                type: 'POST',
                success: function (data) {
                    if (!data.error) {
                        console.log("errors: ", data);
                    }
                }
            });
            break;
    }
};
var headerSettings = {
    headerType: "greenSingleLine"
};
var quizStructure = [];
var MakeHeaderFunc;
MakeHeaderFunc = function (settings, target, template) {
    var headerSettings = settings;
    switch (headerSettings.headerType) {
        case "greenSingleLine":
            $(target).append(template);
            break;
    }
    HeaderMenu("initialize");
};
var headerAction = function () {
    $(this.id).click(function () {
        HeaderMenu("#" + this.id);
    });
};
var headerMenuSetup = [
    {
        id: "#home",
        action: headerAction
    }, {
        id: "#create",
        action: headerAction
    }, {
        id: "#fill-out",
        action: headerAction
    }, {
        id: "#dashboard",
        action: headerAction
    }];
var createGenSettings;
createGenSettings = function (template) {
    $("#generalSettings-app").append(template);
};
var HeaderMenu;
var Navigation;
Navigation = function (navigation, dataStructure) {
    var quizStructure = dataStructure;
    switch (navigation) {
        case navStates.createItem:
            $("#sizing-container").empty().append(editItemTemplate);
            subPortfoliosGrid.createGrid();
            createGenSettings(generalInfoTemplate);
            CreateFlyouts("#flyout-app", flyoutTemplate);
            StatusbarInteractions("#subPortfoliosGrid");
            ManageFocus("", "initial");
            selectedCells = $("#subPortfoliosGrid").jqxGrid('getselectedcells');
            if (selectedCells.length == 0) {
                $("#obscure-settings").hide();
                $("#flyout").hide();
            }
            if (dataStructure != null) {
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
            console.log("Quiz Structure", quizStructure);
            for (var i = 0; i < quizStructure.length; i++) {
                var templateHolder = assessmentsListItem;
                templateHolder = templateHolder.replace("{{title}}", quizStructure[i].name);
                templateHolder = templateHolder.replace("{{author}}", quizStructure[i].AuthorName);
                templateHolder = templateHolder.replace("{{corpID}}", quizStructure[i].AuthorID);
                templateHolder = templateHolder.replace("{{whatIsAssessed}}", quizStructure[i].whatIsAssessed);
                templateHolder = templateHolder.replace("{{btnID}}", quizStructure[i].name + "Edit");
                $("#sizing-container").append(templateHolder);
            }
            break;
        case navStates.fillOutHome:
            $("#sizing-container").empty();
            break;
    }
};
var LoadExisting;
LoadExisting = function (situation, selectedItem) {
    switch (situation) {
        case "LoadAllAssessments":
            var assessmentsList = [];
            $.ajax({
                url: 'SaveLoad.php',
                data: {
                    loadAllAssessments: "load_assessments"
                },
                type: 'POST',
                success: function (data) {
                    if (!data.error) {
                        var assessmentsAll = JSON.parse(data);
                        console.log("return messages from server: ", assessmentsAll);
                        Navigation("createHome-complete", assessmentsAll);
                    }
                    else { }
                }
            });
            break;
        case "LoadSelected":
            var selectedTitle = selectedItem;
            $.ajax({
                url: 'LoadSelected.php',
                data: {
                    loadSelected: selectedItem
                },
                type: 'POST',
                success: function (data) {
                    if (!data.error) {
                        var assessmentsAll = JSON.parse(data);
                        console.log("return messages from server: ", assessmentsAll);
                        quizStructure = assessmentsAll;
                        Navigation("createHome-complete");
                    }
                    else { }
                }
            });
            break;
    }
};
HeaderMenu = function (situation) {
    switch (situation) {
        case "initialize":
            for (var i = 0; i < headerMenuSetup.length; i++) {
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
};
var appSettings = {
    creationGrid: ""
};
var navStates = { home: 1, createHome: 2, createItem: 3, fillOutHome: 4, fillOutItem: 5, dashboard: 6 };
var currentNav = navStates.home;
$(document).ready(function () {
    MakeHeaderFunc(headerSettings, "#main-header", singleLineHeaderTemplate);
    Navigation(navStates.createItem);
    $(window).resize(function () {
        setTimeout(function () {
            SizeGridFunc("#subPortfoliosGrid");
        }, 300);
    });
    setTimeout(function () {
        SizeGridFunc("#subPortfoliosGrid");
        GridInteractions("#subPortfoliosGrid");
    }, 300);
});
var generalInfoTemplate = "\n<div id=\"general-settings-app\">\n<div class=\"translucent\" id=\"obscure-settings\"></div>\n    <div class=\"row\">\n        <div class=\"col-lg-3\">            \n          <label for=\"assess-this\">What is being assessed?</label>\n          <input type=\"text\" class=\"form-control\" id=\"assess-this\">\n        </div>\n        <div class=\"col-lg-3\">            \n          <label for=\"assess-name\">Name this assessment:</label>\n          <input type=\"text\" class=\"form-control\" id=\"assess-name\">\n        </div>\n        <div class=\"col-lg-3\">            \n          <label for=\"author-name\">Your name:</label>\n          <input type=\"text\" class=\"form-control\" id=\"author-name\">\n        </div>\n        <div class=\"col-lg-3\">            \n          <label for=\"author-corpid\">Your Corporate ID number:</label>\n          <input type=\"text\" class=\"form-control\" id=\"author-corpid\">\n        </div>\n    </div>\n    \n    <div class=\"row\">\n        <div class=\"col-lg-3\">            \n             <div class=\"form-group\">\n              <label for=\"sel1\">Send this assessment to:</label>\n              <select class=\"form-control\" id=\"send-to\">\n                \n                <option>1</option>\n                <option>2</option>\n                <option>3</option>\n                <option>4</option>\n              </select>        \n             </div>\n        </div>\n        <div class=\"col-lg-3\">            \n          <div class=\"form-group\">\n              <label for=\"sel1\">Re-send the assessment this often:</label>\n              <select class=\"form-control\" id=\"sel1\">\n                <option>Once a month</option>\n                <option>Every quarter</option>\n                <option>Every 6 months</option>\n                <option>yearly</option>\n              </select>        \n             </div>\n        </div>\n        <div class=\"col-lg-3\">            \n          \n        </div>\n        <div class=\"col-lg-3\">            \n          \n        </div>\n     \n    \n</div>\n";
var flyoutTemplate = "\n<div id=\"flyout\" class=\"app-window\" style=\"display: none;\">\n    <div id=\"edit-section\" class=\"row\">\n            <div class=\"col-lg-12\">            \n              <label for=\"input-section\">What section should this be grouped into?</label>\n              <input type=\"text\" class=\"form-control\" id=\"input-section\">\n            </div>        \n    </div>\n\n    <div id=\"edit-question\" class=\"row\">\n            <div class=\"col-lg-12\">            \n              <label for=\"input-section\">Enter the question's text to display:</label>\n              <input type=\"text\" class=\"form-control\" id=\"input-question\">\n            </div>        \n    </div>\n    \n    <div id=\"edit-explain\" class=\"row\">\n            <div class=\"col-lg-12\">            \n              <label for=\"input-section\">Provide an explanation or context that will help the user answer:</label>\n              <input type=\"text\" class=\"form-control\" id=\"input-explain\">\n            </div>        \n    </div>\n    \n    <div id=\"edit-response\" class=\"row\">\n            <div class=\"col-5up\">            \n              <label for=\"input-r1\">Rated 1 out of 5, criteria:</label>\n              <input type=\"text\" class=\"form-control\" id=\"input-r1\">\n            </div> \n            \n            <div class=\"col-5up\">            \n              <label for=\"input-r2\">Rated 2 out of 5, criteria:</label>\n              <input type=\"text\" class=\"form-control\" id=\"input-r2\">\n            </div>\n            \n            <div class=\"col-5up\">            \n              <label for=\"input-r3\">Rated 3 out of 5, criteria:</label>\n              <input type=\"text\" class=\"form-control\" id=\"input-r3\">\n            </div>\n                        \n            <div class=\"col-5up\">            \n              <label for=\"input-r4\">Rated 4 out of 5, criteria:</label>\n              <input type=\"text\" class=\"form-control\" id=\"input-r4\">\n            </div>\n                        \n             <div class=\"col-5up\">            \n              <label for=\"input-r5\">Rated 5 out of 5, criteria:</label>\n              <input type=\"text\" class=\"form-control\" id=\"input-r5\">\n            </div>           \n    </div>\n    \n    <div id=\"edit-required\" class=\"row\">\n            <div class=\"col-lg-12\">            \n              <label for=\"required-form\">Is this required?</label>\n              <form id=\"required-form\">\n                    <label class=\"radio-inline\">\n                      <input id=\"input-req\" type=\"radio\" name=\"opt-or-req\" value=\"required\" checked>Required\n                    </label>\n                    <label class=\"radio-inline\">\n                      <input id=\"input-opt\" type=\"radio\" name=\"opt-or-req\" value=\"optional\">Optional\n                    </label>                    \n              </form>\n            </div>        \n    </div>\n    <div class=\"row\">\n        <nav class=\"navbar flyout-footer\">\n          <div class=\"container-fluid flyout-menu\">\n           <ul class=\"nav navbar-nav\">\n              <li><button id=\"cancel-edit\" class=\"btn btn-cancel\">Cancel</button> </li>\n              <li><button id=\"apply\" class=\"btn btn-apply\">Apply</button></li>              \n            </ul>\n          </div>\n        </nav>\n    </div>\n</div>\n";
var caratTemplate = "\n<div class=\"carat-down\" id=\"flyout-carat\"></div>\n";
var RowManagement;
(function (RowManagement) {
    var Rows = (function () {
        function Rows(gridSelector) {
            this.gridSelector = gridSelector;
            this.gridSelector = gridSelector;
        }
        Rows.prototype.addRow = function () {
            $(this.gridSelector).jqxGrid('addrow', null, {});
        };
        Rows.prototype.deleteSelectedRows = function () {
            console.log("delete selected");
        };
        return Rows;
    }());
    RowManagement.Rows = Rows;
})(RowManagement || (RowManagement = {}));
var GridCreation;
(function (GridCreation) {
    var CustomGrid = (function () {
        function CustomGrid(selector, assessmentGridSettings) {
            this.selector = selector;
            this.assessmentGridSettings = assessmentGridSettings;
            this.selector = selector;
            this.assessmentGridSettings = assessmentGridSettings;
        }
        CustomGrid.prototype.createGrid = function () {
            $(this.selector).jqxGrid(this.assessmentGridSettings);
        };
        return CustomGrid;
    }());
    GridCreation.CustomGrid = CustomGrid;
})(GridCreation || (GridCreation = {}));
var spGridData = {
    localdata: [{}],
    datafields: [
        {
            name: 'checkbox',
            type: 'string'
        }, {
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
var HeaderCustom;
HeaderCustom = function (header) {
    var columnText = this.text;
    var columnDatafield = this.datafield;
    header.html('<div class=\"app-grid-header\" id="' + columnDatafield + '"> <div class="header-label">' + columnText + '</div></div>');
};
var checkBoxColumn;
checkBoxColumn = function (row, columnfield, value, defaulthtml, columnproperties) {
    if (value == "unchecked") {
        return '<div class=\"unchecked\"></div>';
    }
    else if (value == "checked") {
        return '<div class=\"checked\"></div>';
    }
    else {
        return '<div class=\"unchecked\"></div>';
    }
};
var CustomStatusBar = function (statusbar) {
    var container = statusBarTemplate;
    statusbar.append(container);
};
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
    }, {
        text: '',
        datafield: 'responsesData',
        hidden: true
    }
];
var adapter = new $.jqx.dataAdapter(spGridData);
var assessmentGridSettings = {
    width: '100%',
    height: 500,
    theme: 'forec',
    editmode: 'programmatic',
    selectionmode: 'multiplecellsextended',
    columnsautoresize: true,
    columnsresize: true,
    showstatusbar: true,
    statusbarheight: 60,
    renderstatusbar: CustomStatusBar,
    source: adapter,
    columns: spColumns
};
var subPortfoliosGrid = new GridCreation.CustomGrid("#subPortfoliosGrid", assessmentGridSettings);
var editItemTemplate = "\n<div id=\"flyout-app\"></div>\n    <div id=\"generalSettings-app\" class=\"row\"></div>\n    <div class=\"row\"><div id=\"subPortfoliosGrid\" class=\"grid-base\"></div></div>\n";
var assessmentsListItem = "\n<div class=\"row list-group-item\">\n    <div class=\"col-lg-3 col-md-3\">\n        <div class=\"row item-title\">{{title}}</div>\n        <div class=\"row item-author\">{{author}}</div>\n        <div class=\"row item-corpID\">{{corpID}}</div>\n    </div>\n    <div class=\"col-lg-7 col-sm-7\">{{whatIsAssessed}}</div>\n    <div class=\"col-lg-2 col-sm-2\"><button class=\"btn btn-apply\" id=\"{{btnID}}\">Edit</button></div>\n</div>\n";
var assessmentsListHeader = "\n<h1>Edit Available Assessments</h1>\n\n";
//# sourceMappingURL=app.js.map