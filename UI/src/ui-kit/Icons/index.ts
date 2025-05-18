import React from 'react'
import IconPlus from './Plus'
import IconCoinSeptim from './CoinSeptim'
import IconArrest from './Arrest'
import IconSearch from './Search'
import IconSort from './Sort'
import IconMinus from './Minus'
import IconArrowUp from './ArrowUp'
import IconArrowDown from './ArrowDown'
import IconTrash from './Trash'
import IconCategories from './Categories'

export enum Icon {
  Plus = 'Plus',
  Minus = 'Minus',
  CoinSeptim = 'CoinSeptim',
  Arrest = 'Arrest',
  Search = 'Search',
  Sort = 'Sort',
  Trash = 'Trash',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Categories = 'Categories',
}

export const IconComponent: Record<Icon, React.FC<{ color?: string }>> = {
  [Icon.Plus]: IconPlus,
  [Icon.Minus]: IconMinus,
  [Icon.CoinSeptim]: IconCoinSeptim,
  [Icon.Arrest]: IconArrest,
  [Icon.Search]: IconSearch,
  [Icon.Sort]: IconSort,
  [Icon.Trash]: IconTrash,
  [Icon.ArrowUp]: IconArrowUp,
  [Icon.ArrowDown]: IconArrowDown,
  [Icon.Categories]: IconCategories,
}
