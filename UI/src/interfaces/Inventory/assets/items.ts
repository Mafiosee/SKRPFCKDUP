import { importAllImagesFromFolder } from '../../../utils/images'

export const ItemImagesSquad = importAllImagesFromFolder(require.context('../../../assets/Items/Squad', false, /.png$/))
export const ItemImagesInventory = importAllImagesFromFolder(require.context('../../../assets/Items/Inventory', false, /.png$/))
