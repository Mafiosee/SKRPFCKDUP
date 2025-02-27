import { importAllImagesFromFolder } from '../../../utils/images'

export const Events = importAllImagesFromFolder(
	require.context('./images/events/', false, /.png$/),
)