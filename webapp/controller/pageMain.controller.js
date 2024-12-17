sap.ui.define([
    "sap/ui/core/mvc/Controller",
    // "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel"
],


    // function (Controller, syncStyleClass, JSONModel) {
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("fiveCrowns.controller.pageGameOverview", {

            onInit: function () {
                debugger;
                var oModel = new JSONModel();

                // oModel.setData({
                //     CustomerName: "SAP SE",
                //     City: "Walldorf"
                // });

                // var oView = this.getView();
                // oView.setModel(oModel, "customer");
            },


            // onSave: function () {
            //     if (!this.pDialog) {
            //         this.pDialog = this.loadFragment({
            //             name: "sap.training.exc.view.Dialog"
            //         }).then(function (oDialog) {
            //             syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
            //             return oDialog;
            //         }.bind(this));
            //     }
            //     this.pDialog.then(function (oDialog) {
            //         oDialog.open();
            //     });
            // },

            // onCloseDialog: function () {
            //     this.byId("dialog").close();
            // },

            // onCustomerChange: function (oEvent) {
            //     // debugger;
            //     var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
            //     this.byId("bookingTable").setBindingContext(oBindingContext);
            // }


        });
    });
