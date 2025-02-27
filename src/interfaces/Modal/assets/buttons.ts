import {ButtonColor} from "../../../shared/Modal/Component/Buttons";

export const ButtonBackgrounds: Record<ButtonColor, { small: string, large: string }> = {
  [ButtonColor.White]: {
    small: require('./images/buttonBackgrounds/white-s.svg'),
    large: require('./images/buttonBackgrounds/white-l.svg'),
  },
  [ButtonColor.Red]: {
    small: require('./images/buttonBackgrounds/red-s.svg'),
    large: require('./images/buttonBackgrounds/red-l.svg'),
  },
  [ButtonColor.Transparent]: {
    small: require('./images/buttonBackgrounds/transparent-s.svg'),
    large: require('./images/buttonBackgrounds/transparent-l.svg'),
  },
}