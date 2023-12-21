"use-strict";


fiveCrowns.pageGameView = (function () {

  return {


    /**
     * Method for page layout.
     */
    layout: function (oApp) {

      // Create page
      var page = new sap.m.Page("pageGame", { title: "Game page" });

      // Add content
      page.setShowNavButton(true);
      page.attachNavButtonPress( function () { oApp.back(); } );

      // Add page to app
      oApp.addPage(page);

    },



  };

}());

