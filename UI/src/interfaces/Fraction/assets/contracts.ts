import { importAllImagesFromFolder } from '../../../utils/images'

export const ContractBackgrounds = importAllImagesFromFolder(
	require.context('./images/contracts/backgrounds/', false, /.png$/),
)

export const ContractIcons = importAllImagesFromFolder(
	require.context('./images/contracts/icons/', false, /.svg$/)
)