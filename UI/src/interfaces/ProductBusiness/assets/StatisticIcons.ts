import { importAllImagesFromFolder } from '../../../utils/images'

export const StatisticIcons = importAllImagesFromFolder(
  require.context(
    '../../../assets/ProductBusinesses/StatisticIcons/',
    false,
    /.svg$/,
  ),
)
