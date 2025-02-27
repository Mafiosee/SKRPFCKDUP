import { importAllImagesFromFolder } from '../../../utils/images'

export const AdditionalImages = importAllImagesFromFolder(
	// @ts-expect-error qwe
	require.context('./images/additional/', false, /.png$/)
)
