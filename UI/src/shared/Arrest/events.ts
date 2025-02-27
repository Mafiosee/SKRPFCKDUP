export enum ArrestEvents {
  Close = 'arrest:close',
  Apply = 'arrest:apply',
}

export type ArrestPayloads = {
  [ArrestEvents.Close]: undefined
  [ArrestEvents.Apply]: {
    durationMinutes: number
    canOutOnBail: boolean
    reason: string
  }
}
