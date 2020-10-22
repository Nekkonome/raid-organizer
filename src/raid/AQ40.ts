import { Raid } from './raid.class';


export function initAQ40() {
	const raid = new Raid('AQ40');

	raid.roster.Voleur.setup({
		min: 4,
		max: 10,
	});

	// Phase setup
	const skeramPhase = raid.addPhase('Skeram');

	// selection d'un sous-group
	const voleurs = skeramPhase
		.selectByClass('Voleur')
		.getSubGroup();
	
	// Placement pair / impair
	voleurs.addPosition(char => char.index % 2 ? 'Gauche' : 'Droite');
}
