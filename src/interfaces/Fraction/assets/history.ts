import { importAllImagesFromFolder } from '../../../utils/images'

export const HistoryBackgrounds = importAllImagesFromFolder(
	require.context('./images/history/', false, /.png$/),
)