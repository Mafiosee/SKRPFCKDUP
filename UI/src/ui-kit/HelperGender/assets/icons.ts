import { Gender } from '../../../shared/characterEditor/enums/Genders'

export const IconUrl: Record<Gender, string> = {
  [Gender.Male]: require('./images/male.svg'),
  [Gender.Female]: require('./images/female.svg'),
}
