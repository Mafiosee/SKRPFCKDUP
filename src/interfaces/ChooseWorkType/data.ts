import { WorkStatus } from '../../shared/Work/Work'

export const ButtonClassName = {
	[WorkStatus.Unavailable]: '-unavailable',
	[WorkStatus.Available]: '-available',
	[WorkStatus.Working]: '-working',
}
