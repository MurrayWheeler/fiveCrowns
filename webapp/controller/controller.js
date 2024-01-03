"use-strict";


fiveCrowns.controller = (function () {

    function hideUnusedPlayers(players) {
        for (let playerNum = 1; playerNum <= fiveCrowns.model.getMaxPlayers(); playerNum++) {
            columnNum = playerNum + 0;
            if (playerNum <= players) {
                tabRounds.getColumns()[columnNum].setVisible(true);
                barTotal.getContent()[columnNum].setVisible(true);
            } else {
                tabRounds.getColumns()[columnNum].setVisible(false);
                barTotal.getContent()[columnNum].setVisible(false);
            }
        }
    };

    function refreshPlayerNames(playerCount) {
        var oGame = fiveCrowns.model.getModel();
        for (let playerNum = 0; playerNum < playerCount; playerNum++) {
            elementId = 'playerName-' + playerNum + "-inner";
            if (document.getElementById(elementId)) {
                document.getElementById(elementId).value = oGame.players[playerNum].playerName;
            }
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


    function gotoGame(oApp) {
        var players = fiveCrowns.model.getPlayerCount();
        // debugger; // not working????? I can't set player count to 8 after seleting high number
        document.getElementById("playerCount-inner").value = players;
        hideUnusedPlayers(players);
        tabRounds.getModel().refresh();
        refreshScreenTotals(players);
        refreshPlayerNames(players);
        highlightDealer(fiveCrowns.model.getModel());
        highlightRound(fiveCrowns.model.getModel());
        oApp.to("pageGame");
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
        }
        // Highlight current dealer
        column = oGame.currentDealer + 1;     // Offset to step over "Round" column
        tabRounds.getColumns()[column].getHeader().setValueState("Error");
    };

    function highlightRound(oGame) {
        // Unhighlight all rounds
        for (let roundNum = 0; roundNum < fiveCrowns.model.getMaxRounds(); roundNum++) {
            for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
                column = playerNum + 1;     // Offset to step over "Round" column
                tabRounds.getItems()[roundNum].getCells()[column].setValueState("None");
            }
        }
        row = oGame.getCurrentRound();
        switch (fiveCrowns.settings.oSettings.highlightCurrentRound) {
            case '0': break;   // Do not highlight round
            case '1':
                column = oGame.currentDealer + 1;     // Offset to step over "Round" column
                tabRounds.getItems()[row].getCells()[column].setValueState("Information");
                break;
            case '2':
                for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
                    column = playerNum + 1;     // Offset to step over "Round" column
                    tabRounds.getItems()[row].getCells()[column].setValueState("Warning");
                }
                break;
            default: break;
        }
    };



    return {

        onPlayButton: function (oApp) {
            fiveCrowns.model.clearScores();
            fiveCrowns.model.setPlayerCount(playerCount.getValue());   // Get player count from screen
            gotoGame(oApp);
        },

        onNewGame: function (oApp) {
            fiveCrowns.model.clearScores();
            fiveCrowns.model.clearPlayers();
            fiveCrowns.model.setPlayerCount(playerCount.getValue());   // Get player count from screen
            gotoGame(oApp);
        },

        onResumeGame: function (oApp) {
            gotoGame(oApp);
        },

        onPlayerChange: function (element) {
            var playerName = element.getValue();
            var elementId = element.getId();
            var playerNum = elementId.split('-')[1];
            fiveCrowns.model.updatePlayerName(playerNum, playerName);
        },

        onScoreChange: function (element) {
            var score = element.getValue();
            var elementId = element.getId();
            var round = Number(elementId.split('-')[3]);
            var player = Number(elementId.split('-')[1]);
            oGame = fiveCrowns.model.getModel();
            oGame.setScore(round, player, score);
            fiveCrowns.model.updateTotals();
            refreshScreenTotals(oGame.playerCount);
            handleDealer();
            highlightRound(oGame);
        },

        onGameRefresh: function () {
            tabReorder.getModel().refresh();
            refreshPlayerNames(fiveCrowns.model.getPlayerCount());
        },

        onReorderPlayers: function (oApp) {
            setReorderTable();
            oApp.to("pageReorder");
        },

        onReorderChange: function (element) {
            var playerPosition = element.getValue();
            var elementId = element.getId();
            var rowNum = elementId.split('-')[2];
            fiveCrowns.model.updatePlayerPosition(rowNum, playerPosition);
            setReorderTable();
            refreshPlayerNames(fiveCrowns.model.getPlayerCount());
            tabRounds.getModel().refresh();
            refreshScreenTotals(fiveCrowns.model.getPlayerCount());
        },

        onReorderBack: function (oApp) {
            oApp.back();
        },

        onDealerChange: function (oApp) {
            setChangeDealerTable();
            oApp.to("pageChangeDealer");
        },

        onChangeDealer: function (element) {
            debugger;            // Not used. Dealer changed on "Back" function
        },

        onChangeDealerBack: function (oApp) {
            oGame = fiveCrowns.model.getModel();
            oChangeDealer = fiveCrowns.model.getChangeDealerModel();
            for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
                if (oChangeDealer.players[playerNum].selected) {
                    initialDealer = playerNum - (oGame.currentRound % oGame.playerCount);  // MOD function
                    if (initialDealer < 0) {
                        initialDealer = initialDealer + oGame.playerCount;
                    }
                    oGame.setInitialDealer(initialDealer);
                    oGame.setCurrentDealer(playerNum);
                    highlightDealer(oGame);
                    highlightRound(oGame);
                    break;
                }
            }
            oApp.back();
        },

        onSettings: function (oApp) {
            oApp.to("pageSettings");
        },

        onSettingsBack: function (oApp) {
            // Save settings here for now. I may move this later. Eg. After each change, or after confirmation popup
            fiveCrowns.settings.saveSettings(fiveCrowns.settings.oSettings);
            oApp.back();
        },

        onClearScores: function () {
            fiveCrowns.model.clearScores();
            tabRounds.getModel().refresh();
            refreshScreenTotals(fiveCrowns.model.getPlayerCount());
            tabRounds.scrollToIndex(0);
        },


    };

}());
