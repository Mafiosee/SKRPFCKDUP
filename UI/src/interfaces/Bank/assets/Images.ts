import { importAllImagesFromFolder } from '../../../utils/images'

export const BusinessImages = importAllImagesFromFolder(
  require.context('../../../assets/Business', false, /.png$/),
)

export const LocationImages = importAllImagesFromFolder(
  require.context('../../../assets/Locations', false, /.png$/),
)
