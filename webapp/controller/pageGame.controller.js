"use-strict";


fiveCrowns.pageGameController = (function () {

    function hideUnusedPlayers(players) {
        for (let playerNum = 0; playerNum < fiveCrowns.model.getMaxPlayers(); playerNum++) {
            columnNum = playerNum + 1;  // Offset for "Round" column
            if (playerNum < players) {
                tabRounds.getColumns()[columnNum].setVisible(true);
                barTotal.getContent()[columnNum].setVisible(true);
                tabPlayers.getItems()[playerNum].setVisible(true);
            } else {
                tabRounds.getColumns()[columnNum].setVisible(false);
                barTotal.getContent()[columnNum].setVisible(false);
                tabPlayers.getItems()[playerNum].setVisible(false);
            }
        }
    };

    function refreshPlayerNames(playerCount) {
        var oGame = fiveCrowns.model.getModel();
        for (let playerNum = 0; playerNum < playerCount; playerNum++) {
            column = playerNum + 1;
            tabRounds.getColumns()[column].getHeader().setValue(oGame.players[playerNum].playerName);
        }
    };

    function refreshScreenTotals(playerCount) {
        var oGame = fiveCrowns.model.getModel();
        for (let playerNum = 0; playerNum < playerCount; playerNum++) {
            elementId = "total" + playerNum + "-inner";
            if (document.getElementById(elementId)) {
                document.getElementById(elementId).value = oGame.totals[playerNum];
            }
        }
    };

    function setReorderTable() {
        var oReorder = fiveCrowns.model.getReorderModel();
        var players = fiveCrowns.model.getModel().players;
        oReorder.players.splice(0, oReorder.players.length);
        for (let playerNum = 0; playerNum < fiveCrowns.model.getPlayerCount(); playerNum++) {
            oReorder.players.push({ playerPosition: playerNum + 1, playerName: players[playerNum].playerName });
        }
        tabReorder.getModel().refresh();
    };

    function setChangeDealerTable() {
        var oGame = fiveCrowns.model.getModel();
        var oChangeDealer = fiveCrowns.model.getChangeDealerModel();
        var players = oGame.players;
        oChangeDealer.players.splice(0, oChangeDealer.players.length);   // Clear pre-existing entries
        for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
            oChangeDealer.players.push({ selected: false, playerName: players[playerNum].playerName });
        }
        // Set current dealer
        currentDealer = oGame.currentDealer;
        oChangeDealer.players[currentDealer].selected = true;
        tabChangeDealer.getModel().refresh();
    };

    function handleDealer() {
        var oGame = fiveCrowns.model.getModel();
        var currentRound = calcCurrentRound(oGame);
        oGame.setCurrentRound(currentRound);
        var currentDealer = getCurrentDealer(currentRound, oGame);
        oGame.setCurrentDealer(currentDealer);
        highlightDealer(oGame);
    };

    function calcCurrentRound(oGame) {
        // Current round is the latest round with no score against a player
        var currentRound = null;
        var maxRounds = fiveCrowns.model.getMaxRounds() - 1;     // Sub one for array index
        // for (let roundNum = 0; roundNum < fiveCrowns.model.getMaxRounds(); roundNum++) {
        for (let roundNum = maxRounds; roundNum >= 0; roundNum--) {
            for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
                if (oGame.scores[roundNum].roundScores[playerNum] !== '') {
                    currentRound = roundNum;
                    break;
                }
            };
            if (currentRound != null) break;
        }
        if (currentRound == null) currentRound = 0; // Default to round zero
        // Check if round is complete
        var roundComplete = true;
        for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
            if (oGame.scores[currentRound].roundScores[playerNum] == '') {
                roundComplete = false;
                break;
            }
        }
        if (roundComplete) {
            currentRound = currentRound + 1;
        }
        return currentRound;
    };

    function getCurrentDealer(currentRound, oGame) {
        // Calculate current dealer using initial dealer, rounds, and player count
        dealer = oGame.initialDealer + currentRound;
        dealer = dealer % oGame.playerCount;   // MOD function
        return dealer;
    };

    function highlightDealer(oGame) {
        // Unhighlight all players
        for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
            column = playerNum + 1;     // Offset to step over "Round" column
            tabRounds.getColumns()[column].getHeader().setValueState("None");
            tabPlayers.getItems()[playerNum].getCells()[0].setValueState("None");
        }
        // Highlight current dealer
        column = oGame.currentDealer + 1;     // Offset to step over "Round" column
        tabRounds.getColumns()[column].getHeader().setValueState("Error");
        tabRounds.getColumns()[column].getHeader().setValueStateText("Dealer");
        tabPlayers.getItems()[oGame.currentDealer].getCells()[0].setValueState("Error");
        tabPlayers.getItems()[oGame.currentDealer].getCells()[0].setValueStateText("Dealer");  // Set for Landscape mode
    };

    function highlightRound(oGame) {
        // Unhighlight all rounds
        for (let roundNum = 0; roundNum < fiveCrowns.model.getMaxRounds(); roundNum++) {
            for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
                column = playerNum + 1;         // Offset to step over "Round" column
                columnLand = roundNum + 1;      // Offset to step over "Player" column (Landscape)
                tabRounds.getItems()[roundNum].getCells()[column].setValueState("None");
                tabPlayers.getItems()[playerNum].getCells()[columnLand].setValueState("None");
            }
        }
        row = oGame.getCurrentRound();
        switch (fiveCrowns.settings.oSettings.highlightCurrentRound) {
            case '0': break;   // Do not highlight round
            case '1':
                column = oGame.currentDealer + 1;       // Offset to step over "Round" column
                columnLand = oGame.currentRound + 1;    // Offset to step over "Player" column (Landscape)
                tabRounds.getItems()[row].getCells()[column].setValueState("Information");
                tabRounds.getItems()[row].getCells()[column].setValueStateText("Dealer");
                tabPlayers.getItems()[oGame.currentDealer].getCells()[columnLand].setValueState("Information");
                tabPlayers.getItems()[oGame.currentDealer].getCells()[columnLand].setValueStateText("Dealer"); // Set for Landscape mode
                break;
            case '2':
                for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
                    column = playerNum + 1;                 // Offset to step over "Round" column
                    columnLand = oGame.currentRound + 1;    // Offset to step over "Player" column (Landscape)
                    tabRounds.getItems()[row].getCells()[column].setValueState("Warning");
                    tabPlayers.getItems()[playerNum].getCells()[columnLand].setValueState("Warning");
                }
                break;
            default: break;
        }
    };



    return {

        hideUnusedPlayers: hideUnusedPlayers,
        refreshScreenTotals: refreshScreenTotals,
        refreshPlayerNames: refreshPlayerNames,
        highlightDealer: highlightDealer,
        highlightRound: highlightRound,
        setReorderTable: setReorderTable,

        onPlayerChange: function (element) {
            var playerName = element.getValue();
            var elementId = element.getId();
            if ((sap.ui.Device.system.desktop && fiveCrowns.settings.oSettings.orientation == 'P') ||
                (!sap.ui.Device.system.desktop && sap.ui.Device.orientation.portrait)) {
                var playerNum = elementId.split('-')[1];
            } else {
                var playerNum = elementId.split('-')[2];
            }
            fiveCrowns.model.updatePlayerName(playerNum, playerName);
            tabPlayers.getModel().refresh();
            refreshPlayerNames(players);
        },

        onScoreChange: function (element) {
            var score = element.getValue();
            var elementId = element.getId();
            if ((sap.ui.Device.system.desktop && fiveCrowns.settings.oSettings.orientation == 'P') ||
                (!sap.ui.Device.system.desktop && sap.ui.Device.orientation.portrait)) {
                var round = Number(elementId.split('-')[3]);
                var player = Number(elementId.split('-')[1]);
            } else {
                var round = Number(elementId.split('-')[1]);
                var player = Number(elementId.split('-')[3]);
            }
            oGame = fiveCrowns.model.getModel();
            oGame.setScore(round, player, score);
            fiveCrowns.model.updateTotals();
            refreshScreenTotals(oGame.playerCount);
            handleDealer();
            highlightRound(oGame);
        },

        // Refresh for testing. Left here for a short while in case it is wanted again.
        // onGameRefresh: function () {
        //     // What causes screen to update?
        //     // When changing from portrait to landscape, scores do not update
        //     // tabReorder.getModel().refresh();
        //     tabRounds.getModel().refresh();
        //     tabPlayers.getModel().refresh();
        // },

        onReorderPlayers: function (oApp) {
            setReorderTable();
            oApp.to("pageReorder");
        },

        onDealerChange: function (oApp) {
            setChangeDealerTable();
            oApp.to("pageChangeDealer");
        },

        onClearScores: function () {
            fiveCrowns.model.clearScores();
            tabRounds.getModel().refresh();
            refreshScreenTotals(fiveCrowns.model.getPlayerCount());
            tabRounds.scrollToIndex(0);
        },


    };

}());
