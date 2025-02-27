export enum Tab {
	Balance = 'Balance',
	Rent = 'Rent',
}

export const TabName: Record<Tab, string> = {
	[Tab.Balance]: 'Счет',
	[Tab.Rent]: 'Аренда',
}