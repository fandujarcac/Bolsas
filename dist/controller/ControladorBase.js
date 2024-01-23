// Se va a hacer una clase para que pueda utilizarse posteriormente
sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"./Formatear",
	"sap/m/Input", 
	"sap/ui/core/Icon",
	"sap/m/GroupHeaderListItem",
	"sap/ui/core/UIComponent"

	

], function ($, Controller, MessageToast, MessageBox, Formatear, Input, Icon, GroupHeaderListItem, UIComponent ) { //el orden es importante con lo definido arriba
	"use strict";
	return Controller.extend("es.cac.bolsa.BolsaTrabajoPublicada0920.controller.ControladorBase", {
		getRouter: function () { // se mete el código para obtener el Router
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);

			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("ListaSolicitudes", {}, true);

			}

		},

		_formFragments: {},

		_toggleButtonsAndView: function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "Change" : "Display");
		},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "es.cac.bolsa.BolsaTrabajoPublicada0920.view.fragment." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},

		_showFormFragment: function (sFragmentName) {
			var oPage = this.byId("pageDet");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		}

	});
});