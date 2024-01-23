/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"es/cac/bolsa/BolsaTrabajoPublicada0920/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"es/cac/bolsa/BolsaTrabajoPublicada0920/test/integration/pages/App",
	"es/cac/bolsa/BolsaTrabajoPublicada0920/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "es.cac.bolsa.BolsaTrabajoPublicada0920.view.",
		autoWait: true
	});
});