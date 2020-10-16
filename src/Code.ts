import { onPersoClassChange } from './perso';

const PersoClassColumn = 2;

/**
 * Called on every edit in the Spreadsheet
 */
export function onEdit(event: { value: string, range: GoogleAppsScript.Spreadsheet.Range }): void {
	// Select eventType
	if (event.range.getColumn() === PersoClassColumn) {
		onPersoClassChange(event.value, event.range);
	}
}

