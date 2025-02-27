import { importAllImagesFromFolder } from '../../../utils/images'

export const BackgroundImages = importAllImagesFromFolder(
  require.context('../../../assets/ChooseWorkType/backgrounds', false, /.png$/),
)
