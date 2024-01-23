sap.ui.define(["es/cac/bolsa/BolsaTrabajoPublicada0920/controller/ControladorBase"], function (Controller) {
	"use strict";
	return Controller.extend("es.cac.bolsa.BolsaTrabajoPublicada0920.controller.Detalle", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.Detalle
		 */
		onInit: function () {
			//this.handleNavigationWithContext();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// nos vamos a subscribir a un evento que se produce cuando cambia la URL
			//nos subscribimos a esa ruta, y si coincide con la ruta Detalle lanza el evento
			oRouter.getRoute("Detalle").attachMatched(this._onRoutedMatched, this);
			// Vamos a definir un modelo JSON para recuperar los datos en ese modelo
			var oModelo = new sap.ui.model.json.JSONModel();
			// podemos añadir la ruta en la definición para solo llamar a var oModelo = new JSONModel()
			this.getView().setModel(oModelo, "miModelo"); //	var oModeloLista = new sap.ui.model.json.JSONModel();
			//	// podemos añadir la ruta en la definición para solo llamar a var oModelo = new JSONModel()
			//	this.getView().setModel(oModeloLista, "miModeloLista");
		},
		_onRoutedMatched: function (oEvent) {
			// con esta función vamos a utilizar una función para el modelo de datos JSON
			var sEjercicio = oEvent.getParameter("arguments").Ejercicio;
			var sNumOrden = oEvent.getParameter("arguments").NumOrden;
			//el kunnr tiene que ser el mismo nombre del parámetro que se pasa
			sap.m.MessageToast.show("Se ha recuperado el " + sEjercicio + sNumOrden);
			this._obtenerDatos(sEjercicio, sNumOrden);
			/*	 OPCION 1 trayendo todos los datos automaticamente
			//con la siguiente enlazamos a la ruta del oDAta para traer todos los datos, que estarán disponibles en la vista Detalle_binded.view.xml
			//con lo cual, añadiendo por ejemplo "{kunnr}", tendríamos los datos
			Con este ejemplo tenemos los datos para el primer Object Header de la vista*/
			this.getView().bindElement({
				path: "/SolicitateSet('" + sEjercicio + "')"
			}); /*FIN OPCION 1.*/
		},
		_obtenerDatos: function (sEjercicio, sNumOrden) {
				/*Con este ejemplo tenemos los datos para el Segundo Object Header de la vista*/
				this.getView().getModel().read("/ZSolicitantePublicadoSet('" + sEjercicio + sNumOrden + "')", {
					success: function (oData) {
						this.getView().getModel("miModelo").setData(oData); // si devolviese más de un cliente tendría que hacerse en:
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
			 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.Detalle
			 */
			//	onBeforeRendering: function() {
			//
			//	},
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.Detalle
			 */
			//	onAfterRendering: function() {
			//
			//	},
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.Detalle
			 */
			//	onExit: function() {
			//
			//	}
			,
		/**
		 *@memberOf 
		 */
		handleNavigationWithContext: function () {
			var that = this;
			var entitySet;
			var sRouteName;

			function _onBindingChange(oEvent) {
				// No data for the binding
				if (!that.getView().getBindingContext()) {
					//Need to insert default fallback route to load when requested route is not found.
					that.getOwnerComponent().getRouter().getTargets().display("");
				}
			}

			function _onRouteMatched(oEvent) {
				var oArgs, oView;
				oArgs = oEvent.getParameter("arguments");
				oView = that.getView();
				var sKeysPath = Object.keys(oArgs).map(function (key) {
					var oProp = JSON.parse(decodeURIComponent(oArgs[key]));
					return key + "=" + (oProp.type === "Edm.String" ? "'" + oProp.value + "'" : oProp.value);
				}).join(",");

				oView.bindElement({
					path: entitySet + "(" + sKeysPath + ")",
					events: {
						change: _onBindingChange.bind(that),
						dataRequested: function () {
							oView.setBusy(true);
						},
						dataReceived: function () {
							oView.setBusy(false);
						}
					}
				});
			}

			if (that.getOwnerComponent().getRouter) {
				var oRouter = that.getOwnerComponent().getRouter();
				var oManifest = this.getOwnerComponent().getMetadata().getManifest();
				var content = that.getView().getContent();
				if (content) {
					var oNavigation = oManifest["sap.ui5"].routing.additionalData;
					var oContext = oNavigation[that.getView().getViewName()];
					sRouteName = oContext.routeName;
					entitySet = oContext.entitySet;
					oRouter.getRoute(sRouteName).attachMatched(_onRouteMatched, that);
				}
			}
		}
	});
});