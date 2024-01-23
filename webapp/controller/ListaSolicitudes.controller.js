sap.ui.define(["es/cac/bolsa/BolsaTrabajoPublicada0920/controller/ControladorBase"], function (Controller) {
	"use strict";
	return Controller.extend("es.cac.bolsa.BolsaTrabajoPublicada0920.controller.ListaSolicitudes", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.view.ListaSolicitudes
		 */
		onInit: function () {
			//this.handleNavigationWithContext();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oModeloLista = new sap.ui.model.json.JSONModel();
			// podemos añadir la ruta en la definición para solo llamar a var oModelo = new JSONModel()
			this.getView().setModel(oModeloLista, "miModeloSolicitantes");
			// nos vamos a subscribir a un evento que se produce cuando cambia la URL
			//nos subscribimos a esa ruta, y si coincide con la ruta Detalle lanza el evento
			oRouter.getRoute("ListaSolicitudes").attachMatched(this._onRoutedMatched, this);
			//Para el modelo xSolicitante que vamos a pasar al fragment
			var oModelo = new sap.ui.model.json.JSONModel();
			// podemos añadir la ruta en la definición para solo llamar a var oModelo = new JSONModel()
			this.getView().setModel(oModelo, "xSolicitante");
			this.getView().setModel(oModelo, "miBolsa");
			this.getView().setModel(oModelo, "miPuesto");
			this.getView().setModel(oModelo, "miBolsaPublicada");

		},
		_onRoutedMatched: function (oEvent) {
			var oGlobalBusyDialog = new sap.m.BusyDialog();
			oGlobalBusyDialog.open();
			var sEjercicio = oEvent.getParameter("arguments").Ejercicio;
			var sBolsa = oEvent.getParameter("arguments").Bolsa;
			var sPuesto = oEvent.getParameter("arguments").Puesto;
			var sFechaPublic = oEvent.getParameter("arguments").FechaPublic;
			var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
				//pattern: "dd-MM-yyyy",
				style: "medium"
			});

			var encodeFechaPublic = encodeURIComponent(sFechaPublic);

			var filters = [];
			var filter;
			var filterEjercicio = new sap.ui.model.Filter("Ejercicio", sap.ui.model.FilterOperator.EQ, sEjercicio);
			filters.push(filter);
			var filterBolsa = new sap.ui.model.Filter("Bolsa", sap.ui.model.FilterOperator.EQ, sBolsa);
			filters.push(filter);
			var filterPuesto = new sap.ui.model.Filter("Puesto", sap.ui.model.FilterOperator.EQ, sPuesto);
			filters.push(filter);
			var filterFechaPublic = new sap.ui.model.Filter("FechaPublic", sap.ui.model.FilterOperator.EQ, sFechaPublic);
			filters.push(filter);
			var oDataFilter = new sap.ui.model.Filter({
				filters: [
					filterEjercicio,
					filterBolsa,
					filterPuesto,
					filterFechaPublic
				],
				and: true
			});

			this.getView().getModel().read("/ZSolicitantePublicadoSet", {
				filters: [oDataFilter],
				success: function (oData) {
					this.getView().getModel("miModeloSolicitantes").setSizeLimit("1000");
					this.getView().getModel("miModeloSolicitantes").setData(oData.results);

					// si devolviese más de un cliente tendría que hacerse en:
					oGlobalBusyDialog.close(); // setData(oData.results);  
				}.bind(this),
				//esto es necesario porque la petición es Asíncrona, y de esta manera el THIS apunta al objeto, si no lo pierde.  
				error: function (oError) {
					sap.m.MessageToast.show("Se ha producido un error en el Results");
				}
			});

			// Se recupera la bolsa Publicada
			//(UniReg='BOL',Ejercicio='2019',Bolsa='001',Puesto='APA',FechaPublic=datetime'2019-10-03T02%3A00%3A00')
			this.getView().getModel().read("/ZBolsas_PublicadasSet(UniReg='BOL',Ejercicio='" + sEjercicio + "',Bolsa='" + sBolsa + "',Puesto='" +
				sPuesto + "',FechaPublic=datetime'" + encodeFechaPublic + "')", {
					success: function (oData) {
						this.getView().getModel("miBolsaPublicada").setData(oData);
						// si devolviese más de un cliente tendría que hacerse en:
						//comboBox.setModel(miModeloBolsas);
						//var olabel = sap.ui.getCore().byId("labelBar");
						var olabelPuesto = this.byId("idLabelPuesto");
						var olabelPuesto2 = this.byId("idLabelPuesto2");
						var textoPuesto = "Listado de Solicitudes de " + oData.Descripcion + "  ------>  Publicado el: " + oFormat.format(oData.FechaPublic); // + "  (" + oData.Puesto + ")";
						olabelPuesto.setText(textoPuesto);
						olabelPuesto2.setText(textoPuesto);
					}.bind(this),
					//esto es necesario porque la petición es Asíncrona, y de esta manera el THIS apunta al objeto, si no lo pierde.  
					error: function (oError) {
						sap.m.MessageToast.show("Se ha producido un error abriendo las Bolsas");
					}
				});

			// Se recupera el nombre de la bolsa
			this.getView().getModel().read("/ZayudaBolsaSet(Bolsa='" + sBolsa + "')", {
				success: function (oData) {
					this.getView().getModel("miBolsa").setData(oData);
					// si devolviese más de un cliente tendría que hacerse en:
					//comboBox.setModel(miModeloBolsas);
					//var olabel = sap.ui.getCore().byId("labelBar");
					var olabel = this.byId("idLabelBar");
					olabel.text = oData.TextoBolsa;
					olabel.setText(oData.TextoBolsa);
				}.bind(this),
				//esto es necesario porque la petición es Asíncrona, y de esta manera el THIS apunta al objeto, si no lo pierde.  
				error: function (oError) {
					sap.m.MessageToast.show("Se ha producido un error abriendo las Bolsas");
				}
			});

			// Se recupera el nombre de la bolsa
			this.getView().getModel().read("/ZayudaBolsaSet(Bolsa='" + sBolsa + "')", {
				success: function (oData) {
					this.getView().getModel("miBolsa").setData(oData);
					// si devolviese más de un cliente tendría que hacerse en:
					//comboBox.setModel(miModeloBolsas);
					//var olabel = sap.ui.getCore().byId("labelBar");
					var olabel = this.byId("idLabelBar");
					olabel.text = oData.TextoBolsa;
					olabel.setText(oData.TextoBolsa);
				}.bind(this),
				//esto es necesario porque la petición es Asíncrona, y de esta manera el THIS apunta al objeto, si no lo pierde.  
				error: function (oError) {
					sap.m.MessageToast.show("Se ha producido un error abriendo las Bolsas");
				}
			});
			// Se recupera el nombre del puesto
			this.getView().getModel().read("/ZayudaPuestoBolsaSet(Bolsa='" + sBolsa + "',Puesto='" + sPuesto + "')", {
				success: function (oData) {
					this.getView().getModel("miPuesto").setData(oData);
					// si devolviese más de un cliente tendría que hacerse en:
					//comboBox.setModel(miModeloBolsas);
					var olabelPuesto = this.byId("idLabelPuesto");
					var olabelPuesto2 = this.byId("idLabelPuesto2");
					var textoPuesto = "Listado de Solicitudes de " + oData.TextoPuesto + "  (" + oData.Puesto + ")";
					//olabelPuesto.setText(textoPuesto);
					//olabelPuesto2.setText(textoPuesto);
				}.bind(this),
				//esto es necesario porque la petición es Asíncrona, y de esta manera el THIS apunta al objeto, si no lo pierde.  
				error: function (oError) {
					sap.m.MessageToast.show("Se ha producido un error abriendo los Puestos");
				}
			});
		},
		onSearch: function (oEvent) {
			var oRefreshButton = oEvent.getParameter("clearButtonPressed");
			if (oRefreshButton) {
				var list = this.getView().byId("idMiLista");
				var binding = list.getBinding("items");
				binding.filter(null);
			} else {
				var aFilters = [];
				var sQuery = oEvent.getSource().getValue();
				if (sQuery && sQuery.length > 2) {
					/*// Para un unico filtro
				var filter = new sap.ui.model.Filter("Name1",
					sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
				*/
					var filter = new sap.ui.model.Filter({
						filters: [
							new sap.ui.model.Filter("Nombre", sap.ui.model.FilterOperator.Contains, sQuery),
							new sap.ui.model.Filter("Apellido1", sap.ui.model.FilterOperator.Contains, sQuery),
							new sap.ui.model.Filter("Apellido2", sap.ui.model.FilterOperator.Contains, sQuery),
							new sap.ui.model.Filter("NombreCompleto", sap.ui.model.FilterOperator.Contains, sQuery),
							new sap.ui.model.Filter("NumOrden", sap.ui.model.FilterOperator.Contains, sQuery)
						],
						and: false //con false aplica un OR en los filtros, si es true se tienen que dar todos como ciertos
					});
					aFilters.push(filter);
					var oList = this.getView().byId("idMiLista");
					var binding = oList.getBinding("items");
					binding.filter(aFilters, "Control");
				}
			}
		},
		onRefresh: function (oEvent) {
			var oRefreshButton = oEvent.getParameter("clearButtonPressed");
			if (oRefreshButton) {
				var list = this.getView().byId("idMiLista");
				var binding = list.getBinding("items");
				binding.filter(null);
			}
		},
		/**
		 *@memberOf es.seidor.curso.Curso00.controller.Detalle
		 */
		openDialogoOrdenar: function () {
			if (!this._oDialogOrd) {
				this._oDialogOrd = sap.ui.xmlfragment("es.cac.bolsa.BolsaTrabajoPublicada0920.view.fragment.DialogoOrdenacion", this);
			}
			this.getView().addDependent(this._oDialogOrd);
			this._oDialogOrd.open();
		},
		onOrdenar: function (oEvent) {
			var mParams = oEvent.getParameters();
			var oList = this.getView().byId("idMiLista");
			var oBinding = oList.getBinding("items");
			var aSorters = [];
			// Agrupación 
			if (mParams.groupItem) {
				var sPathGroup = mParams.groupItem.getKey();
				var bDescendingGroup = mParams.groupDescending;
				var vGroup = function (oContext) {
					var name = oContext.getProperty(sPathGroup);
					return {
						key: name,
						text: name
					};
				};
				aSorters.push(new sap.ui.model.Sorter(sPathGroup, bDescendingGroup, vGroup));
			}
			var sPath = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new sap.ui.model.Sorter(sPath, bDescending));
			oBinding.sort(aSorters);
		},
		onDetailPress: function (oEvent) {
			//This code was generated by the layout editor.
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("es.cac.bolsa.BolsaTrabajoPublicada0920.view.fragment.DialogoPassword", this);
			}
			this.getView().addDependent(this._oDialog);
			// para crear el modelo Local con todos los datos del pedido, accedemos a la vista y recuperamos todo el objeto
			//var oList = this.getView().byId("idMiLista");
			//var binding = oList.getBinding("items");

			var oSolicitante = oEvent.getSource().getBindingContext("miModeloSolicitantes");
			// Definimos el modelo local que se va a utilizar
			//var oContext = oEvent.getSource().getSelectedItem().getBindingContext("miModeloSolicitantes");
			var sNombre = oSolicitante.getProperty("Nombre");
			var sNif = oSolicitante.getProperty("Nif");
			var sApellido1 = oSolicitante.getProperty("Apellido1");
			var sApellido2 = oSolicitante.getProperty("Apellido2");
			var sUniReg = oSolicitante.getProperty("UniReg");
			var sEjercicio = oSolicitante.getProperty("Ejercicio");
			var sNumOrden = oSolicitante.getProperty("NumOrden");
			var sBolsa = oSolicitante.getProperty("Bolsa");
			var sPuesto = oSolicitante.getProperty("Puesto");
			var oFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddTHH:mm:ss",
				style: "medium"
			});
			var sFechaPublic = oFormat.format(oSolicitante.getProperty("FechaPublic"));
			// this.getOwnerComponent().getRouter().navTo("DetallePedidoSplit", {
			// 	Vbeln:sVbeln,
			// 	Kunnr:sKunnr
			//},true);  //el kunnr tiene que se el mismo nombre que tiene el parámetro de la ruta	
			//var oPedido = this.getView().getBindingContext().getObject();
			var oPass = {
				Nombre: sNombre,
				//binding.Nombre,
				Nif: sNif,
				Apellido1: sApellido1,
				Apellido2: sApellido2,
				UniReg: sUniReg,
				Ejercicio: sEjercicio,
				NumOrden: sNumOrden,
				Bolsa: sBolsa,
				Puesto: sPuesto,
				FechaPublic: sFechaPublic
			};
			//this.getView().getModel("xSolicitante").setData(oPass);
			// con esto hemos creado el modelo "xSolicitante", antes de abrir el diálogo
			// Intentamos recuperar el nombre de la Moneda
			this.getView().getModel("xSolicitante").setData(oPass);
			this._oDialog.open();
		},
		onConfirmar: function (oEvent) {
			//This code was generated by the layout editor.
			//this._oDialog = sap.ui.xmlfragment("es.seidor.curso.Curso00.view.fragment.dialogo", this); 
			this.getView().setBusy(true);
			//con esto se bloquea para que no se pueda utilzar
			// Vamos a recuperar los valores del modelo de Factura
			var oSolicitante = this.getView().getModel("xSolicitante").getData();
			// Tratamos los valores decimales, para convertirlos en String y poder pasarlos
			oSolicitante.Nif = oSolicitante.Nif.toString(); //también funcionaria oFActura.Netwr + "";
		},
		onListItemPress: function (evt) {
			sap.m.MessageToast.show("Pressed : " + evt.getSource().getTitle());
		},
		onChangePass: function (oEvent) {
			//var sPass = oEvent.getParameter("value");
			var oFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddTHH:mm:ss",
				style: "medium"
			});
			var oInputPass = oEvent.getSource();
			var sNif = oInputPass.getValue().toUpperCase();
			var oSolicitante = this.getView().getModel("xSolicitante").getData();
			var sNifRead = "";
			var sUniReg = oSolicitante.UniReg;
			var sEjercicio = oSolicitante.Ejercicio;
			var sNumOrden = oSolicitante.NumOrden;
			var sBolsa = oSolicitante.Bolsa;
			var sPuesto = oSolicitante.Puesto;
			var sFechaPublic = oSolicitante.FechaPublic;
			//var sFechaPublic = oSolicitante.FechaPublic;
			var oModelo = new sap.ui.model.json.JSONModel();
			// podemos añadir la ruta en la definición para solo llamar a var oModelo = new JSONModel()
			this.getView().setModel(oModelo, "Solicitud");
			// this.getView().getModel().read("/ZSolicitantePublicadoSet(UniReg='BOL',Ejercicio='2019',NumOrden='40385')",
			// 	null, null, true, null, null);
			// this.getView().getModel("Solicitud").setData(oData);
			//var URI_aux = "2019-10-07T00:00:00";
			//var encodeURI = "datetime" + "'" + encodeURIComponent(sFechaPublic) + "'";
			var encodeFechaPublic = encodeURIComponent(sFechaPublic);
			//this.getView().getModel().read("/ZSolicitantePublicadoSet(UniReg='BOL',Ejercicio='2019',FechaPublic=" + encodeURI + ",NumOrden='02826',Nif='22566828X',Bolsa='001',Puesto='AXM')", {	
			this.getView().getModel().read("/ZSolicitantePublicadoSet(UniReg='" + sUniReg + "',Ejercicio='" + sEjercicio + "',NumOrden='" +
				sNumOrden + "',Bolsa='" + sBolsa + "',Puesto='" + sPuesto + "',Nif='" + sNif + "',FechaPublic=datetime'" + encodeFechaPublic +
				"')", {
					success: function (oData) {
						this.getView().getModel("Solicitud").setData(oData);
						var sSolicitud = this.getView().getModel("Solicitud").getData();
						//	this.getView().getModel("SolicitanteRead").setData(oData); // si devolviese más de un cliente tendría que hacerse en:
						// setData(oData.results);  
						//var solicitud = this.getView().getModel().getData(oData);
						// Tratamos los valores decimales, para convertirlos en String y poder pasarlos
						//oSolicitante.Nif = oSolicitante.Nif.toString().toUpperCase();
						sNifRead = sNif;
						oInputPass.setValue("");
						sap.m.MessageToast.show("Autentificaci\xF3 correcta");
						//sap.m.MessageBox.success("NIF Correcto");
						oInputPass.setValueState("None");
						this._oDialog.close();
						//this.onNavegarDetalle(oSolicitante);
						sSolicitud.Nif = sNifRead;
						this.onNavegarDetalle(sSolicitud);
						/*	//if (sNif === oSolicitante.Nif) {
																if (sNif === sNifRead & sNif !== "") {
																	oInputPass.setValue("");
																	sap.m.MessageToast.show("Autentificaci\xF3 correcta");
																	//sap.m.MessageBox.success("NIF Correcto");
																	oInputPass.setValueState("None");
																	this._oDialog.close();
																	//this.onNavegarDetalle(oSolicitante);
																	this.onNavegarDetalle(sSolicitud);
																} else {
																	oInputPass.setValue("");
																	sap.m.MessageBox.error("NIF Incorrecto");
																	//sap.m.MessageToast.show("Clave Incorrecta");
																	oInputPass.setValueState("None");
																	//oInputPass.setValueState("Error");
																	//oInputPass.setValueStateText("Nombre de usuario o contraseña incorrecta");
																	this._oDialog.close();
															}*/
					}.bind(this),
					//esto es necesario porque la petición es Asíncrona, y de esta manera el THIS apunta al objeto, si no lo pierde.  
					error: function (oError) {
						//sap.m.MessageToast.show("Se ha producido un error leyendo la solicitud Seleccionada");
						//this._oDialog.close();
						oInputPass.setValue("");
						sap.m.MessageBox.error("NIF Incorrecto");
						//sap.m.MessageToast.show("Clave Incorrecta");
						oInputPass.setValueState("None");
						//oInputPass.setValueState("Error");
						//oInputPass.setValueStateText("Nombre de usuario o contraseña incorrecta");
						this._oDialog.close();
					}
				});
		},
		onNavegarDetalle: function (pSolicitante) {
			//This code was generated by the layout editor.
			//var oContext = oEvent.getSource().getSelectedItem().getBindingContext("miModeloSolicitantes");
			//var sEjercicio =  oContext.getProperty("Ejercicio"); 
			var oFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddTHH:mm:ss",
				style: "medium"
			});
			var sUniReg = "BOL";
			var sEjercicio = pSolicitante.Ejercicio;
			var sNumOrden = pSolicitante.NumOrden;
			var sNif = pSolicitante.Nif; //"22566828X";
			//pSolicitante.Nif;
			var sBolsa = pSolicitante.Bolsa;
			var sPuesto = pSolicitante.Puesto;
			//var sFechaPublic = pSolicitante.FechaPublic;
			var sFechaPublic = oFormat.format(pSolicitante.FechaPublic);
			this.getOwnerComponent().getRouter().navTo("DetalleSolicitud", {
				UniReg: sUniReg,
				Ejercicio: sEjercicio,
				FechaPublic: sFechaPublic,
				NumOrden: sNumOrden,
				Nif: sNif,
				Bolsa: sBolsa,
				Puesto: sPuesto
			});

			/*var oItem, oCtx;

			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("DatosSolicitud", {
				UniReg:  oCtx.getProperty("UniReg"),
				Ejercicio: oCtx.getProperty("Ejercicio"),
				FechaPublic: oCtx.getProperty("FechaPublic"),
				NumOrden: oCtx.getProperty("NumOrden"),
				Nif: oCtx.getProperty("Nif"),
				Bolsa: oCtx.getProperty("Bolsa"),
				Puesto: oCtx.getProperty("Puesto")
			});*/

			/*this.getRouter().navTo("DatosSolicitud", {
				UniReg: sUniReg,
				Ejercicio: sEjercicio,
				FechaPublic: sFechaPublic,
				NumOrden: sNumOrden,
				Nif: sNif,
				Bolsa: sBolsa,
				Puesto: sPuesto
			});*/
		},
		oNavegarCreate: function (oEvent) {
			//This code was generated by the layout editor.
			this.getRouter().navTo("CreateSolicitud");
		},

	
			getGroupHeader: function (oGroup) {
				return new sap.m.GroupHeaderListItem({
					title: oGroup.key,
					upperCase: false
				});
			}
			/**
			 *@memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.controller.ListaSolicitudes
			 */
			,
		/**
		 *@memberOf 
		 */
		onAfterRendering: function () {
			var oSearch = this.byId("IdSearchCliente1");
			oSearch.focus();
		},
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
		},
		/**
		 *@memberOf es.cac.bolsa.BolsaTrabajoPublicada0920.controller.ListaSolicitudes
		 */

	});
});