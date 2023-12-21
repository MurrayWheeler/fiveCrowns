"use-strict";


fiveCrowns.pageMainView = (function () {

  return {


    /**
     * Method for page layout.
     */
    layout: function (oApp) {

      // Create page
      var page = new sap.m.Page("pageMain", { title: "Five Crowns" });

      // Add Navigation button. Normaly only for back, but used to go to page 2 for now.
      page.setShowNavButton(true);
      page.setNavButtonType("Default");
      page.setNavButtonTooltip("Game page");
      page.attachNavButtonPress(function () { fiveCrowns.controller.gotoPageGame(oApp) });

      // Add content
      // page.addContent(new sap.m.Button({ text: "Go to Page 2", press: function () { fiveCrowns.controller.gotoPage2(oApp) } }));
      vBox = new sap.m.VBox({ alignItems: "Center", justifyContent: "SpaceAround" });
      page.addContent(vBox);

      hBox = new sap.m.HBox({ alignItems: "Center", justifyContent: "SpaceAround" });
      vBox.addItem(hBox);

      playersLabel = new sap.m.Label({ text: "Players :" });
      hBox.addItem(playersLabel);
      playerCount = new sap.m.Input({ placeholder: "Number of players", type: "Number" });
      playerCount.setValue(4);
      hBox.addItem(playerCount);

      playButton = new sap.m.Button({ text: "Play" });
      playButton.attachPress(function () { fiveCrowns.controller.playButton() });
      hBox.addItem(playButton);

      // clearButton = new sap.m.Button({ text: "Clear" });
      // clearButton.attachPress(function () { fiveCrowns.controller.clearButton() });
      // hBox.addItem(clearButton);

      // // Table layout
      // mTable = new sap.m.Table({ id: "idTicketTable" });
      // mTable.setModel(fiveCrowns.model.getModel());
      // mTable.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Ticket Type" }) }));
      // mTable.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Winnings" }) }));
      // mTable.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 5" }) }));
      // mTable.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 4" }) }));
      // mTable.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 3" }) }));
      // mTable.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 2" }) }));
      // mTable.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 1" }) }));

      // mColItem1 = new sap.m.ColumnListItem({});
      // mColItem1.addCell(new sap.m.Text({ text: "{description}" }));
      // mColItem1.addCell(new sap.m.Text({ text: "{winningsOutput}" }));
      // mColItem1.addCell(new sap.m.Text({ text: "{div5}" }));
      // mColItem1.addCell(new sap.m.Text({ text: "{div4}" }));
      // mColItem1.addCell(new sap.m.Text({ text: "{div3}" }));
      // mColItem1.addCell(new sap.m.Text({ text: "{div2}" }));
      // mColItem1.addCell(new sap.m.Text({ text: "{div1}" }));

      // mTable.bindAggregation("items", "/Tickets", mColItem1);

      // vBox.addItem(mTable);


      // Add page to app
      oApp.addPage(page);
    },


  };

}());

