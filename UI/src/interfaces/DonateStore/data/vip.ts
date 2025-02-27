import { VipType } from '../../../shared/Vip/types'

export const VipsInfo: Record<VipType, { name: string; color: string }> = {
  [VipType.BASIC]: {
    name: 'Started',
    color: '#4C80AE',
  },
  [VipType.ADVANCED]: {
    name: 'Limited',
    color: '#6A2A8F',
  },
  [VipType.MAXIMUM]: {
    name: 'Legendary',
    color: '#DEBA00',
  },
}
