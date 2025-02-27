import { VipType } from '../../../shared/Vip/types'

export enum IconsNames {
  Balance,
  Warn,
  House,
  Guild,
  Location,
  Business,
  Star,
}

export const Icons = {
  [IconsNames.Balance]: require('./images/icons/balance.svg'),
  [IconsNames.Warn]: require('./images/icons/warn.svg'),
  [IconsNames.House]: require('./images/icons/house.svg'),
  [IconsNames.Guild]: require('./images/icons/guild.svg'),
  [IconsNames.Location]: require('./images/icons/location.svg'),
  [IconsNames.Business]: require('./images/icons/settings.svg'),
  [IconsNames.Star]: require('./images/icons/star.svg'),
}

export enum CardNames {
  Location,
  House,
  Business,
  Guild,
  Vip,
}

export const CardBG = {
  [CardNames.House]: {
    inactive: require('./images/character/house-inactive.png'),
    active: require('./images/character/house-active.png'),
  },
  [CardNames.Business]: {
    inactive: require('./images/character/business-inactive.png'),
    active: require('./images/character/business-active.png'),
  },
  [CardNames.Guild]: {
    inactive: require('./images/character/guild-inactive.png'),
    active: require('./images/character/guild-active.png'),
  },
  [CardNames.Location]: {
    active: require('./images/character/location-active.png'),
  },
  [CardNames.Vip]: {
    [VipType.BASIC]: require('./images/character/vip-started.png'),
    [VipType.ADVANCED]: require('./images/character/vip-limited.png'),
    [VipType.MAXIMUM]: require('./images/character/vip-legendary.png'),
    ['inactive']: require('./images/character/vip-inactive.png'),
  },
}
