import { importAllImagesFromFolder } from '../../../utils/images'

export const AdminPanelHudBackgroundsImages = importAllImagesFromFolder(
	require.context('./images/backgroundImages', false, /.svg$/)
)
