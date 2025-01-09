"use-strict";


fiveCrowns.pageGamesView = (function () {

  return {


    /**
     * Method for page layout.
     */
    layout: function (oApp) {

      // Create page
      var page = new sap.m.Page("pageGames", { title: "Games page" });



      // Build menu button
      var menuItemView = new sap.m.MenuItem({ icon: "sap-icon://media-play", text: "View game", press: function () { fiveCrowns.pageGamesController.onGamesView(oApp); } });
      var menuItemDelete = new sap.m.MenuItem({ icon: "sap-icon://delete", text: "Delete game(s)", press: function () { fiveCrowns.pageGamesController.onGamesDelete(oApp); } });
      var menuItemBack = new sap.m.MenuItem({ icon: "sap-icon://nav-back", text: "Back", press: function () { fiveCrowns.pageGamesController.onGamesBack(oApp); } });

      var menuGames = new sap.m.Menu({ items: [menuItemView, menuItemDelete, menuItemBack] });
      var menuButtonGames = new sap.m.MenuButton({ icon: "sap-icon://menu2", menu: menuGames });

      // Add menu etc to Header toolbar
      var barGamesHeader = new sap.m.Toolbar({ id: "idBarGamesHeader" });
      barGamesHeader.addContent(menuButtonGames);
      barGamesHeader.addContent(new sap.m.Image({ src: "resources/crown.png", width: "80px", height: "45px" }));
      barGamesHeader.addContent(new sap.m.Text({ text: "Five Crowns" }));
      barGamesHeader.addContent(new sap.m.ToolbarSpacer());
      barGamesHeader.addContent(new sap.m.Button({ icon: "sap-icon://nav-back", press: function () { fiveCrowns.pageGamesController.onGamesBack(oApp); } }));
      page.setCustomHeader(barGamesHeader);



      // Table layout
      tabGames = new sap.m.Table({ id: "idGamesTable", mode: "MultiSelect", includeItemInSelection: true });
      var oModel = new sap.ui.model.json.JSONModel(fiveCrowns.games.getModel());
      tabGames.setModel(oModel);

      // Row press event no longer wanted. Code left for reference
      // tabGames.attachSelectionChange(function (oEvent) { fiveCrowns.pageGamesController.onRowPress(oEvent); });


      // Add columns
      // tabGames.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Id" }) }));
      tabGames.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Name" }) }));


      // Add cells
      colListItem = new sap.m.ColumnListItem({});
      // colListItem.addCell(new sap.m.Text({ id: "gameId", text: "{gameId}" }));
      colListItem.addCell(new sap.m.Button({ id: "gameName", text: "{gameName}", type: "Transparent", press: function () { fiveCrowns.pageGamesController.onNamePress(this); } }));


      tabGames.bindAggregation("items", "/game", colListItem);
      page.addContent(tabGames);


      // Add page to app
      oApp.addPage(page);

    },


  };

}());

