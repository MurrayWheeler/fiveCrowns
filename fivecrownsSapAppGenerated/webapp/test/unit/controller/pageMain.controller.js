/*global QUnit*/

sap.ui.define([
	"nzcomurray/fivecrowns/controller/pageMain.controller"
], function (Controller) {
	"use strict";

	QUnit.module("pageMain Controller");

	QUnit.test("I should test the pageMain controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
