sap.ui.define(function() {
	"use strict";

	var Formatear = {

		status :  function (sStatus) {
			if (sStatus === "ACEPTADO") {
				return "Success";
			} else if (sStatus === "PENDIENTE") {
				return "Warning";
			} else if (sStatus === "RECHAZADO"){
				return "Error";
			} else {
				return "None";
			}
		},
		
		statusBaremacion :  function (sBaremacion) {
			if (sBaremacion === "BARE") {
				return "Success";
			} else if (sBaremacion === "SRCS") {
				return "Warning";
			} else if (sBaremacion === "SB"){
				return "Error";
			} else {
				return "None";
			}
		},
		
		
		
		statusBoton :  function (sStatus) {
			if (sStatus === "ACEPTADO") {
				return "Accept";
			} else if (sStatus === "PENDIENTE") {
				return "Unstyled";
			} else if (sStatus === "RECHAZADO"){
				return "Reject";
			} else {
				return "Reject";
			}
		},
		
		Baremacion :  function (sStatus) {
			if (sStatus === "BARE") {
				return "Accept";
			} else if (sStatus === "SRCS") {
				return "Default";
			} else if (sStatus === "SB"){
				return "Reject";
			} else {
				return "";
			}
		},
		
		intBoolRandomizer: function(iRandom) {
			return iRandom % 2 === 0;
		},
		favorite: function(sStatus) {
			return sStatus.length % 2 === 0;
		}
	};


	return Formatear;

}, /* bExport= */ true);
