export enum BankEvents {
  Close = 'bank:close',
  Replenish = 'bank:replenish',
  Withdraw = 'bank:withdraw',
  PayRentHouse = 'bank:payRentHouse',
  PayRentBusiness = 'bank:payRentBusiness',
  WithdrawFaction = 'bank:withdrawFaction',
  BusinessWithdraw = 'bank:businessWithdraw',
  BusinessReplenish = 'bank:businessReplenish',
}

export type BankPayloads = {
  [BankEvents.Close]: undefined
  [BankEvents.Replenish]: {
    sum: number
  }
  [BankEvents.Withdraw]: {
    sum: number
  }
  [BankEvents.PayRentHouse]: {
    days: number
  }
  [BankEvents.PayRentBusiness]: {
    days: number
  }
  [BankEvents.WithdrawFaction]: {
    sum: number
  }
  [BankEvents.BusinessWithdraw]: {
    sum: number
  }
  [BankEvents.BusinessReplenish]: {
    sum: number
  }
}
