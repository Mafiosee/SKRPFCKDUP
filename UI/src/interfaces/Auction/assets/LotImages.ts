import { LotType } from '../../../shared/Auction/LotType'
import { importAllImagesFromFolder } from '../../../utils/images'

export const getImageByLotType = (lotType: LotType) => {
  switch (lotType) {
    case LotType.Business: {
      return importAllImagesFromFolder(
        require.context('../../../assets/Business', false, /.png$/),
      )
    }
    
    case LotType.House: {
      return importAllImagesFromFolder(
        require.context('../../../assets/Locations', false, /.png$/),
      )
    }

    case LotType.FamilyHouse: {
      return importAllImagesFromFolder(
        require.context('../../../assets/Locations', false, /.png$/),
      )
    }
  }
}