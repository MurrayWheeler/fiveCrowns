"use-strict";


fiveCrowns.pageMainView = (function () {

  return {

    /**
     * Method for page layout.
     */
    layout: function (oApp) {

      // Create page
      var page = new sap.m.Page("pageMain", { title: "Five Crowns" });


      // Add menu button. Replaced by a popover in the footer
      // var menuItemNew = new sap.m.MenuItem({ icon: "sap-icon://media-play", text: "New game", press: function () { fiveCrowns.pageMainController.onNewGame(oApp); } });
      // var menuItemResume = new sap.m.MenuItem({ icon: "sap-icon://restart", text: "Resume game", press: function () { fiveCrowns.pageMainController.onResumeGame(oApp); } });
      // var menuItemList = new sap.m.MenuItem({ icon: "sap-icon://list", text: "List games", press: function () { fiveCrowns.pageMainController.onListGames(oApp); } });
      // var menuItemSettings = new sap.m.MenuItem({ icon: "sap-icon://action-settings", text: "Settings", press: function () { fiveCrowns.pageMainController.onSettings(oApp); } });
      // var menuItemBack = new sap.m.MenuItem({ icon: "sap-icon://nav-back", text: "Back", press: function () { oApp.back(); } });
      // var menuMain = new sap.m.Menu({ items: [menuItemNew, menuItemResume, menuItemList, menuItemSettings] });
      // var menuButtonMain = new sap.m.MenuButton({ icon: "sap-icon://menu2", menu: menuMain });

      // Add Header bar
      var barMainHeader = new sap.m.Toolbar({ id: "idBarMainHeader" });
      barMainHeader.addContent(new sap.m.Image({ src: "resources/crown.png", width: "80px", height: "45px" }));
      barMainHeader.addContent(new sap.m.Text({ text: "Five Crowns" }));
      barMainHeader.addContent(new sap.m.ToolbarSpacer());
      // barMainHeader.addContent(menuButtonMain);
      page.setCustomHeader(barMainHeader);



      // Add content
      page.addContent(new sap.m.Text({ text: "" }));  // Blank line

      vBox = new sap.m.VBox({ alignItems: "Center", justifyContent: "SpaceAround" });
      page.addContent(vBox);

      vBox.addItem(new sap.m.Text({ text: "" }));
      vBox.addItem(new sap.m.Text({ text: "" }));
      hBox = new sap.m.HBox({ alignItems: "Center", justifyContent: "SpaceAround" });
      vBox.addItem(hBox);

      playersLabel = new sap.m.Label({ text: "Players" });
      hBox.addItem(playersLabel);
      hBox.addItem(new sap.m.ToolbarSpacer({ width: "10px" }));
      playerCount = new sap.m.Input({ id: "playerCount", placeholder: "Number of players", type: "Number", width: "80px" });
      let iPlayerCount = fiveCrowns.model.getPlayerCount();
      if (iPlayerCount) {
        playerCount.setValue(iPlayerCount);    // If we have a previously set player count, then use it
      } else {
        playerCount.setValue(fiveCrowns.settings.oSettings.defaultPlayerCount);   // Else use the default player count. This should only happen once, on the first ever game.
      }
      hBox.addItem(playerCount);
      hBox.addItem(new sap.m.ToolbarSpacer({ width: "30px" }));
      playButton = new sap.m.Button({ text: "Play" });
      playButton.attachPress(function () { fiveCrowns.pageMainController.onPlayButton(oApp) });
      hBox.addItem(playButton);

      vBox.addItem(new sap.m.Text({ text: "" }));
      vBox.addItem(new sap.m.Text({ text: "" }));
      vBox.addItem(new sap.m.Text({ text: "" }));
      resumeButton = new sap.m.Button({ text: "Resume Game", press: function () { fiveCrowns.pageMainController.onResumeGame(oApp) } });
      vBox.addItem(resumeButton);

      vBox.addItem(new sap.m.Text({ text: "" }));
      listButton = new sap.m.Button({ text: "List Games", press: function () { fiveCrowns.pageMainController.onListGames(oApp) } });
      vBox.addItem(listButton);


      // Use popover, so it does not go to small screen on a mobile
      // var menuButtonNew = new sap.m.Button({ type: "Transparent", icon: "sap-icon://media-play", text: "New game", press: function () { fiveCrowns.pageMainController.onNewGame(oApp); } });
      // var menuButtonResume = new sap.m.Button({ type: "Transparent", icon: "sap-icon://restart", text: "Resume game", press: function () { fiveCrowns.pageMainController.onResumeGame(oApp); } });
      var menuButtonList = new sap.m.Button({ type: "Transparent", icon: "sap-icon://list", text: "List games", press: function () { fiveCrowns.pageMainController.onListGames(oApp); } });
      var menuButtonSettings = new sap.m.Button({ type: "Transparent", icon: "sap-icon://action-settings", text: "Settings", press: function () { fiveCrowns.pageMainController.onSettings(oApp); } });
      var menuButtonHelp = new sap.m.Button({ type: "Transparent", icon: "sap-icon://sys-help", text: "Help", press: function () { fiveCrowns.pageMainController.onHelp(oApp); } });
      var menuButtonInstr = new sap.m.Button({ type: "Transparent", icon: "sap-icon://learning-assistant", text: "Instructions", press: function () { fiveCrowns.pageMainController.onInstr(oApp); } });
      var menuButtonAbout = new sap.m.Button({ type: "Transparent", icon: "sap-icon://hint", text: "About", press: function () { fiveCrowns.pageMainController.onAbout(oApp); } });
      var vboxMenu = new sap.m.VBox({ items: [menuButtonSettings, menuButtonHelp, menuButtonInstr, menuButtonAbout] });
      var popoverMain = new sap.m.Popover({ id:"popoverMain", title: "Options", placement: sap.m.PlacementType.Top, content: [vboxMenu] });
      var menuButtonMain = new sap.m.Button({ icon: "sap-icon://menu2", press: function (oEvent) { popoverMain.openBy(menuButtonMain); } });

      // Add Footer bar
      var barMainFooter = new sap.m.Toolbar({ id: "idBarMainFooter" });
      barMainFooter.addContent(menuButtonMain);
      page.setFooter(barMainFooter);




      // Add page to app
      oApp.addPage(page);

      // Load custom CSS
      jQuery.sap.includeStyleSheet("css/style.css");
      page.addStyleClass("myCustomBackground");
      playersLabel.addStyleClass("myLabelFontColor");
      playersLabel.addStyleClass("myLabelFontSize");
      playerCount.addStyleClass("myInputFontSize");
      playButton.addStyleClass("myButtonFontSize");
      resumeButton.addStyleClass("myButtonFontSize");
      listButton.addStyleClass("myButtonFontSize");

      // menuMain.addStyleClass("myCustomBackground");
      popoverMain.addStyleClass("myMenuStyle");

    },


  };

}());

