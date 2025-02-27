export enum FactionInviteEvents {
  Accept = 'factionInvite:accept',
  Decline = 'factionInvite:decline',
}

export type FactionInvitePayloads = {
  [FactionInviteEvents.Accept]: undefined
  [FactionInviteEvents.Decline]: undefined
}
