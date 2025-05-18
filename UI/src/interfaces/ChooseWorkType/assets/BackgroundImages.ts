import { importAllImagesFromFolder } from '../../../utils/images'

export const BackgroundImages = importAllImagesFromFolder(
  require.context('../../../assets/ChooseWorkType/backgrounds', false, /.png$/),
)

export const CharacterImages = importAllImagesFromFolder(
  require.context('../../../assets/ChooseWorkType/characters', false, /.png$/),
)
