import React, { useMemo } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import inventoryShared from '../../shared/inventory/Items'
import { ItemImagesSquad } from '../Inventory/assets/items'
import { QualityNoShadowIcon } from '../DonateStore/data/quality'
import { Quality } from '../../shared/inventory/itemType'
import { QualityNames } from '../Inventory/data'

const QualityBackground: Record<Quality, string> = {
	[Quality.Unusual]: require('./assets/background_unusual.svg'),
	[Quality.Normal]: require('./assets/background_normal.svg'),
	[Quality.Rare]: require('./assets/background_rare.svg'),
	[Quality.Epic]: require('./assets/background_epic.svg'),
	[Quality.Legendary]: require('./assets/background_legendary.svg'),
}

const QualityColor: Record<Quality, string> = {
	[Quality.Unusual]: '#717171',
	[Quality.Normal]: '#2F9939',
	[Quality.Rare]: '#649ACB',
	[Quality.Epic]: '#A74FDB',
	[Quality.Legendary]: '#DBBC25',
}

const PickupItem: React.FC = () => {
	const { isOpen, position, itemHash, itemAmount } = useAppSelector(state => state.pickupItem)

	const item = useMemo(() => inventoryShared.get(itemHash), [itemHash])

	return isOpen && item ? (
		<div className='PickupItem'
				 style={{ top: position.y, left: position.x, backgroundImage: `url(${QualityBackground[item.info.quality]})` }}>
			<div className='image' style={{ backgroundImage: `url(${ItemImagesSquad[`${item.image}.png`]})` }}>
				<div className='amount'>x{itemAmount}</div>
			</div>
			<div className='info'>
				<div className='name'>{item.info.name}</div>
				<div className='quality'>
					<div className='icon' style={{ backgroundImage: `url(${QualityNoShadowIcon[item.info.quality]})` }} />
					<div className='name' style={{ color: QualityColor[item.info.quality] }}>
						{QualityNames[item.info.quality]}
					</div>
				</div>
			</div>
		</div>
	) : null
}

export default PickupItem
