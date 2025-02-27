type Position = { x: number, y: number }

export enum Side {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

type Link = {
  from: Side
  to: {
    upgradeId: any
    side: Side
  }
}

export enum UpgradeCondition {
  Unavailable,
  Available,
  Unlocked,
}

export type Upgrade = {
  id: any
  name: string
  description: string
  condition: UpgradeCondition
  requirements: { title: string, value: string }[]
  price: {
    reputation: number
    money: number
  }
  position: Position
  links: Link[]
}

export const StartPointId = 'StartPoint'