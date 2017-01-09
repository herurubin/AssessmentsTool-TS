interface iManageFlyoutDisplay {
    (targetFlyoutID:string, situation:string)
}

let ManageFlyoutDisplay : iManageFlyoutDisplay;
ManageFlyoutDisplay = function (targetFlyoutID, situation) {

    switch(situation){
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

}

interface iCreateFlyouts{
    (appendToThis:string, template:string)
}

let CreateFlyouts : iCreateFlyouts;

CreateFlyouts = function(appendToThis, template){
    $(appendToThis).append(template);
    $(appendToThis).append(caratTemplate);
}


interface iPositionFlyouts{
    (target:string, overrideFlyoutWidth?:any)
}

let PositionFlyouts : iPositionFlyouts;

PositionFlyouts = function (target, overrideFlyoutWidth) {
    $("#flyout").css({"left" : 30});
    var targetHeaderPosition = $(target).offset();
    var targetHeaderWidth = $(target).width();

    if(overrideFlyoutWidth.enabled  == true){
        $("#flyout").css({"width" : overrideFlyoutWidth.width});
    }else{
        $("#flyout").css({"width" : targetHeaderWidth*1.6});
    }

    var screenWidth = $(window).width();
    var flyoutWidth = $("#flyout").width();
    var positionFlyoutHorizontally = targetHeaderPosition.left - (flyoutWidth/2) + (targetHeaderWidth/2);
    if( targetHeaderPosition.left+flyoutWidth >=  screenWidth ){
        $("#flyout").css({"left" : screenWidth - flyoutWidth - 40});
    }else if(positionFlyoutHorizontally < 0){
        $("#flyout").css({"left" : 30});
    }else{
        $("#flyout").css({"left" : positionFlyoutHorizontally});
    }

    //position Carat
    var caratWidth = $("#flyout-carat").width();
    var flyoutHeight = $("#flyout").outerHeight();
    var flyoutOffset = $("#flyout").offset();
    $("#flyout-carat").css({"left":targetHeaderPosition.left + (targetHeaderWidth/2) - (caratWidth/2), "top": flyoutOffset.top + flyoutHeight -5});


}