"use-strict";


fiveCrowns.pageReorderController = (function () {


    return {

        onReorderChange: function (element) {
            var playerPosition = element.getValue();
            var elementId = element.getId();
            var rowNum = elementId.split('-')[2];
            fiveCrowns.model.updatePlayerPosition(rowNum, playerPosition);
            fiveCrowns.pageGameController.setReorderTable();
            fiveCrowns.pageGameController.refreshPlayerNames(fiveCrowns.model.getPlayerCount());
            tabRounds.getModel().refresh();
            fiveCrowns.pageGameController.refreshScreenTotals(fiveCrowns.model.getPlayerCount());
        },

        onReorderBack: function (oApp) {
            oApp.back();
        },


    };

}());
