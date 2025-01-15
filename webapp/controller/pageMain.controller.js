"use-strict";


fiveCrowns.pageMainController = (function () {

    function gotoGame(oApp) {
        requestFullScreen();
        var players = fiveCrowns.model.getPlayerCount();
        document.getElementById("playerCount-inner").value = players;
        fiveCrowns.pageGameController.hideUnusedPlayers(players);
        tabRounds.getModel().refresh();
        tabPlayers.getModel().refresh();
        fiveCrowns.pageGameController.refreshScreenTotals(players);
        fiveCrowns.pageGameController.refreshPlayerNames(players);
        fiveCrowns.pageGameController.highlightDealer(fiveCrowns.model.getModel());
        fiveCrowns.pageGameController.highlightRound(fiveCrowns.model.getModel());
        if (sap.ui.Device.orientation.portrait) {
            oApp.to("pageGame", fiveCrowns.settings.oSettings.getPageTransition());
        } else {
            oApp.to("pageGameLandscape", fiveCrowns.settings.oSettings.getPageTransition());
        };
    };



    function gotoList(oApp) {
        requestFullScreen();
        tabGames.getModel().refresh();
        oApp.to("pageGames", fiveCrowns.settings.oSettings.getPageTransition());
    };




    return {

        gotoGame: gotoGame,

        onPlayButton: function (oApp) {
            fiveCrowns.model.clearScores();
            // fiveCrowns.model.clearPlayers();   // Use the previously used player names
            fiveCrowns.model.setPlayerCount(playerCount.getValue());   // Get player count from screen
            fiveCrowns.model.newGame();
            fiveCrowns.pageGameController.setGameEditable(true);
            gotoGame(oApp);
        },

        onResumeGame: function (oApp) {
            fiveCrowns.pageGameController.setGameEditable(true);
            gotoGame(oApp);
        },

        onListGames: function (oApp) {
            gotoList(oApp);
        },

        onSettings: function (oApp) {
            requestFullScreen();
            sap.ui.getCore().byId("popoverMain").close()
            oApp.to("pageSettings", fiveCrowns.settings.oSettings.getPageTransition());
        },

        onAbout: function (oApp) {
            requestFullScreen();
            sap.ui.getCore().byId("popoverMain").close()
            sap.m.MessageToast.show("Five Crowns v0.01 (Beta)");
            // Popover? or page?
            // oApp.to("pageAbout", fiveCrowns.settings.oSettings.getPageTransition());
        },

        onHelp: function (oApp) {
            requestFullScreen();
            sap.ui.getCore().byId("popoverMain").close()
            sap.m.MessageToast.show("Help is not yet available");
            // oApp.to("pageHelp", fiveCrowns.settings.oSettings.getPageTransition());
        },

        onInstr: function (oApp) {
            requestFullScreen();
            sap.ui.getCore().byId("popoverMain").close()
            oApp.to("pageInstr", fiveCrowns.settings.oSettings.getPageTransition());
        },


    };

}());
