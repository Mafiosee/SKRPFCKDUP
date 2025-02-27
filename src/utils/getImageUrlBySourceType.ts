import { SourceType } from '../shared/Images/SourceType'
import { ItemImagesSquad } from '../interfaces/Inventory/assets/items'
import { SkinImages } from '../interfaces/Skins/assets/SkinImages'
import { CasesImages } from '../interfaces/Cases/assets/CasesImages'
import { DonateStoreImages } from '../interfaces/DonateStore/assets/DonateStoreImages'

export const getImageUrlBySourceType = (
  imageName: string,
  sourceType: SourceType = SourceType.DonateStore,
) => {
  switch (sourceType) {
    case SourceType.Inventory:
      return ItemImagesSquad[`${imageName}.png`]
    case SourceType.Skins:
      return SkinImages[`${imageName}.png`]
    case SourceType.Cases:
      return CasesImages[`${imageName}.png`]
    case SourceType.DonateStore:
      return DonateStoreImages[`${imageName}.png`]
    default:
      return ''
  }
}
