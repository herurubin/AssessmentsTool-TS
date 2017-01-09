/// <reference path="./references.ts" />
var GridCreation;
(function (GridCreation) {
    var CustomGrid = (function () {
        function CustomGrid(selector, columns, dataSource, gridData, gridSettings) {
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
        CustomGrid.prototype.createGrid = function () {
            $(this.selector).jqxGrid({
                localdata: spGridData,
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
        return CustomGrid;
    }());
    GridCreation.CustomGrid = CustomGrid;
})(GridCreation || (GridCreation = {}));
var spGridData = Array;
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
var subPortfoliosGrid = new GridCreation.CustomGrid("subPortfoliosGrid", spColumns, "", "", "");
subPortfoliosGrid.createGrid();
