import { importAllImagesFromFolder } from '../../../utils/images'

export const DonateStoreVideos = importAllImagesFromFolder(
  require.context('../../../assets/DonateStoreVideos/', false, /.webm$/),
)
