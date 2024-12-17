"use-strict";


fiveCrowns.pageGameLandscapeView = (function () {

  return {

    layout: function (oApp) {

      // var page = new sap.m.Page("pageGameLandscape", { title: "Game page" });
      var page = new sap.m.Page("pageGameLandscape", { showHeader: false });

      // Page Add header
      var menuItemClear = new sap.m.MenuItem({ icon: "sap-icon://clear-all", text: "Clear scores", press: function () { fiveCrowns.controller.onClearScores(); } });
      var menuItemReorder = new sap.m.MenuItem({ icon: "sap-icon://citizen-connect", text: "Reorder players", press: function () { fiveCrowns.controller.onReorderPlayers(oApp); } });
      var menuItemDealer = new sap.m.MenuItem({ icon: "sap-icon://people-connected", text: "Change dealer", press: function () { fiveCrowns.controller.onDealerChange(oApp); } });
      var menuItemBack = new sap.m.MenuItem({ icon: "sap-icon://nav-back", text: "Back", press: function () { oApp.backToTop(); } });
      var menuItemRefresh = new sap.m.MenuItem({ icon: "sap-icon://refresh", text: "Refresh", press: function () { fiveCrowns.controller.onGameRefresh(); } });

      // debugger; // Remove refresh option later after testing  
      var menuGameL = new sap.m.Menu({ items: [menuItemReorder, menuItemDealer, menuItemClear, menuItemBack, menuItemRefresh] });
      var menuButtonGameL = new sap.m.MenuButton({ icon: "sap-icon://menu2", menu: menuGameL });
      var barGameLHeader = new sap.m.Toolbar({ id: "idBarGameLHeader" });
      barGameLHeader.addContent(menuButtonGameL);
      // page.setCustomHeader(barGameLHeader);

      // Table layout
      tabPlayers = new sap.m.Table({ id: "idGameLTable", sticky: ["ColumnHeaders", "HeaderToolbar", "InfoToolbar"] });
      var oModel = new sap.ui.model.json.JSONModel(fiveCrowns.model.getModel());
      tabPlayers.setModel(oModel);
      // Add columns
      // tabPlayers.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "" }) }));
      tabPlayers.addColumn(new sap.m.Column({ header: menuButtonGameL }));
      tabPlayers.getColumns()[0].setWidth("15%");
      rounds = fiveCrowns.model.getModel().rounds;
      for (let roundNum = 0; roundNum < fiveCrowns.model.getMaxRounds(); roundNum++) {
        if (roundNum < 8) {
          roundName = 'R' + rounds[roundNum].round;
        } else {
          roundName = rounds[roundNum].round;
        }
        roundHeaderId = 'roundName-' + roundNum;
        tabPlayers.addColumn(new sap.m.Column(
          {
            header: new sap.m.Text({
              id: roundHeaderId,
              text: roundName
            })
          }
        ));
      }
      tabPlayers.addColumn(new sap.m.Column({ header: new sap.m.Text({ id: "idLTotal", text: "Total" }) }));

      // Add cells
      colListItem = new sap.m.ColumnListItem({});
      colListItem.addCell(new sap.m.Input({ id: "playerId", value: "{playerName}", change: function () { fiveCrowns.controller.onPlayerChange(this) } }));
      // colListItem.addCell(new sap.m.Input({ value: "{s0}", type: "Number", styleClass: "sapUiSizeCompact", change: function(){fiveCrowns.controller.onScoreChange()} }));   
      colListItem.addCell(new sap.m.Input({ id: "r-0", value: "{r0}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-1", value: "{r1}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-2", value: "{r2}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-3", value: "{r3}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-4", value: "{r4}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-5", value: "{r5}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-6", value: "{r6}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-7", value: "{r7}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-8", value: "{r8}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-9", value: "{r9}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-10", value: "{r10}", type: "Number", change: function () { fiveCrowns.controller.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Text({ id: "t-0", text: "{t0}" }));


      tabPlayers.bindAggregation("items", "/players", colListItem);
      page.addContent(tabPlayers);


      // Add page to app
      oApp.addPage(page);

      // var oModel = new sap.ui.model.json.JSONModel(_oData);
      // this._oTable.setModel(oModel);

      // this._oTable.addEventDelegate({
      tabPlayers.addEventDelegate({
        onAfterRendering: function () {
          debugger;
          // var tabindex1 = 1;
          // oGame = fiveCrowns.model.getModel();
          // players = oGame.playerCount;
          // for (let playerNum = 0; playerNum < players; playerNum++) {
          //   for (let roundNum = 0; roundNum < oGame.rounds.length; roundNum++) {
          //     column = roundNum + 1;
          //     // elementId = "r-" + roundNum + "-idGameLTable-" + playerNum + "-content";
          //     elementId = "__item15-idGameLTable-" + playerNum + "-cell" + column;
          //     document.getElementById(elementId).tabindex = tabindex1;
          //     tabindex1 = tabindex1 + 1;
          //   };
          // };
          var tabindex = 1;
          $("idGameLTable-listUl").each(function (i, tbl) {
            debugger;
            $(tbl).find('tr').each(function () {
              debugger;
              $(this).find('td').each(function (i) {
                debugger;
                $(this).find('input').attr('tabindex', i + 1);
              });
            });
          });
        }
      }, tabPlayers);





    },



  };

}());

