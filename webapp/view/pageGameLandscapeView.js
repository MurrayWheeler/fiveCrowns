"use-strict";


fiveCrowns.pageGameLandscapeView = (function () {

  return {

    layout: function (oApp) {

      // var page = new sap.m.Page("pageGameLandscape", { title: "Game page" });
      var page = new sap.m.Page("pageGameLandscape", { showHeader: false });

      // // Add Menu button
      // var menuItemClear = new sap.m.MenuItem({ icon: "sap-icon://clear-all", text: "Clear scores", press: function () { fiveCrowns.pageGameController.onClearScores(); } });
      // var menuItemReorder = new sap.m.MenuItem({ icon: "sap-icon://citizen-connect", text: "Reorder players", press: function () { fiveCrowns.pageGameController.onReorderPlayers(oApp); } });
      // var menuItemDealer = new sap.m.MenuItem({ icon: "sap-icon://people-connected", text: "Change dealer", press: function () { fiveCrowns.pageGameController.onDealerChange(oApp); } });
      // var menuItemBack = new sap.m.MenuItem({ icon: "sap-icon://nav-back", text: "Back", press: function () { fiveCrowns.pageGameController.onBack(oApp); } });
      // // var menuItemRefresh = new sap.m.MenuItem({ icon: "sap-icon://refresh", text: "Refresh", press: function () { fiveCrowns.pageGameController.onGameRefresh(); } });

      // Use popover, so it does not go to small screen on a mobile
      var menuButtonReorder = new sap.m.Button({ type: "Transparent", icon: "sap-icon://citizen-connect", text: "Reorder players", press: function () { fiveCrowns.pageGameController.onReorderPlayers(oApp); } });
      var menuButtonDealer = new sap.m.Button({ type: "Transparent", icon: "sap-icon://people-connected", text: "Change dealer", press: function () { fiveCrowns.pageGameController.onDealerChange(oApp); } });
      var menuButtonNew = new sap.m.Button({ type: "Transparent", icon: "sap-icon://media-play", text: "New Game", press: function () { fiveCrowns.pageGameController.onNewGame(); } });
      var menuButtonClear = new sap.m.Button({ type: "Transparent", icon: "sap-icon://clear-all", text: "Clear scores", press: function () { fiveCrowns.pageGameController.onClearScores(); } });
      var menuButtonBack = new sap.m.Button({ type: "Transparent", icon: "sap-icon://nav-back", text: "Back", press: function () { fiveCrowns.pageGameController.onBack(oApp); } });
      var vboxMenu = new sap.m.VBox({ items: [menuButtonReorder, menuButtonDealer, menuButtonNew, menuButtonClear, menuButtonBack] });
      var popoverMenu = new sap.m.Popover({ title: "Options", placement: sap.m.PlacementType.Bottom, content: [vboxMenu] });
      var menuButton = new sap.m.Button({ icon: "sap-icon://menu2", press: function (oEvent) { popoverMenu.openBy(menuButton); } });




      // var menuGameL = new sap.m.Menu({ items: [menuItemReorder, menuItemDealer, menuItemClear] });
      // var menuButton = new sap.m.MenuButton({ icon: "sap-icon://menu2", menu: menuGameL });




      // Add Header bar
      var barGameLHeader = new sap.m.Toolbar({ id: "idBarGameLHeader" });
      barGameLHeader.addContent(new sap.m.Image({ src: "resources/crown.png", width: "80px", height: "45px" }));
      barGameLHeader.addContent(new sap.m.Text({ text: "Five Crowns" }));
      barGameLHeader.addContent(new sap.m.ToolbarSpacer());
      barGameLHeader.addContent(menuButton);
      barGameLHeader.addContent(new sap.m.Button({ icon: "sap-icon://nav-back", press: function () { fiveCrowns.pageGameController.onBack(oApp); } }));
      // page.setCustomHeader(barGameLHeader);

      // Table layout
      tabPlayers = new sap.m.Table({ id: "idGameLTable", sticky: ["ColumnHeaders", "HeaderToolbar", "InfoToolbar"] });
      var oModel = new sap.ui.model.json.JSONModel(fiveCrowns.model.getModel());
      tabPlayers.setModel(oModel);
      // Add columns
      // tabPlayers.addColumn(new sap.m.Column({ header: new sap.m.Text({ text: "" }) }));
      tabPlayers.addColumn(new sap.m.Column({ header: menuButton }));
      tabPlayers.getColumns()[0].setWidth("15%");
      rounds = fiveCrowns.model.getModel().rounds;
      for (let roundNum = 0; roundNum < fiveCrowns.model.getMaxRounds(); roundNum++) {
        if (roundNum < 8) {
          roundName = 'R' + rounds[roundNum].round;
        } else {
          roundName = rounds[roundNum].round;
        }
        roundHeaderId = 'roundName-' + roundNum;
        tabPlayers.addColumn(new sap.m.Column({ header: new sap.m.Text({ id: roundHeaderId, text: roundName, wrapping: false }) }));
      }
      tabPlayers.addColumn(new sap.m.Column({ header: new sap.m.Text({ id: "idLTotal", text: "Total" }) }));

      // Add cells
      colListItem = new sap.m.ColumnListItem({});
      colListItem.addCell(new sap.m.Input({ id: "playerId", value: "{playerName}", change: function () { fiveCrowns.pageGameController.onPlayerChange(this) } }));
      // colListItem.addCell(new sap.m.Input({ value: "{s0}", type: "Number", styleClass: "sapUiSizeCompact", change: function(){fiveCrowns.pageGameController.onScoreChange()} }));   
      colListItem.addCell(new sap.m.Input({ id: "r-0", value: "{r0}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-1", value: "{r1}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-2", value: "{r2}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-3", value: "{r3}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-4", value: "{r4}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-5", value: "{r5}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-6", value: "{r6}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-7", value: "{r7}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-8", value: "{r8}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-9", value: "{r9}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Input({ id: "r-10", value: "{r10}", type: "Number", change: function () { fiveCrowns.pageGameController.onScoreChange(this) } }));
      colListItem.addCell(new sap.m.Text({ id: "t-0", text: "{t0}" }));


      tabPlayers.bindAggregation("items", "/players", colListItem);
      page.addContent(tabPlayers);


      // Add page to app
      oApp.addPage(page);


      // Detect long press in table
      tabPlayers.addEventDelegate({
        onAfterRendering: function () {
          tabPlayers.$().on("touchstart", "tr", function (oEvent) {
            var pressTimer;
            var $target = $(this); // jQuery object for the row
            var eventTarget = oEvent.target;

            // Start a timer for the long press
            pressTimer = setTimeout(function () {
              var oRow = sap.ui.getCore().byId($target.attr("id"));
              if (oRow && oRow.getBindingContext()) {
                var oData = oRow.getBindingContext().getObject();
                var cell = eventTarget.closest("td, th"); // Find the nearest cell
                var columnIndex = Array.from(cell.parentElement.children).indexOf(cell)
                if (columnIndex == 1) {   // Only long press on column 1, Player Name
                  var playerNum = oData.playerPosition - 1;
                  fiveCrowns.pageChangeDealerController.setDealer(playerNum);
                }
              }
            }, 1500); // milliseconds for long press
            // Cancel the timer on touchend or touchmove
            $target.on("touchend touchmove", function () {
              clearTimeout(pressTimer);
              $target.off("touchend touchmove"); // Prevent multiple bindings
            });
          });
        }
      });









      // Not tested. I got this from chatGPT. Looks like it is trying to set the tab index. This isn't working. Left for reference
      // debugger;

      // tabPlayers.addEventDelegate({
      //   onAfterRendering: function () {
      //     var oDomRef = tabPlayers.getDomRef();
      //     // debugger;
      //     if (oDomRef) {
      //       // debugger;
      //       oDomRef.setAttribute("tabindex", "0"); // or any specific index you need
      //     }
      //   }
      // });

      // var oItemsBinding = tabPlayers.getBinding("items");  // Get the binding for rows
      // // For each row in the table, set the tabindex of each cell
      // oItemsBinding.attachDataReceived(function (oEvent) {
      //   var aItems = oEvent.getSource().getContexts();  // Get the rows' contexts
      //   debugger;
      //   aItems.forEach(function (oContext, index) {
      //     var oRow = oTable.getItems()[index];  // Get the row by index

      //     // Loop through each cell and set its tabindex
      //     oRow.getCells().forEach(function (oCell, cellIndex) {
      //       oCell.$().attr("tabindex", cellIndex + index * oRow.getCells().length); // Set tabindex
      //     });
      //   });
      // });



      // debugger;
      // Nearly working.
      //   - Only gets done once
      //   - Can only set if the cell is on the screen. This is dependent on playerCount
      //   = If the number of players increases, the new players are not tabbed
      //   - Works if the player count decreases
      //   - Didn't work starting from first row/column. Maybe tabIndex can't be 0?
      //   - Should include names colum as well
      //   - Can I set it everytime when going to the screen. This could be an issue for orientation change.

      tabPlayers.addEventDelegate({
        onAfterRendering: function () {
          // let maxPlayers = fiveCrowns.model.getMaxPlayers();
          let maxPlayers = playerCount.getValue();
          tabPlayers.getItems().forEach(function (oItem, rowIndex) {
            oItem.getCells().forEach(function (oCell, cellIndex) {
              if (oCell.isA("sap.m.Input")) { // Check if the cell contains an input field
                // oCell.setTabIndex(cellIndex + rowIndex * oTable.getItems().length); // Set custom tabindex
                // debugger;
                let iTabIndex = rowIndex + (cellIndex * maxPlayers);
                var tabIndex = "" + iTabIndex;
                // oCell.setTabIndex(tabIndex); // Set custom tabindex

                var elementId = "r-" + cellIndex + "-idGameLTable-" + rowIndex + "-inner";
                // r-0-idGameLTable-0-inner
                if (rowIndex < maxPlayers) {
                  if (cellIndex < 11) {
                    elementRef = document.getElementById(elementId);
                    elementRef.tabIndex = tabIndex;
                  }
                }
                // oCell.addCustomData(new sap.ui.core.CustomData({
                //   key: "tabIndex",
                //   value: tabIndex,
                //   writeToDom: true
                // }));


              }
            });
          });
        }
      });

      // // Not sure what the code below does. So I have commented out. (It looks like it trying to set tab stops)
      // // this._oTable.addEventDelegate({
      // tabPlayers.addEventDelegate({
      //   onAfterRendering: function () {
      //     debugger;
      //     // var tabindex1 = 1;
      //     // oGame = fiveCrowns.model.getModel();
      //     // players = oGame.playerCount;
      //     // for (let playerNum = 0; playerNum < players; playerNum++) {
      //     //   for (let roundNum = 0; roundNum < oGame.rounds.length; roundNum++) {
      //     //     column = roundNum + 1;
      //     //     // elementId = "r-" + roundNum + "-idGameLTable-" + playerNum + "-content";
      //     //     elementId = "__item15-idGameLTable-" + playerNum + "-cell" + column;
      //     //     document.getElementById(elementId).tabindex = tabindex1;
      //     //     tabindex1 = tabindex1 + 1;
      //     //   };
      //     // };
      //     var tabindex = 1;
      //     $("idGameLTable-listUl").each(function (i, tbl) {
      //     // $("tabPlayers-listUl").each(function (i, tbl) {
      //       debugger;
      //       $(tbl).find('tr').each(function () {
      //         debugger;
      //         $(this).find('td').each(function (i) {
      //           debugger;
      //           $(this).find('input').attr('tabindex', i + 1);
      //         });
      //       });
      //     });
      //   }
      // }, tabPlayers);



      // // Try intercepting tab key. Doesn't work. Probably because it's not a tab on a mobile.
      // // debugger;
      // tabPlayers.addEventDelegate({
      //   onAfterRendering: function () {
      //     // debugger;
      //     var oDomRef = tabPlayers.getDomRef();
      //     if (oDomRef) {
      //       oDomRef.setAttribute("tabindex", "0"); // Set tabindex for the table

      //       // Add a keyboard event listener for custom navigation
      //       oDomRef.addEventListener("keydown", function (event) {
      //         if (event.key === "Tab") {
      //           event.preventDefault(); // Prevent default tabbing
      //           handleCustomTabbing(event, tabPlayers);
      //         }
      //       });
      //     }
      //   }
      // });

      // // Function to handle tabbing through columns
      // function handleCustomTabbing(event, table) {
      //   // debugger;
      //   var focusedElement = document.activeElement;
      //   var rows = table.getDomRef().querySelectorAll(".sapMLIB"); // Rows in the table
      //   var columnIndex = -1;

      //   // Find the currently focused cell's column index
      //   rows.forEach(function (row, rowIndex) {
      //     // debugger;
      //     var cells = row.querySelectorAll(".sapMText, .sapMInput"); // Adapt this to your cell type
      //     cells.forEach(function (cell, cellIndex) {
      //       if (cell === focusedElement) {
      //         columnIndex = cellIndex; // Found the focused column
      //       }
      //     });
      //   });

      //   // Pretend we found a column
      //   columnIndex = 4;
      //   // debugger;
      //   if (columnIndex >= 0) {
      //     var nextFocusRow = event.shiftKey ? -1 : 1; // Shift+Tab goes up
      //     var currentRowIndex = Array.from(rows).findIndex(row =>
      //       Array.from(row.querySelectorAll(".sapMText, .sapMInput")).includes(focusedElement)
      //     );

      //     var nextRowIndex = currentRowIndex + nextFocusRow;
      //     if (nextRowIndex >= 0 && nextRowIndex < rows.length) {
      //       // Move to the same column in the next row
      //       var nextRowCells = rows[nextRowIndex].querySelectorAll(".sapMText, .sapMInput");
      //       if (nextRowCells[columnIndex]) {
      //         nextRowCells[columnIndex].focus();
      //       }
      //     }
      //   }
      // }






      // Load custom CSS
      jQuery.sap.includeStyleSheet("css/style.css");
      page.addStyleClass("myCustomBackground");
      tabPlayers.addStyleClass("myTableBackground");
      tabPlayers.addStyleClass("myTableFontColor");
      tabPlayers.addStyleClass("myTableFontSize");
      // barTotal.addStyleClass("myToolbarFontSize");
      tabPlayers.addStyleClass("myTruncateStyle");


    },



  };

}());

