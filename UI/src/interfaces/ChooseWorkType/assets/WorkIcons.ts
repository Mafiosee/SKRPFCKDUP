import { importAllImagesFromFolder } from '../../../utils/images'

export const WorkIcons = importAllImagesFromFolder(
  require.context('../../../assets/ChooseWorkType/icons', false, /.svg$/),
)
