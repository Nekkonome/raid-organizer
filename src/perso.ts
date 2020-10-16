const ClassSet = new Set([
	'Guerrier',
	'Chasseur',
	'Mage',
	'Druide',
	'Prêtre',
	'Démoniste',
	'Voleur',
	'Paladin',
]);

export function onPersoClassChange(charClass: string, range: GoogleAppsScript.Spreadsheet.Range): void {
	// bail out on header selection
	if (range.getRow() === 0) return;

	const charSpeCell = SpreadsheetApp.getActiveSheet()
		.getRange(range.getRow(), range.getColumn() + 1);

	// Delete existing validation
	if (!ClassSet.has(charClass)) {
		charSpeCell.setDataValidation(null);
		return;
	}

	// Set correct validation
	const validationRule = SpreadsheetApp
		.newDataValidation()
		.requireValueInRange(
			SpreadsheetApp
				.getActive()
				.getRangeByName(`Spe${ charClass }`), true,
		);

	charSpeCell.setDataValidation(validationRule);
}

