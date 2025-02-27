export enum CivilWarMembers {
  Empire,
  StormCloaks,
}

export const CivilWarMemberNames: Record<CivilWarMembers, string> = {
  [CivilWarMembers.Empire]: 'Имперский легион',
  [CivilWarMembers.StormCloaks]: 'Братья бури',
}

export const CivilWarMemberColor: Record<CivilWarMembers, { background: string, border: string }> = {
  [CivilWarMembers.Empire]: {
    background: 'rgba(116, 42, 42, .5)',
    border: '#BC2323',
  },
  [CivilWarMembers.StormCloaks]: {
    background: 'rgba(56, 95, 117, .5)',
    border: '#385F75',
  },
}