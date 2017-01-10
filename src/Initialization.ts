

/// <reference path="templates/statusBar.template.ts" />
/// <reference path="gridInteractions.component.ts" />
/// <reference path="header.component.ts" />

var appSettings : any ={
    creationGrid: ""
}

var navStates: any = {home:1, createHome:2, createItem:3, fillOutHome:4, fillOutItem:5, dashboard:6 };
var currentNav: number = navStates.home;




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






