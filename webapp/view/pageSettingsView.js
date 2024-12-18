"use-strict";


fiveCrowns.pageSettingsView = (function () {

  return {


    /**
     * Method for page layout.
     */
    layout: function (oApp) {

      // Create page
      var page = new sap.m.Page("pageSettings", { title: "Settings" });

      // Add content
      var btnSettingsBack = new sap.m.Button({ icon: "sap-icon://nav-back", press: function () { fiveCrowns.pageSettingsController.onSettingsBack(oApp); } });
      var barSettingsHeader = new sap.m.Toolbar({ id: "idBarSettingsHeader" });
      barSettingsHeader.addContent(btnSettingsBack);
      page.setCustomHeader(barSettingsHeader);

      // Form layout

      frmSettings = new sap.ui.layout.form.SimpleForm({ id: "idSettings", title: "Settings" });
      var oModel = new sap.ui.model.json.JSONModel(fiveCrowns.settings.oSettings);
      frmSettings.setModel(oModel);

      frmSettings.addContent(new sap.m.Label({ text: "Default number of players" }));
      frmSettings.addContent(new sap.m.Input({ value: "{/defaultPlayerCount}" }));
      frmSettings.addContent(new sap.m.Label({ text: "Default player prefix" }));
      frmSettings.addContent(new sap.m.Input({ value: "{/playerPrefix}" }));
      frmSettings.addContent(new sap.m.Label({ text: "Highlight current round" }));
      frmSettings.addContent(new sap.m.Input({ value: "{/highlightCurrentRound}", type: "Number" }));
      frmSettings.addContent(new sap.m.Label({ text: "Screen timeout (seconds)" }));
      frmSettings.addContent(new sap.m.Input({ value: "{/screenTimeout}", type: "Number" }));
      frmSettings.addContent(new sap.m.Label({ text: "Orientation (P for portrait)" }));
      frmSettings.addContent(new sap.m.Input({ value: "{/orientation}" }));

      page.addContent(frmSettings);


      // Add page to app
      oApp.addPage(page);

    },



  };

}());

