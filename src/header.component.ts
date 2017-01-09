var headerSettings={
    headerType: "greenSingleLine"
};




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
}

