import { importAllImagesFromFolder } from '../../../utils/images'

export const SkinImages = importAllImagesFromFolder(
  require.context('../../../assets/Skins/', false, /.png$/),
)
