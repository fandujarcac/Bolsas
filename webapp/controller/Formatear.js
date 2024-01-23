sap.ui.define(function() {
	"use strict";

	var Formatear = {

		status: function(sStatus) {
			if (sStatus === "ACEPTADO") {
				return "Success";
			} else if (sStatus === "PENDIENTE") {
				return "Warning";
			} else if (sStatus === "RECHAZADO") {
				return "Error";
			} else {
				return "None";
			}
		},

		statusBaremacion: function(sBaremacion) {
			if (sBaremacion === "BARE") {
				return "Success";
			} else if (sBaremacion === "SRCS") {
				return "Warning";
			} else if (sBaremacion === "SB") {
				return "Error";
			} else {
				return "None";
			}
		},

		statusBoton: function(sStatus) {
			if (sStatus === "ACEPTADO") {
				return "Accept";
			} else if (sStatus === "PENDIENTE") {
				return "Unstyled";
			} else if (sStatus === "RECHAZADO") {
				return "Reject";
			} else {
				return "Reject";
			}
		},

		Baremacion: function(sStatus) {
			if (sStatus === "BARE") {
				return "Accept";
			} else if (sStatus === "SRCS") {
				return "Default";
			} else if (sStatus === "SB") {
				return "Reject";
			} else if (sStatus === "BNONECE") {
				return "Default";
   		    } else {
				return "";
			}
		},

		intBoolRandomizer: function(iRandom) {
			return iRandom % 2 === 0;
		},
		favorite: function(sStatus) {
			return sStatus.length % 2 === 0;
		},

		textoOrden: function(orden) {

			if (orden === 9999) {
			    this.addStyleClass('cssleave-neg');
				return 'Sin orden asignado';
			} else {
				this.addStyleClass('cssleave-pos');
				return ('Orden de Llamamiento Nº: ' + orden);
			}
		},
		
		ColorTextoOrden: function(orden) {
			var itemIntro = this.sId + '-intro';
			var elem = document.getElementById(itemIntro);
			//var list = this.getView().byId("idPageListaSolicitudes");
            
			if (orden === 9999) {
				$(itemIntro).addClass('cssleave');
				return 'red';
				

			} else {
		    	$(itemIntro).addClass('cssleave1');
				return 'green';
			}
		},

		sinPuesto: function(orden) {
			if (orden === 9999) {
				return 0;
			} else {
				return orden;
			}

		}

	};

	return Formatear;

}, /* bExport= */ true);