import { CharClass, CharRole } from './_enum';


export class Raid {
	private _raidPhases: RaidPhase[];
	private _charManager: CharManager;

	roster: Roster;

	constructor(public name: string) {}

	addPhase(name: string): RaidPhase {
		const newRaidPhase = new RaidPhase(name, this.roster);

		this._raidPhases.push(newRaidPhase);

		return newRaidPhase;
	}
}

export class Roster {

	Voleur: RosterGenericClass = new RosterGenericClass(CharClass.Voleur);

}

export class RosterGenericClass {
	min: number;
	max: number;

	constructor(public readonly name: CharClass) {}

	setup({min, max}: { min: number, max: number }): void {
		this.min = min;
		this.max = max;
	}
}

export class CharManager {

}

export class Char {
	index: number;
	
	constructor(
		public readonly name: string,
		public readonly charClass: keyof typeof CharClass,
		public readonly spe: string,
	) {}
}


export class RaidPhase {

	constructor(
		public readonly name: string,
		private readonly _roster: Roster,
	) {}

	selectByClass(charClasses: keyof typeof CharClass | (keyof typeof CharClass)[]): CharsSelector {
		const charsSelector = new CharsSelector();

		charsSelector.selectByClass(charClasses as CharClass);

		return charsSelector;
	}
}

export class CharsSelector {
	private _selectByClass: Set<CharClass>;
	private _selectByRole: Set<CharRole>;
	private _selectByFunction: (char: Char) => boolean;

	getSubGroup(): CharSubGroup {
		return new CharSubGroup(this);
	}

	selectByClass(charClasses: CharClass | CharClass[]) {
		this._selectByClass = new Set<CharClass>(Array.isArray(charClasses) ? charClasses : [charClasses]);
	}

	selectByRole(roles: CharRole | CharRole[]) {
		this._selectByRole = new Set<CharRole>(Array.isArray(roles) ? roles : [roles]);
	}

}

export class CharSubGroup {
	private _positionLogic: (char: Char) => string;
	
	constructor(
		private _selector: CharsSelector,
	) {}
	
	addPosition(positionLogic: CharSubGroup['_positionLogic']) {
		this._positionLogic = positionLogic;
	}
}

