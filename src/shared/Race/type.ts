export enum Race {
	Argonian = 'Argonian',
	Breton = 'Breton',
	DarkElf = 'DarkElf',
	HighElf = 'HighElf',
	Imperial = 'Imperial',
	Khajit = 'Khajit',
	Nord = 'Nord',
	Orc = 'Orc',
	Redguard = 'Redguard',
	WoodElf = 'WoodElf',
}

export function getRaceById(id: number): Race {
	switch (id) {
		case 79680:
			return Race.Argonian
		case 79681:
			return Race.Breton
		case 79682:
			return Race.DarkElf
		case 79683:
			return Race.HighElf
		case 79684:
			return Race.Imperial
		case 79685:
			return Race.Khajit
		case 79686:
			return Race.Nord
		case 79687:
			return Race.Orc
		case 79688:
			return Race.Redguard
		case 79689:
			return Race.WoodElf
		default:
			return Race.Nord
	}
}