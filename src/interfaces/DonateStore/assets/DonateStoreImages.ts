import { importAllImagesFromFolder } from '../../../utils/images'

export const DonateStoreImages = importAllImagesFromFolder(
  require.context('../../../assets/DonateStore/', false, /.png$/),
)
