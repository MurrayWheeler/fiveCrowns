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
        tabGames.getModel().refresh();
        oApp.to("pageGames");
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
            oApp.to("pageSettings");
        },


    };

}());
