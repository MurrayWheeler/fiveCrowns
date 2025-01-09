"use-strict";


fiveCrowns.pageChangeDealerController = (function () {



    return {

        // onChangeDealer: function (element) {
        //     // Not used. Dealer changed on "Back" function
        // },

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
                    fiveCrowns.pageGameController.highlightDealer(oGame);
                    fiveCrowns.pageGameController.highlightRound(oGame);
                    break;
                }
            }
            oApp.back();
        },


    };

}());
