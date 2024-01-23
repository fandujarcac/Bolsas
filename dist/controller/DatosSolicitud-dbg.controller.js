sap.ui.define(["es/cac/bolsa/BolsaTrabajoPublicada0920/controller/ControladorBase"], 
function (Controller) {
	"use strict";

	return Controller.extend("es.cac.bolsa.BolsaTrabajoPublicada0920.controller.DatosSolicitud", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.DatosSolicitud
		 */
		onInit: function () {
			// Parse the current url and display the targets of the route that matches the hash
			this.getRouter().initialize();
			var oRouter = this.getRouter();
			oRouter.getRoute("DatosSolicitud").attachMatched(this._onRouteMatched, this);


			//Para el modelo xSolicitante que vamos a pasar al fragment
		
			
		},

		_onRoutedMatched: function (oEvent) {
			// con esta función vamos a utilizar una función para el modelo de datos JSON
			var sUniReg = oEvent.getParameter("arguments").UniReg;
			var sEjercicio = oEvent.getParameter("arguments").Ejercicio;
			var sNumOrden = oEvent.getParameter("arguments").NumOrden;
			var sNif = oEvent.getParameter("arguments").Nif;
			var sFechaPublic = oEvent.getParameter("arguments").FechaPublic;
			var encodeFechaPublic = encodeURIComponent(sFechaPublic);
			var sBolsa = oEvent.getParameter("arguments").Bolsa;
			var sPuesto = oEvent.getParameter("arguments").Puesto;
			//el kunnr tiene que ser el mismo nombre del parámetro que se pasa
			//MessageToast.show("Se ha recuperado el " + sEjercicio + sNumOrden);
			//this._obtenerDatos(sEjercicio, sNumOrden);
			/*	 OPCION 1 trayendo todos los datos automaticamente
			//con la siguiente enlazamos a la ruta del oDAta para traer todos los datos, que estarán disponibles en la vista Detalle_binded.view.xml
			//con lo cual, añadiendo por ejemplo "{kunnr}", tendríamos los datos
			Con este ejemplo tenemos los datos para el primer Object Header de la vista*/
			///ZSolicitantePublicadoSet(UniReg='BOL',Ejercicio='2019',NumOrden='01204')

			/*this.getView().bindElement({
				path: "/ZSolicitantePublicadoSet(UniReg='" + sUniReg + "',Ejercicio='" + sEjercicio + "',NumOrden='" + sNumOrden +
					"',Nif='" + sNif + "',Bolsa='" + sBolsa + "',Puesto='" + sPuesto + "',FechaPublic=datetime'" + encodeFechaPublic + "')"
			});*/
			this._showFormFragment("DisplayDetalle");

			//this._obtenerDatos(sUniReg, sEjercicio, sNumOrden,sNif);
			// Set the initial form to be the display one
			// this._showFormFragment("DisplayDetalle");
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.DatosSolicitud
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.DatosSolicitud
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.DatosSolicitud
		 */
		//	onExit: function() {
		//
		//	}

	});

});