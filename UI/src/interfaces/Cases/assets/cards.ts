import {Quality} from "../../../shared/inventory/itemType";

export const CardBackgrounds: Record<Quality, { idle: string, hover: string, active: string }> = {
  [Quality.Normal]: {
    idle: require('./images/cases/unusual.svg'),
    hover: require('./images/cases/unusual-hover.svg'),
    active: require('./images/cases/unusual-active.svg'),
  },
  [Quality.Unusual]: {
    idle: require('./images/cases/normal.svg'),
    hover: require('./images/cases/normal-hover.svg'),
    active: require('./images/cases/normal-active.svg'),
  },
  [Quality.Rare]: {
    idle: require('./images/cases/rare.svg'),
    hover: require('./images/cases/rare-hover.svg'),
    active: require('./images/cases/rare-active.svg'),
  },
  [Quality.Epic]: {
    idle: require('./images/cases/epic.svg'),
    hover: require('./images/cases/epic-hover.svg'),
    active: require('./images/cases/epic-active.svg'),
  },
  [Quality.Legendary]: {
    idle: require('./images/cases/legendary.svg'),
    hover: require('./images/cases/legendary-hover.svg'),
    active: require('./images/cases/legendary-active.svg'),
  },
}