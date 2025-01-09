"use-strict";


fiveCrowns.pageGameView = (function () {

  return {


    /**
     * Method for page layout.
     */
    layout: function (oApp) {


      // Create page
      // debugger;
      // pageMmm = document.getElementById("pageGame");
      // var page = new sap.m.Page("pageGame", { title: "Game page" });

      // if ( oApp.getPage("pageGame") ) {
      //   return;
      // }

      //  Create skeleton earlier. Then hide columns when displaying page
      // page = oApp.getPage("pageGame");
      // page.getContent()[0].getItems()[1].getColumns()[1].setVisible(false)
      // probably need to save the table globally so I can retrieve it.





      // page = oApp.getPage("pageGame");
      // if (page === null) {
      //   var page = new sap.m.Page("pageGame", { title: "Game page" });
      // };

      var page = new sap.m.Page("pageGame", { title: "Game page" });


      // Build menu button
      var menuItemClear = new sap.m.MenuItem({ icon: "sap-icon://clear-all", text: "Clear scores", press: function () { fiveCrowns.pageGameController.onClearScores(); } });
      var menuItemReorder = new sap.m.MenuItem({ icon: "sap-icon://citizen-connect", text: "Reorder players", press: function () { fiveCrowns.pageGameController.onReorderPlayers(oApp); } });
      var menuItemDealer = new sap.m.MenuItem({ icon: "sap-icon://people-connected", text: "Change dealer", press: function () { fiveCrowns.pageGameController.onDealerChange(oApp); } });
      // var menuItemBack = new sap.m.MenuItem({ icon: "sap-icon://nav-back", text: "Back", press: function () { oApp.back(); } });
      var menuItemBack = new sap.m.MenuItem({ icon: "sap-icon://nav-back", text: "Back", press: function () { fiveCrowns.pageGameController.onBack(oApp); } });
      var menuItemRefresh = new sap.m.MenuItem({ icon: "sap-icon://refresh", text: "Refresh", press: function () { fiveCrowns.pageGameController.onGameRefresh(); } });
      // debugger; // Remove refresh option later after testing  
      // var menuGame = new sap.m.Menu({ items: [menuItemReorder, menuItemClear, menuItemBack, menuItemRefresh] });
      var menuGame = new sap.m.Menu({ items: [menuItemReorder, menuItemDealer, menuItemClear, menuItemBack] });
      var menuButtonGame = new sap.m.MenuButton({ icon: "sap-icon://menu2", menu: menuGame });

      // Add menu etc to Header toolbar
      var barGameHeader = new sap.m.Toolbar({ id: "idBarGameHeader" });
      barGameHeader.addContent(menuButtonGame);
      barGameHeader.addContent(new sap.m.Image({ src: "resources/crown.png", width: "80px", height: "45px" }));
      barGameHeader.addContent(new sap.m.Text({ text: "Five Crowns" }));
      barGameHeader.addContent(new sap.m.ToolbarSpacer());
      barGameHeader.addContent(new sap.m.Button({ icon: "sap-icon://nav-back", press: function () { fiveCrowns.pageGameController.onBack(oApp); } }));
      page.setCustomHeader(barGameHeader);


      // Table layout
      tabRounds = new sap.m.Table({ id: "idGameTable", sticky: ["ColumnHeaders", "HeaderToolbar", "InfoToolbar"] });
      var oModel = new sap.ui.model.json.JSONModel(fiveCrowns.model.getModel());
      tabRounds.setModel(oModel);
      // Add columns
      // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "Round" }) }));
      tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: " " }) }));
      // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Image({ src: "resources/crown.png", width: "80px", height: "50px" }) }));

      players = fiveCrowns.model.getModel().players;      // Add players as columns
      for (let playerNum = 0; playerNum < fiveCrowns.model.getMaxPlayers(); playerNum++) {
        playerName = players[playerNum].playerName;
        playerHeaderId = 'playerName-' + playerNum;
        placeHolder = fiveCrowns.model.getDefaultPlayerName(playerNum);
        tabRounds.addColumn(new sap.m.Column(
          {
            header: new sap.m.Input({
              id: playerHeaderId,
              value: playerName,
              placeholder: placeHolder,
              change: function () { fiveCrowns.pageGameController.onPlayerChange(this) }
            })
          }
        ));
        // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Input({ id: playerHeaderId, value: playerName }).addStyleClass("playerNameHeader") }));
        // tabRounds.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: playerName }) }));
      }


      // Sample XML for player name suggestions
      //   <Input
      // 	id="productInput"
      // 	placeholder="Enter product"
      // 	showSuggestion="true"
      // 	showValueHelp="false"
      // 	suggestionItems="{/ProductCollection}">
      // 	<suggestionItems>
      // 		<core:Item text="{Name}" />
      // 	</suggestionItems>
      // </Input>


      // Add cells
      colListItem = new sap.m.ColumnListItem({});
      colListItem.addCell(new sap.m.Text({ id: "roundId", text: "{round}" }));
      // colListItem.addCell(new sap.m.Input({ value: "{s0}", type: "Number", styleClass: "sapUiSizeCompact", change: function(){fiveCrowns.pageGameController.onScoreChange()} }));   
      // colListItem.addCell(new sap.m.Input({ id: "s-0", value: "{s0}", textAlign: sap.ui.core.TextAlign.Center, type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "s-0", value: "{s0}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "s-1", value: "{s1}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "s-2", value: "{s2}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "s-3", value: "{s3}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "s-4", value: "{s4}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "s-5", value: "{s5}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "s-6", value: "{s6}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "s-7", value: "{s7}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));

      // debugger;  // Set underline only
      // colListItem.addStyleClass("sapUiSmallMarginBottom");
      colListItem.getCells()[3].addStyleClass("sapUiSmallMarginBottom");
      colListItem.getCells()[4].addStyleClass("sapUiSmallMarginBottom");

      tabRounds.bindAggregation("items", "/rounds", colListItem);
      page.addContent(tabRounds);

      // Page Add footer
      barTotal = new sap.m.Toolbar({ id: "idBarTotal" });
      barTotal.addContent(new sap.m.Input({ value: "Total", editable: false }));
      barTotal.addContent(new sap.m.Input({ id: "total0", textAlign: sap.ui.core.TextAlign.Center, type: "Number", editable: false }));
      barTotal.addContent(new sap.m.Input({ id: "total1", textAlign: sap.ui.core.TextAlign.Center, type: "Number", editable: false }));
      barTotal.addContent(new sap.m.Input({ id: "total2", textAlign: sap.ui.core.TextAlign.Center, type: "Number", editable: false }));
      barTotal.addContent(new sap.m.Input({ id: "total3", textAlign: sap.ui.core.TextAlign.Center, type: "Number", editable: false }));
      barTotal.addContent(new sap.m.Input({ id: "total4", textAlign: sap.ui.core.TextAlign.Center, type: "Number", editable: false }));
      barTotal.addContent(new sap.m.Input({ id: "total5", textAlign: sap.ui.core.TextAlign.Center, type: "Number", editable: false }));
      barTotal.addContent(new sap.m.Input({ id: "total6", textAlign: sap.ui.core.TextAlign.Center, type: "Number", editable: false }));
      barTotal.addContent(new sap.m.Input({ id: "total7", textAlign: sap.ui.core.TextAlign.Center, type: "Number", editable: false }));
      page.setFooter(barTotal);
      // page.setFloatingFooter(true);


      // Add page to app
      oApp.addPage(page);



      // Load custom CSS
      jQuery.sap.includeStyleSheet("css/style.css");
      page.addStyleClass("myCustomBackground");

      tabRounds.addStyleClass("myTableBackground");
      tabRounds.addStyleClass("myTableFontColor");
      tabRounds.addStyleClass("myTableFontSize");
      tabRounds.addStyleClass("myTableInputMargins");

      barTotal.addStyleClass("myToolbarFontSize");
      barTotal.addStyleClass("myTableInputMargins");


    },



  };

}());

