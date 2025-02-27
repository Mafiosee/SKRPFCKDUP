import './styles.sass'
import React, { useEffect, useState } from 'react'
import Grid from '../Grid'
import BlockHeader, { FiltersType } from '../BlockHeader'
import { Grids, GridType } from '../../../../shared/inventory/inventoryType'
import { ActionsList, ControlsDefault, ControlsType, DragInfo, HoverInfo } from '../../types'

type PropsType = {
	icon: string;
	title: string;
	grid: GridType;
	gridId: Grids;
	maxHeight: number;
	drag?: {
		info: DragInfo;
		set: (info: DragInfo) => void;
	};
	hover: {
		info: HoverInfo;
		set: (info: HoverInfo) => void;
	};
	noInfo?: {
		icon: string;
		title: string;
		helper: string;
	};
	hasControls?: boolean;
	accept?: {
		state: boolean;
		textDefault: string;
		textAccepted: string;
	};
	button?: {
		icon: any;
		bgImage: any;
		text: string;
		textColor: string;
		event: string;
		isDisabled?: boolean;
		payload?: any;
	};
	setActionsList?: (info: ActionsList) => void;
	money?: number;
	inputMoney?: {
		value: string | number;
		setValue: (newValue: '' | number) => void;
	};
};

const GridBlock: React.FC<PropsType> = ({
																					icon,
																					title,
																					grid,
																					gridId,
																					maxHeight,
																					drag,
																					hover,
																					noInfo,
																					hasControls,
																					accept,
																					button,
																					setActionsList,
																					money,
																					inputMoney,
																				}) => {
	const [controls, setControls] = useState<ControlsType>({
		...ControlsDefault,
	})
	const [tempFilters, setTempFilters] = useState<FiltersType>({
		...ControlsDefault.filters,
	})

	useEffect(() => {
		if (controls.isOpenFiltersList) {
			setTempFilters({ ...controls.filters })
		} else {
			setTempFilters({ ...ControlsDefault.filters })
		}
	}, [controls.isOpenFiltersList])

	const itemsWeight = !grid.maxWeight
		? null
		: grid.items.reduce((acc, item) => acc + (item?.weight ?? 0) * (item?.amount ?? 1), 0)

	return (
		<div className='_Inventory_GridBlock'>
			<BlockHeader
				icon={icon}
				title={grid?.title ?? title}
				hasControls={hasControls}
				controls={controls}
				setControls={(newValues) => {
					setControls((prev) => ({ ...prev, ...newValues }))
				}}
				tempFilters={tempFilters}
				setTempFilters={(newValues) =>
					setTempFilters((prev) => ({ ...prev, ...newValues }))
				}
				weight={
					itemsWeight == null || money != null || inputMoney != null
						? null
						: { current: itemsWeight, max: grid.maxWeight ?? 0 }
				}
				accept={accept}
				button={button}
				money={money}
				inputMoney={inputMoney}
				disabled={!!noInfo}
			/>
			<Grid
				grid={grid}
				gridId={gridId}
				drag={drag}
				noInfo={noInfo}
				hover={hover}
				maxHeight={maxHeight}
				controls={controls}
				setActionsList={setActionsList}
			/>
		</div>
	)
}

export default GridBlock
