import React from 'react'
import IconPlus from './Plus'
import IconCoinSeptim from './CoinSeptim'
import IconArrest from './Arrest'

export enum Icon {
  Plus = 'Plus',
  CoinSeptim = 'CoinSeptim',
  Arrest = 'Arrest',
}

export const IconComponent: Record<Icon, React.FC<{ color?: string }>> = {
  [Icon.Plus]: IconPlus,
  [Icon.CoinSeptim]: IconCoinSeptim,
  [Icon.Arrest]: IconArrest,
}
