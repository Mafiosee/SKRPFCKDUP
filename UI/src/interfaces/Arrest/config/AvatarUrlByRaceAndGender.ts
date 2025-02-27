import { Race } from '../../../shared/Race/type'
import { Gender } from '../../../shared/characterEditor/enums/Genders'

export const AvatarUrlByRaceAndGender: Record<Race, Record<Gender, string>> = {
  [Race.Argonian]: {
    [Gender.Male]: require('../assets/images/races/argonian-male.png'),
    [Gender.Female]: require('../assets/images/races/argonian-female.png'),
  },
  [Race.Breton]: {
    [Gender.Male]: require('../assets/images/races/breton-male.png'),
    [Gender.Female]: require('../assets/images/races/breton-female.png'),
  },
  [Race.DarkElf]: {
    [Gender.Male]: require('../assets/images/races/dark-elf-male.png'),
    [Gender.Female]: require('../assets/images/races/dark-elf-female.png'),
  },
  [Race.HighElf]: {
    [Gender.Male]: require('../assets/images/races/high-elf-male.png'),
    [Gender.Female]: require('../assets/images/races/high-elf-female.png'),
  },
  [Race.Imperial]: {
    [Gender.Male]: require('../assets/images/races/imperial-male.png'),
    [Gender.Female]: require('../assets/images/races/imperial-female.png'),
  },
  [Race.Khajit]: {
    [Gender.Male]: require('../assets/images/races/khajit-male.png'),
    [Gender.Female]: require('../assets/images/races/khajit-female.png'),
  },
  [Race.Nord]: {
    [Gender.Male]: require('../assets/images/races/nord-male.png'),
    [Gender.Female]: require('../assets/images/races/nord-female.png'),
  },
  [Race.Orc]: {
    [Gender.Male]: require('../assets/images/races/orc-male.png'),
    [Gender.Female]: require('../assets/images/races/orc-female.png'),
  },
  [Race.Redguard]: {
    [Gender.Male]: require('../assets/images/races/redguard-male.png'),
    [Gender.Female]: require('../assets/images/races/redguard-female.png'),
  },
  [Race.WoodElf]: {
    [Gender.Male]: require('../assets/images/races/wood-elf-male.png'),
    [Gender.Female]: require('../assets/images/races/wood-elf-female.png'),
  },
}
