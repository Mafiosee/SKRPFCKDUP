import { importAllImagesFromFolder } from '../../../utils/images'

export const Logotypes = importAllImagesFromFolder(
	require.context('./images/logo/', false, /.png$/),
)