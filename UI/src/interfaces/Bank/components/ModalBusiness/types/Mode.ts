export enum Mode {
  Replenish = 'Replenish',
  Withdraw = 'Withdraw',
}

export const ModeName: Record<Mode, string> = {
  [Mode.Replenish]: 'Пополнить',
  [Mode.Withdraw]: 'Снять',
}
