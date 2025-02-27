import { importAllImagesFromFolder } from '../../../utils/images'

export const BlipIcons = importAllImagesFromFolder(
	require.context('../../../assets/Map/blips/', false, /.svg$/),
)
