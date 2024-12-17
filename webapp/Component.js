<<<<<<< HEAD
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device"
],
    function (UIComponent, Device) {
        "use strict";

        return UIComponent.extend("fiveCrowns.Component", {
=======
/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "nz/co/murray/fivecrowns/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("nz.co.murray.fivecrowns.Component", {
>>>>>>> 40a7b487d624f359e9e987db037ff3dd3b4a48da
            metadata: {
                manifest: "json"
            },

<<<<<<< HEAD
            init: function () {
                // call the base component's init function
                debugger;
                UIComponent.prototype.init.apply(this, arguments);
            },

            getContentDensityClass: function () {
                if (!this._sContentDensityClass) {
                    if (Device.support.touch) {
                        this._sContentDensityClass = "sapUiSizeCozy";
                    } else {
                        this._sContentDensityClass = "sapUiSizeCompact";
                    }
                }
                return this._sContentDensityClass;
            }



=======
            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
>>>>>>> 40a7b487d624f359e9e987db037ff3dd3b4a48da
        });
    }
);