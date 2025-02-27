import { importAllImagesFromFolder } from '../../../utils/images'

export const Backgrounds = Object.values(
  importAllImagesFromFolder(
    require.context('../../../assets/Loading/', false, /.png/),
  ),
)
