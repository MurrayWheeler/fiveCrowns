"use-strict";


fiveCrowns.controller = (function () {


    return {


        startButton: function () {
            // let nCount = drawCount.getValue()
            // fiveCrowns.model.runSimulation(nCount);
            // fiveCrowns.model.getModel().refresh();
        },

        clearButton: function () {
            // fiveCrowns.model.clearTickets();
            // fiveCrowns.model.getModel().refresh();
        },



        startGame: function (oApp) {
            oApp.to("pageGame");
        },


    };

}());






