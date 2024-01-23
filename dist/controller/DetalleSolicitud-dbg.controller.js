sap.ui.define([
	"es/cac/bolsa/BolsaTrabajoPublicada0920/controller/ControladorBase"
], function (Controller) {
	"use strict";

	return Controller.extend("es.cac.bolsa.BolsaTrabajoPublicada0920.controller.DetalleSolicitud", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.DetalleSolicitud
		 */
		onInit: function () {
			//	MessageToast.show("Se ha recuperado el " + sEjercicio + sNumOrden);
			//this.handleNavigationWithContext();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// nos vamos a subscribir a un evento que se produce cuando cambia la URL
			//nos subscribimos a esa ruta, y si coincide con la ruta Detalle lanza el evento
			oRouter.getRoute("DetalleSolicitud").attachMatched(this._onRoutedMatched, this);
			// Vamos a definir un modelo JSON para recuperar los datos en ese modelo
			var oModelo = new sap.ui.model.json.JSONModel();
			// podemos añadir la ruta en la definición para solo llamar a var oModelo = new JSONModel()
			this.getView().setModel(oModelo, "ModelSolicitante"); //	var oModeloLista = new sap.ui.model.json.JSONModel();

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
			this.getView().getModel().read("/ZSolicitantePublicadoSet(UniReg='" + sUniReg + "',Ejercicio='" + sEjercicio + "',NumOrden='" +
				sNumOrden + "',Bolsa='" + sBolsa + "',Puesto='" + sPuesto + "',Nif='" + sNif  +  "',FechaPublic=datetime'" + encodeFechaPublic + "')", {
					success: function (oData) {
						this.getView().getModel("ModelSolicitante").setData(oData);
                        	this._showFormFragment("DisplayDetalle");
					}.bind(this),
					//esto es necesario porque la petición es Asíncrona, y de esta manera el THIS apunta al objeto, si no lo pierde.  
					error: function (oError) {
						//sap.m.MessageToast.show("Se ha producido un error leyendo la solicitud Seleccionada");
						//this._oDialog.close();
						sap.m.MessageBox.error("Error leyendo ");
						//sap.m.MessageToast.show("Clave Incorrecta");
					}
				});

			/*this.getView().bindElement({
				//path: "/ZSolicitantePublicadoSet(UniReg='BOL',Ejercicio='2019',Bolsa='001',Puesto='AXM',Nif='33473407N',NumOrden='01188',FechaPublic=datetime'2019-10-07T00:00:00')"
				path: "/ZSolicitantePublicadoSet(UniReg='" + sUniReg + "',Ejercicio='" + sEjercicio + "',NumOrden='" + sNumOrden +
					"',Nif='" + sNif + "',Bolsa='" + sBolsa + "',Puesto='" + sPuesto + "',FechaPublic='" + encodeFechaPublic + "')"
			},true);*/

			//var oSolicitante = this.getView().getBindingContext().getObject();
			//this._showFormFragment("DisplayDetalle");

			/*this._obtenerDatos(sUniReg, sEjercicio, sNumOrden,sNif, sFechaPublic, sBolsa, sPuesto);
			// Set the initial form to be the display one
			 this._showFormFragment("DisplayDetalle");*/
		},

		_obtenerDatos: function (sUniReg, sEjercicio, sNumOrden, sNif, sFechaPublic, sBolsa, sPuesto) {
			var oModelo = new sap.ui.model.json.JSONModel();
			// podemos añadir la ruta en la definición para solo llamar a var oModelo = new JSONModel()
			this.getView().setModel(oModelo, "Solicitud");
			var encodeFechaPublic = encodeURIComponent(sFechaPublic);
			/*Con este ejemplo tenemos los datos para el Segundo Object Header de la vista*/
			//this.getView().getModel().read("/ZSolicitantePublicadoSet(UniReg='" + sUniReg + "',Ejercicio='" + sEjercicio + "',NumOrden='" + sNumOrden + "',Nif='" + sNif + "',FechaPublic='" + sFechaPublic + "')", {
			this.getView().getModel().read("/ZSolicitantePublicadoSet(UniReg='" + sUniReg + "',Ejercicio='" + sEjercicio + "',NumOrden='" +
				sNumOrden +
				"',Bolsa='" + sBolsa + "',Puesto='" + sPuesto + "',Nif='" + sNif + "',FechaPublic=datetime'" + encodeFechaPublic + "')", {
					success: function (oData) {
						this.getView().getModel("Solicitud").setData(oData);
						this.getView().getModel("Solicitud").getData();
						this._showFormFragment("DisplayDetalle");
						// setData(oData.results);  
					}.bind(this),
					//esto es necesario porque la petición es Asíncrona, y de esta manera el THIS apunta al objeto, si no lo pierde.  
					error: function (oError) {
						sap.m.MessageToast.show("Se ha producido un error");
					}
				});

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.DetalleSolicitud
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.DetalleSolicitud
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.DetalleSolicitud
		 */
		//	onExit: function() {
		//
		//	}

	});

});