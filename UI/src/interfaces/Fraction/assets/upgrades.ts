import {UpgradeCondition} from "../../../shared/Fraction/Upgrade";

export const UpgradeBackground: Record<UpgradeCondition, string> = {
  [UpgradeCondition.Unavailable]: require('./images/PageUpgrades/upgrade-unavailable.svg'),
  [UpgradeCondition.Available]: require('./images/PageUpgrades/upgrade-available.svg'),
  [UpgradeCondition.Unlocked]: require('./images/PageUpgrades/upgrade-unlocked.svg'),
}

export const UpgradeHover: Record<UpgradeCondition, string> = {
  [UpgradeCondition.Unavailable]: require('./images/PageUpgrades/upgrade-available-hover.svg'),
  [UpgradeCondition.Available]: require('./images/PageUpgrades/upgrade-available-hover.svg'),
  [UpgradeCondition.Unlocked]: require('./images/PageUpgrades/upgrade-unlocked-hover.svg'),
}