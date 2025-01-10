"use-strict";


fiveCrowns.pageReorderView = (function () {

  return {


    /**
     * Method for page layout.
     */
    layout: function (oApp) {

      // Create page
      var page = new sap.m.Page("pageReorder", { title: "Reorder Players" });

      // Build menu button
      var menuItemBack = new sap.m.MenuItem({ icon: "sap-icon://nav-back", text: "Back", press: function () { fiveCrowns.pageReorderController.onReorderBack(oApp); } });

      var menuReorder = new sap.m.Menu({ items: [] });
      var menuButtonReorder = new sap.m.MenuButton({ icon: "sap-icon://menu2", menu: menuReorder });

      // Add menu etc to Header toolbar
      var barReorderHeader = new sap.m.Toolbar({ id: "idBarReorderHeader" });
      barReorderHeader.addContent(new sap.m.Image({ src: "resources/crown.png", width: "80px", height: "45px" }));
      barReorderHeader.addContent(new sap.m.Text({ text: "Five Crowns" }));
      barReorderHeader.addContent(new sap.m.ToolbarSpacer());
      // barReorderHeader.addContent(menuButtonReorder);
      barReorderHeader.addContent(new sap.m.Button({ icon: "sap-icon://nav-back", press: function () { fiveCrowns.pageReorderController.onReorderBack(oApp); } }));
      page.setCustomHeader(barReorderHeader);



      // Table layout
      tabReorder = new sap.m.Table({ id: "idPlayerReorder", sticky: ["ColumnHeaders", "HeaderToolbar", "InfoToolbar"] });
      var oModel = new sap.ui.model.json.JSONModel(fiveCrowns.model.getReorderModel());
      tabReorder.setModel(oModel);

      // Add columns
      tabReorder.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Position" }) }));
      tabReorder.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Player" }) }));
      tabReorder.getColumns()[0].setWidth("25%");

      // Add cells
      colItemPlayer = new sap.m.ColumnListItem({});
      colItemPlayer.addCell(new sap.m.Input({ id: "idPlayerPosition", value: "{playerPosition}", change: function () { fiveCrowns.pageReorderController.onReorderChange(this) } }));
      colItemPlayer.addCell(new sap.m.Text({ text: "{playerName}" }));


      // debugger;
      // // var dndconfig = new sap.ui.core.dnd.DragDropBase({
      //   var dndconfig = {
      //     groupName: "available2selected",
      //   targetAggregation: "items",
      //   dropPosition: "Between", drop: "onDropSelectedProductsTable"
      // };
      // tabReorder.addDragDropConfig(dndconfig);
      // {
      //   groupName: "available2selected", targetAggregation: "items",
      //   dropPosition: "Between", drop: "onDropSelectedProductsTable"
      // },
      // {
      //   sourceAggregation: "items", targetAggregation: "items",
      //   dropPosition: "Between", drop: "onDropSelectedProductsTable"

      // tabReorder.addDragDropConfig([{ groupName: "selected2available", sourceAggregation: "items" },
      // {
      //   groupName: "available2selected", targetAggregation: "items",
      //   dropPosition: "Between", drop: "onDropSelectedProductsTable"
      // },
      // {
      //   sourceAggregation: "items", targetAggregation: "items",
      //   dropPosition: "Between", drop: "onDropSelectedProductsTable"
      // }]);




      tabReorder.bindAggregation("items", "/players", colItemPlayer);
      page.addContent(tabReorder);


      // Add page to app
      oApp.addPage(page);

      // Load custom CSS
      jQuery.sap.includeStyleSheet("css/style.css");
      page.addStyleClass("myCustomBackground");

      tabReorder.addStyleClass("myTableBackground");
      tabReorder.addStyleClass("myTableFontColor");
      tabReorder.addStyleClass("myTableFontSize");
      tabReorder.addStyleClass("myTableInputMargins");

    },



  };

}());

