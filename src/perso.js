const ClassSet = new Set([
	"Guerrier",
	"Chasseur",
	"Mage",
	"Druide",
	"Prêtre",
	"Démoniste",
	"Voleur",
	"Paladin",
]);

/**
 * Trick to get autocompletion
 *
 * event.range = SpreadsheetApp.getActiveRange();
 */
function onPersoClassChange(event) {
	// bail out on header selection
	if (event.range.getRow() === 0) return;
	
	const charClass = event.range.getValue();
	const charSpeCell = SpreadsheetApp.getActiveSheet().getRange(event.range.getRow(), event.range.getColumn() + 1)
	
	// Delete existing validation
	if (!ClassSet.has(charClass)) {
		charSpeCell.setDataValidation(null);
		return;
	}
	
	// Set correct validation
	const validationRule = SpreadsheetApp.newDataValidation().requireValueInRange(SpreadsheetApp.getActive().getRangeByName(`Spe${charClass}`), true);
	charSpeCell.setDataValidation(validationRule);
}
