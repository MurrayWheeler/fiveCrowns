"use-strict";


fiveCrowns.pageChangeDealerController = (function () {


    function setDealer(playerNum) {
        oGame = fiveCrowns.model.getModel();
        initialDealer = playerNum - (oGame.currentRound % oGame.playerCount);  // MOD function
        if (initialDealer < 0) {
            initialDealer = initialDealer + oGame.playerCount;
        }
        oGame.setInitialDealer(initialDealer);
        oGame.setCurrentDealer(playerNum);
        fiveCrowns.pageGameController.highlightDealer(oGame);
        fiveCrowns.pageGameController.highlightRound(oGame);
    };



    return {

        onChangeDealerBack: function (oApp) {
            // oGame = fiveCrowns.model.getModel();
            oChangeDealer = fiveCrowns.model.getChangeDealerModel();
            for (let playerNum = 0; playerNum < oGame.playerCount; playerNum++) {
                if (oChangeDealer.players[playerNum].selected) {
                    setDealer(playerNum);
                    break;
                }
            }
            oApp.back();
        },

        setDealer: setDealer,

    };

}());
