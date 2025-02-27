import { importAllImagesFromFolder } from '../../../utils/images'

export const WorkBackgrounds = importAllImagesFromFolder(
  require.context('../../../assets/ChooseWorkType/works', false, /.png$/),
)
