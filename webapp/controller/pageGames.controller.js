"use-strict";


fiveCrowns.pageGamesController = (function () {


    return {

        onGamesBack: function (oApp) {
            oApp.back();
        },

        onGamesView: function (oApp) {
            // This code is not used. Left here for reference
            return;
            // Get selected games on the page
            aGames = oApp.getPage("pageGames").getContent()[0].getSelectedItems();
            // Leave if no games selected
            if (aGames.length == 0) {
                sap.m.MessageToast.show("No rows selected");
                // MessageToast.show("No rows selected");
                return;
            };
            // Get the first selected game
            oGame = aGames[0].getBindingContext().getObject();
            // Deselect the game, so it is no longer selected when we return
            aGames[0].setSelected(false);
            // Load the game data and use resume to go into the game
            fiveCrowns.model.setModelValues(oGame);
            fiveCrowns.pageMainController.onResumeGame(oApp);
        },



        onGamesDelete: function (oApp) {
            // This code is not used. Left here for reference
            return;
            // Get selected games on the page
            oGames = oApp.getPage("pageGames").getContent()[0];
            aGames = oGames.getSelectedItems();
            // aGames = oApp.getPage("pageGames").getContent()[0].getSelectedItems();
            // Leave if no games selected
            if (aGames.length == 0) {
                sap.m.MessageToast.show("No rows selected");
                // MessageToast.show("No rows selected");
                return;
            };

            // Get list of gameId's
            aGameIds = [];
            for (let gameNum = 0; gameNum < aGames.length; gameNum++) {
                gameId = aGames[gameNum].getBindingContext().getObject("gameId");
                aGameIds.push(gameId);
            }

            // Create confirmation dialog
            var oDialog = new sap.m.Dialog({
                title: "Confirm Deletion",
                type: "Message",
                content: new sap.m.Text({ text: "Are you sure you want to delete selected games?" }),
                beginButton: new sap.m.Button({
                    text: "Yes",
                    press: function () {
                        // Perform deletion logic
                        // Loop through selected items and deleted them
                        for (let gameNum = 0; gameNum < aGameIds.length; gameNum++) {
                            gameId = aGameIds[gameNum];
                            fiveCrowns.games.deleteGameById(gameId);
                        }
                        // Save after delete
                        fiveCrowns.games.saveGames();
                        // Deselect rows
                        oGames.removeSelections();
                        // Refresh screen to reflect deleted items
                        tabGames.getModel().refresh();
                        sap.m.MessageToast.show("Games deleted");
                        oDialog.close();
                    }
                }),
                endButton: new sap.m.Button({
                    text: "No",
                    press: function () {
                        sap.m.MessageToast.show("Games not deleted");
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy(); // Clean up dialog after it's closed
                }
            });

            // Open the dialog
            oDialog.open();
        },


        onGameDelete: function (oEvent) {
            // oGame = oEvent.getSource().getBindingContext().getObject();
            gameId = oEvent.getSource().getBindingContext().getObject("gameId");
            gameName = oEvent.getSource().getBindingContext().getObject("gameName");

            // Create confirmation dialog
            var oDialog = new sap.m.Dialog({
                title: "Confirm Deletion",
                type: "Message",
                content: new sap.m.Text({ text: "Are you sure you want to delete the game:\n" + gameName + "?" }),
                beginButton: new sap.m.Button({
                    text: "Yes",
                    press: function () {
                        fiveCrowns.games.deleteGameById(gameId);
                        fiveCrowns.games.saveGames();
                        tabGames.getModel().refresh();
                        sap.m.MessageToast.show("Game deleted");
                        oDialog.close();
                    }
                }),
                endButton: new sap.m.Button({
                    text: "No",
                    press: function () {
                        sap.m.MessageToast.show("Game not deleted");
                        oDialog.close();
                    }
                }),
                afterClose: function () {
                    oDialog.destroy(); // Clean up dialog after it's closed
                }
            });

            // Open the dialog
            oDialog.open();
        },


        onNamePress: function (oGameName) {
            // Get the selected row's binding context
            var oContext = oGameName.getBindingContext();
            // Get data from the binding context
            var oGame = oContext.getObject();
            // Set the game to be display only
            fiveCrowns.pageGameController.setGameEditable(false);
            // Load the game data and use resume to go back into the game
            fiveCrowns.model.setModelValues(oGame);
            fiveCrowns.pageMainController.gotoGame(oApp);
        },


        onRowPress: function (oEvent) {
            // No longer used. Code left for refernce, or reinstate if wanted
            return;
            // Get the selected row's binding context
            var oItem = oEvent.getParameter("listItem");
            var oContext = oItem.getBindingContext();
            // Get data from the binding context
            var oRowData = oContext.getObject();
            // console.log("Row data:", oRowData);
            // Load the game data and use resume to go back into the game
            fiveCrowns.model.setModelValues(oRowData);
            fiveCrowns.pageMainController.onResumeGame(oApp);
        },


    };

}());
