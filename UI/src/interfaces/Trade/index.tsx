import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { InterfacesId } from '../../utils/interfacesId'
import { notificationsActions } from '../Notifications/reducer'
import Frame from '../Inventory/components/Frame'
import GridBlock from '../Inventory/components/GridBlock'
import { BlockIcons } from '../Inventory/assets/icons'
import {
	ActionsList,
	DragInfo,
	dragInfoDefault,
	HoverInfo,
	hoverInfoDefault,
	noBackpackGrid,
} from '../Inventory/types'
import Drag from '../Inventory/components/Drag'
import Hover from '../Inventory/components/Hover'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { tradeActions } from './reducer'
import ActionsListC from '../Inventory/components/ActionsList'
import {
	BlockHeaderButtonBackground,
	BlockHeaderButtonIcons,
} from '../Inventory/assets/blockHeader'
import {
	ConfirmStates,
	TradeAcceptPayload,
	TradeEvents,
} from '../../shared/inventory/events'
import { Grids } from '../../shared/inventory/inventoryType'
import { TimeoutRef } from '../../types/timeoutRef'
import { useEscClose } from '../../hooks/useEscClose'
import useSound from 'use-sound'

const ConfirmButtonText = {
	[ConfirmStates.Wait]: 'Подтвердить',
	[ConfirmStates.Confirmed]: 'Отменить',
}

const Trade = () => {
	const dispatch = useAppDispatch()
	const {
		isOpen,
		traderName,
		give,
		receive,
		isAccepted,
		confirmState,
		receiveMoney,
		giveMoney,
	} = useAppSelector((state) => state.trade)
	const { inventory, hasBackpack, backpack } = useAppSelector(
		(state) => state.inventory,
	)
	const { sfxBase } = useAppSelector(state => state.volume)
	const nodeRef = useRef(null)
	const [dragInfo, setDragInfo] = useState<DragInfo>({ ...dragInfoDefault })
	const [hoverInfo, setHoverInfo] = useState<HoverInfo>({
		...hoverInfoDefault,
	})
	const [actionsList, setActionsList] = useState<ActionsList>({
		itemId: null,
		from: { gridId: Grids.Inventory, position: { x: 0, y: 0 } },
		actions: [],
		position: { x: 0, y: 0 },
	})

	const [giveSum, setGiveSum] = useState<number | ''>('')
	const [playOpenInterfaceSfx] = useSound(require('../../assets/sounds/open_interface_0.mp3'), { volume: sfxBase })
	const [playCloseInterfaceSfx] = useSound(require('../../assets/sounds/close_interface_0.mp3'), { volume: sfxBase })

	useEscClose({ isOpenInterface: isOpen, closeEvent: TradeEvents.Close })

	// useEffect(() => {
	// 	setTimeout(() => dispatch(tradeActions.show()), 150)
	// }, [dispatch])

	// обновление
	useEffect(() => {
		setGiveSum('')
	}, [isOpen])

	useEffect(() => {
		if (isOpen) {
			playOpenInterfaceSfx()
		} else {
			playCloseInterfaceSfx()
			dispatch(notificationsActions.removeFromInterface(InterfacesId.Trade))
		}
	}, [dispatch, isOpen])

	useEffect(() => {
		const clickHandler = () => {
			setActionsList({
				itemId: null,
				from: { gridId: Grids.Inventory, position: { x: 0, y: 0 } },
				actions: [],
				position: { x: 0, y: 0 },
			})
		}
		if (isOpen) {
			document.addEventListener('click', clickHandler)
		}
		return () => {
			document.removeEventListener('click', clickHandler)
		}
	}, [isOpen])

	useEffect(() => {
		const mouseUpHandler = () => {
			setDragInfo({ ...dragInfoDefault })
			setHoverInfo({ ...hoverInfoDefault })
		}

		if (isOpen) {
			document.addEventListener('mouseup', mouseUpHandler)
		}
		return () => {
			document.removeEventListener('mouseup', mouseUpHandler)
		}
	}, [isOpen])

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const { keyCode } = event
			switch (keyCode) {
				case KeyCodes.R: {
					if (dragInfo.itemId === null) {
						return
					}
					setDragInfo((prev) => ({ ...prev, isTurned: !prev.isTurned }))
				}
			}
		},
		[dragInfo],
	)

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keyup', handleKeyDown)
		}
		return () => {
			document.removeEventListener('keyup', handleKeyDown)
		}
	}, [handleKeyDown, isOpen])

	const drag = {
		info: dragInfo,
		set: (info: DragInfo) => setDragInfo(info),
	}
	const hover = {
		info: hoverInfo,
		set: (info: HoverInfo) => setHoverInfo(info),
	}
	const FullItems = [
		...inventory.items,
		...(hasBackpack && backpack != null ? backpack.items : []),
		...give.items,
		...receive.items,
	]

	const giveAcceptPayload: TradeAcceptPayload = { giveMoney: +giveSum }

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='Trade'
			nodeRef={nodeRef}
		>
			<div className='Trade' ref={nodeRef}>
				<Drag info={dragInfo} items={FullItems} />
				<Hover info={hoverInfo} items={FullItems} drag={drag} />
				<div className='window'>
					<div className='body'>
						<Frame title={`Обмен с ${traderName}`} closeEvent={TradeEvents.Close} />
						<div className='content'>
							<div className='col -inventory'>
								<GridBlock
									icon={BlockIcons.Inventory}
									title='Инвентарь'
									grid={inventory}
									gridId={Grids.Inventory}
									maxHeight={4}
									drag={drag}
									hover={hover}
									setActionsList={setActionsList}
								/>
								<GridBlock
									icon={BlockIcons.Backpack}
									title='Рюкзак'
									grid={
										hasBackpack && backpack != null ? backpack : noBackpackGrid
									}
									gridId={Grids.Backpack}
									maxHeight={4}
									drag={drag}
									hover={hover}
									noInfo={
										hasBackpack && backpack != null
											? undefined
											: {
												icon: BlockIcons.NoBackpack,
												title: 'Рюкзак отсутствует',
												helper: 'Его можно приобрести в магазине',
											}
									}
									setActionsList={setActionsList}
								/>
							</div>
							<div className='col'>
								<GridBlock
									icon={BlockIcons.Give}
									title='Вы отдаёте'
									inputMoney={
										confirmState === ConfirmStates.Wait
											? {
												value: giveSum,
												setValue: setGiveSum,
											}
											: undefined
									}
									money={
										confirmState === ConfirmStates.Confirmed
											? giveMoney
											: undefined
									}
									grid={give}
									gridId={Grids.TradeGive}
									maxHeight={4}
									drag={drag}
									hover={hover}
									button={{
										icon:
											confirmState === ConfirmStates.Wait
												? BlockHeaderButtonIcons.Check
												: BlockHeaderButtonIcons.Cross,
										bgImage:
											confirmState === ConfirmStates.Wait
												? BlockHeaderButtonBackground.White
												: BlockHeaderButtonBackground.Red,
										text: ConfirmButtonText[confirmState],
										textColor:
											confirmState === ConfirmStates.Wait ? '#000' : '#fff',
										event:
											confirmState === ConfirmStates.Wait
												? TradeEvents.Accept
												: TradeEvents.Cancel,
										payload: giveAcceptPayload,
									}}
								/>
								<GridBlock
									icon={BlockIcons.Take}
									title='Вы получаете'
									money={receiveMoney ?? undefined}
									grid={receive}
									gridId={Grids.TradeReceive}
									maxHeight={4}
									hover={hover}
									accept={{
										state: isAccepted,
										textDefault: 'Игрок не подтвердил',
										textAccepted: 'Игрок подтвердил',
									}}
									setActionsList={setActionsList}
								/>
							</div>
						</div>
					</div>
				</div>
				<ActionsListC
					actionsList={actionsList}
					eventName={TradeEvents.ItemAction}
				/>
			</div>
		</CSSTransition>
	)
}

export default Trade
