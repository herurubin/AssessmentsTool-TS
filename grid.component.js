/// <reference path="./references.ts" />
var GridCreation;
(function (GridCreation) {
    var AppGrid = (function () {
        function AppGrid(selector, columns, dataSource, gridData, gridSettings) {
            this.selector = selector;
            this.columns = columns;
            this.dataSource = dataSource;
            this.gridData = gridData;
            this.gridSettings = gridSettings;
            this.selector = selector;
            this.dataSource = dataSource;
            this.gridData = gridData;
            this.gridSettings = gridSettings;
            this.columns = columns;
        }
        AppGrid.prototype.createGrid = function () {
            $(this.selector).jqxGrid({
                localdata: this.gridData,
                width: '100%',
                height: '100%',
                columnsautoresize: true,
                columnsresize: true,
                showstatusbar: true,
                statusbarheight: 0,
                source: this.dataSource,
                columns: this.columns,
            });
        };
        return AppGrid;
    }());
    GridCreation.AppGrid = AppGrid;
    var spColumns = [{
            text: '',
            datafield: 'checkbox',
        }, {
            text: 'Sub Portfolio Number',
            datafield: 'subportfolionumber',
        }, {
            text: 'Sub Portfolio Name',
            datafield: 'subportfolioname',
        }, {
            text: 'Sub Adviser',
            datafield: 'subadviser',
        }, {
            text: 'Start - End Date',
            datafield: 'start-end',
        }, {
            text: 'Mandate',
            datafield: 'mandate',
        }, {
            text: 'Rate Schedule',
            datafield: 'rateschedule'
        },
        {
            text: '',
            datafield: 'isvalid',
            hidden: true
        }
    ];
    var subPortfoliosGrid = new AppGrid("#subPortfoliosGrid", spColumns, "", "", "");
})(GridCreation || (GridCreation = {}));
