const PersoClassColumn = 2;

/**
 * Trick to get autocompletion
 *
 * event.range = SpreadsheetApp.getActiveRange();
 */
function onEdit(event) {
  // Select eventType
  if (event.range.getColumn() === PersoClassColumn) {
    onPersoClassChange(event);
  }
}
