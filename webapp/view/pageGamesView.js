"use-strict";


fiveCrowns.pageGamesView = (function () {

  return {


    /**
     * Method for page layout.
     */
    layout: function (oApp) {

      // Create page
      var page = new sap.m.Page("pageGames", { title: "Games page" });

      // Add content
      page.setShowNavButton(true);
      page.attachNavButtonPress( function () { oApp.back(); } );

      // Add page to app
      oApp.addPage(page);

    },



  };

}());

