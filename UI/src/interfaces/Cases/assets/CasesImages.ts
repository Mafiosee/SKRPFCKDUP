import { importAllImagesFromFolder } from '../../../utils/images'

export const CasesImages = importAllImagesFromFolder(
  require.context('../../../assets/Cases/', false, /.png$/),
)
