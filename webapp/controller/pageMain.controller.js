

// Too hard right now. Maybe later.
// Code left here for reference only



sap.ui.define([
<<<<<<< HEAD
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel"
=======
    "sap/ui/core/mvc/Controller"
>>>>>>> 40a7b487d624f359e9e987db037ff3dd3b4a48da
],
function (Controller) {
    "use strict";

    return Controller.extend("nz.co.murray.fivecrowns.controller.pageMain", {
        onInit: function () {

<<<<<<< HEAD
    function (Controller, syncStyleClass, JSONModel) {
        "use strict";

        return Controller.extend("fiveCrowns.controller.pageMain", {

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
=======
        }
>>>>>>> 40a7b487d624f359e9e987db037ff3dd3b4a48da
    });
});
