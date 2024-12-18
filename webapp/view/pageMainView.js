"use-strict";


fiveCrowns.pageMainView = (function () {

  return {


    /**
     * Method for page layout.
     */
    layout: function (oApp) {

      // Create page
      var page = new sap.m.Page("pageMain", { title: "Five Crowns" });


      // Page Add header
      var menuItemNew = new sap.m.MenuItem({ icon: "sap-icon://media-play", text: "New game", press: function(){fiveCrowns.pageMainController.onNewGame(oApp);} });
      var menuItemResume = new sap.m.MenuItem({ icon: "sap-icon://restart", text: "Resume game", press: function(){fiveCrowns.pageMainController.onResumeGame(oApp);} });
      var menuItemSettings = new sap.m.MenuItem({ icon: "sap-icon://action-settings", text: "Settings", press: function(){fiveCrowns.pageMainController.onSettings(oApp);} });
      var menuItemBack = new sap.m.MenuItem({ icon: "sap-icon://nav-back", text: "Back", press: function(){oApp.back();} });

      var menuMain = new sap.m.Menu({ items: [menuItemNew, menuItemResume, menuItemSettings, menuItemBack] });
      var menuButtonMain = new sap.m.MenuButton({ icon: "sap-icon://menu2", menu: menuMain });
      var barMainHeader = new sap.m.Toolbar({ id: "idBarMainHeader" });
      barMainHeader.addContent(menuButtonMain);
      page.setCustomHeader(barMainHeader);



      // Add content
      // page.addContent(new sap.m.Button({ text: "Go to Page 2", press: function () { fiveCrowns.pageMainController.gotoPage2(oApp) } }));
      vBox = new sap.m.VBox({ alignItems: "Center", justifyContent: "SpaceAround" });
      page.addContent(vBox);

      hBox = new sap.m.HBox({ alignItems: "Center", justifyContent: "SpaceAround" });
      vBox.addItem(hBox);

      playersLabel = new sap.m.Label({ text: "Players :" });
      hBox.addItem(playersLabel);
      playerCount = new sap.m.Input({ id: "playerCount", placeholder: "Number of players", type: "Number" });
      playerCount.setValue(fiveCrowns.settings.oSettings.defaultPlayerCount);
      hBox.addItem(playerCount);

      playButton = new sap.m.Button({ text: "Play" });
      playButton.attachPress(function () { fiveCrowns.pageMainController.onPlayButton(oApp) });
      hBox.addItem(playButton);

      // clearButton = new sap.m.Button({ text: "Clear" });
      // clearButton.attachPress(function () { fiveCrowns.pageMainController.clearButton() });
      // hBox.addItem(clearButton);

      // // Table layout
      // tabRounds = new sap.m.Table({ id: "idTicketTable" });
      // tabRounds.setModel(fiveCrowns.model.getModel());
      // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Ticket Type" }) }));
      // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Winnings" }) }));
      // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 5" }) }));
      // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 4" }) }));
      // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 3" }) }));
      // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 2" }) }));
      // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Division 1" }) }));

      // colListItem = new sap.m.ColumnListItem({});
      // colListItem.addCell(new sap.m.Text({ text: "{description}" }));
      // colListItem.addCell(new sap.m.Text({ text: "{winningsOutput}" }));
      // colListItem.addCell(new sap.m.Text({ text: "{div5}" }));
      // colListItem.addCell(new sap.m.Text({ text: "{div4}" }));
      // colListItem.addCell(new sap.m.Text({ text: "{div3}" }));
      // colListItem.addCell(new sap.m.Text({ text: "{div2}" }));
      // colListItem.addCell(new sap.m.Text({ text: "{div1}" }));

      // tabRounds.bindAggregation("items", "/Tickets", colListItem);

      // vBox.addItem(tabRounds);


      // Add page to app
      oApp.addPage(page);
    },


  };

}());

