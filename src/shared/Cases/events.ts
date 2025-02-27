export enum CasesEvents {
  Close = 'cases:close',
  TakeDrop = 'cases:takeDrop',
  SellDrop = 'cases:sellDrop',
  RequestOpen = 'cases:requestOpen',
}

export type CasesRequestOpenPayload = {
  caseId: any
  amount: number
}
