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
        if ((sap.ui.Device.system.desktop && fiveCrowns.settings.oSettings.orientation == 'P') ||
            (!sap.ui.Device.system.desktop && sap.ui.Device.orientation.portrait)) {
            oApp.to("pageGame");
        } else {
            oApp.to("pageGameLandscape");
        };
    };



    function gotoList(oApp) {
        requestFullScreen();
        oApp.to("pageGames");
    };




    return {

        onPlayButton: function (oApp) {
            fiveCrowns.model.clearScores();
            fiveCrowns.model.setPlayerCount(playerCount.getValue());   // Get player count from screen
            fiveCrowns.model.newGame();
            gotoGame(oApp);
        },

        onNewGame: function (oApp) {
            fiveCrowns.model.clearScores();
            fiveCrowns.model.clearPlayers();
            fiveCrowns.model.setPlayerCount(playerCount.getValue());   // Get player count from screen
            fiveCrowns.model.newGame();
            gotoGame(oApp);
        },

        onResumeGame: function (oApp) {
            gotoGame(oApp);
        },

        onListGames: function (oApp) {
            gotoList(oApp);
        },

        onSettings: function (oApp) {
            requestFullScreen();
            oApp.to("pageSettings");
        },


    };

}());
