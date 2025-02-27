export enum ChooseWorkTypeEvents {
  Close = 'chooseWorkType:close',
  Start = 'chooseWorkType:start',
  Dismiss = 'chooseWorkType:dismiss',
}

export type ChooseWorkTypePayload = {
  [ChooseWorkTypeEvents.Close]: undefined
  [ChooseWorkTypeEvents.Start]: {
    workId: any
  }
  [ChooseWorkTypeEvents.Dismiss]: {
    workId: any
  }
}
