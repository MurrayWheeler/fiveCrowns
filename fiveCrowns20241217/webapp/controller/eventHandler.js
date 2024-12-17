"use-strict";


fiveCrowns.eventHandler = (function () {

    function unUsed() {
        // Unhighlight all rounds
    };



    return {

        registerEvents: function () {
            sap.ui.Device.orientation.attachHandler(function (oEvent) {
                fiveCrowns.eventHandler.onOrientationChange(oEvent);
            })
        },

        onOrientationChange: function (oEvent) {
            var pageId = fiveCrowns.model.getApp().getCurrentPage().getId();
            if (pageId == "pageGame") {
                if (sap.ui.Device.orientation.landscape) {
                    oApp.to("pageGameLandscape");
                };
            };
            if (pageId == "pageGameLandscape") {
                if (sap.ui.Device.orientation.portrait) {
                    oApp.to("pageGame");
                };
            };
        },


    };

}());
