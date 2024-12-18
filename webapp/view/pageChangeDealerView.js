"use-strict";


fiveCrowns.pageChangeDealerView = (function () {

  return {


    /**
     * Method for page layout.
     */
    layout: function (oApp) {

      // Create page
      var page = new sap.m.Page("pageChangeDealer", { title: "Change Dealer" });

      // Add content
      var btnChangeDealerBack = new sap.m.Button({ icon: "sap-icon://nav-back", press: function () { fiveCrowns.pageChangeDealerController.onChangeDealerBack(oApp); } });
      var barChangeDealerHeader = new sap.m.Toolbar({ id: "idBarChangeDealerHeader" });
      barChangeDealerHeader.addContent(btnChangeDealerBack);
      page.setCustomHeader(barChangeDealerHeader);

      // Table layout
      tabChangeDealer = new sap.m.Table({ id: "idChangeDealer", sticky: ["ColumnHeaders", "HeaderToolbar", "InfoToolbar"] });
      var oModel = new sap.ui.model.json.JSONModel(fiveCrowns.model.getChangeDealerModel());
      tabChangeDealer.setModel(oModel);

      // Add columns
      tabChangeDealer.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Select" }) }));
      tabChangeDealer.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Player" }) }));
      tabChangeDealer.getColumns()[0].setWidth("25%");

      // Add cells
      colItemDealer = new sap.m.ColumnListItem({});
      // colItemDealer.addCell(new sap.m.RadioButton({ value: "{selected}", change: function () { fiveCrowns.pageChangeDealerController.onChangeDealer(this) } }));
      // colItemDealer.addCell(new sap.m.RadioButton({ id: "idRadioButton", groupName: "rbGroup1" }));
      colItemDealer.addCell(new sap.m.RadioButton({ selected: "{selected}", groupName: "rbGroup1" }));
      colItemDealer.addCell(new sap.m.Text({ text: "{playerName}" }));

      tabChangeDealer.bindAggregation("items", "/players", colItemDealer);
      page.addContent(tabChangeDealer);


      // Add page to app
      oApp.addPage(page);

    },



  };

}());

