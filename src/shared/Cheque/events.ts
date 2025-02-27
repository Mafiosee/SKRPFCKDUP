export enum ChequeEvents {
  Cancel = 'cheque:cancel',
  Accept = 'cheque:accept',
}

export type ChequeAcceptPayload = {
  sum: number
}