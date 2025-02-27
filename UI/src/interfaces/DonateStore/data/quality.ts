import { Quality } from '../../../shared/inventory/itemType'

export const QualityColor: Record<Quality, string> = {
  [Quality.Normal]: '#284F2C',
  [Quality.Unusual]: '#4E4E4E',
  [Quality.Rare]: '#385773',
  [Quality.Epic]: '#764792',
  [Quality.Legendary]: '#9E8A24',
}

export const SkinQualityColor: Record<Quality, string> = {
  [Quality.Normal]: '#40E950',
  [Quality.Unusual]: '#808080',
  [Quality.Rare]: '#40A4FF',
  [Quality.Epic]: '#B841FF',
  [Quality.Legendary]: '#FFDA1E',
}

export const QualityName: Record<Quality, string> = {
  [Quality.Normal]: 'Простое',
  [Quality.Unusual]: 'Обычное',
  [Quality.Rare]: 'Редкое',
  [Quality.Epic]: 'Эпическое',
  [Quality.Legendary]: 'Легендарное',
}

export const QualityNoShadowIcon: Record<Quality, string> = {
  [Quality.Unusual]: require('../assets/images/qualityIcons/unusual-no-shadow.svg'),
  [Quality.Normal]: require('../assets/images/qualityIcons/normal-no-shadow.svg'),
  [Quality.Rare]: require('../assets/images/qualityIcons/rare-no-shadow.svg'),
  [Quality.Epic]: require('../assets/images/qualityIcons/epic-no-shadow.svg'),
  [Quality.Legendary]: require('../assets/images/qualityIcons/legendary-no-shadow.svg'),
}

export const QualityIconShadow: Record<Quality, string> = {
  [Quality.Normal]: 'radial-gradient(50% 50% at 50% 50%, transparent, #399241)',
  [Quality.Unusual]:
    'radial-gradient(50% 50% at 50% 50%, transparent, #515151)',
  [Quality.Rare]: 'radial-gradient(50% 50% at 50% 50%, transparent, #3494E8)',
  [Quality.Epic]: 'radial-gradient(50% 50% at 50% 50%, transparent, #6A2A8F)',
  [Quality.Legendary]:
    'radial-gradient(50% 50% at 50% 50%, transparent, #FFD912)',
}
