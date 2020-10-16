import { onPersoClassChange } from './perso';


interface EditActionMap {
	[sheetName: string]: {
		[columnIndex: string]: (value: string, range: GoogleAppsScript.Spreadsheet.Range) => void;
	};
}

enum SheetName {
	CharList = 'Personnages',
}


/**
 * Called on every edit in the Spreadsheet,
 * If edit is on a range of more than 1 cell, value is undefined
 */
export function onEdit(event: { value?: string, range: GoogleAppsScript.Spreadsheet.Range }): void {

	const onEditActionMap: EditActionMap = {
		[SheetName.CharList]: {
			'2': onPersoClassChange,
		},
	};
	

	const sheetName = event.range
		.getSheet()
		.getSheetName();
	const columnIndex1 = event.range.getColumn();

	const sheetActions = onEditActionMap[sheetName];
	if (!sheetActions) return;

	const columnAction = sheetActions[columnIndex1];
	if (!columnAction) return;

	columnAction(event.value, event.range);
}

