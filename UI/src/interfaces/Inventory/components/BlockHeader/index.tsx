import React, { useCallback, useEffect, useRef } from 'react'
import './styles.sass'
import { calcVh } from '../../../../utils/calcVh'
import { callClient } from '../../../../utils/api'
import { ItemType, Quality } from '../../../../shared/inventory/itemType'
import { ControlsDefault, ControlsType, Sorts } from '../../types'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { onChangeInput } from '../../../../utils/onChangeInput'

type PropsType = {
	icon: string;
	title: string;
	hasControls?: boolean;
	hasSearch?: boolean;
	controls: ControlsType;
	setControls: (newValues: any) => void;
	tempFilters?: FiltersType;
	setTempFilters?: (newValues: any) => void;
	weight?: { current: number; max: number } | null;
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
	money?: number;
	inputMoney?: {
		value: string | number;
		setValue: (newValue: string | number) => void;
	};
	disabled?: boolean;
};

export type FiltersType = {
	type: {
		[ItemType.Weapon]: boolean;
		[ItemType.Armor]: boolean;
		[ItemType.Backpack]: boolean;
		[ItemType.Potions]: boolean;
		[ItemType.Manuscripts]: boolean;
		[ItemType.Food]: boolean;
		[ItemType.Drinks]: boolean;
		[ItemType.Ingredients]: boolean;
		[ItemType.Resources]: boolean;
		[ItemType.Other]: boolean;
		[ItemType.Accessories]: boolean;
		[ItemType.Clothes]: boolean;
	};
	quality: {
		[Quality.Normal]: boolean;
		[Quality.Unusual]: boolean;
		[Quality.Rare]: boolean;
		[Quality.Epic]: boolean;
		[Quality.Legendary]: boolean;
	};
};

const TypeName: Record<ItemType, string> = {
	[ItemType.Weapon]: 'Оружие',
	[ItemType.Armor]: 'Броня',
	[ItemType.Potions]: 'Зелья',
	[ItemType.Manuscripts]: 'Рукописи',
	[ItemType.Food]: 'Еда',
	[ItemType.Ingredients]: 'Ингридиенты',
	[ItemType.Resources]: 'Ресурсы',
	[ItemType.Other]: 'Разное',
	[ItemType.Accessories]: 'Аксессуары',
	[ItemType.Clothes]: 'Одежда',
	[ItemType.Drinks]: 'Напитки',
	[ItemType.Backpack]: 'Рюкзаки',
}
const QualityName: Record<Quality, string> = {
	[Quality.Unusual]: 'Обычное',
	[Quality.Normal]: 'Необычное',
	[Quality.Rare]: 'Редкое',
	[Quality.Epic]: 'Очень редкое',
	[Quality.Legendary]: 'Легендарное',
}
const SortsName: Record<Sorts, string> = {
	[Sorts.None]: 'Без сортировки',
	[Sorts.Name]: 'По названию',
	[Sorts.Amount]: 'По количеству',
	[Sorts.Quality]: 'По качеству',
}

export const TypesList = [
	ItemType.Weapon,
	ItemType.Armor,
	ItemType.Potions,
	ItemType.Manuscripts,
	ItemType.Food,
	ItemType.Ingredients,
	ItemType.Resources,
	ItemType.Other,
	ItemType.Accessories,
	ItemType.Clothes,
]
export const QualitiesList = [
	Quality.Unusual,
	Quality.Normal,
	Quality.Rare,
	Quality.Epic,
	Quality.Legendary,
]
const SortsList = [Sorts.None, Sorts.Name, Sorts.Amount, Sorts.Quality]

const BlockHeader: React.FC<PropsType> = ({
																						icon,
																						title,
																						hasControls,
																						hasSearch = true,
																						controls,
																						setControls,
																						tempFilters,
																						setTempFilters,
																						weight,
																						accept,
																						button,
																						money = null,
																						inputMoney = null,
																						disabled,
																					}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const closeControls = useCallback(
		() =>
			setControls({
				isOpenSortsList: false,
				isOpenFiltersList: false,
				search: controls.search.trim().length ? controls.search : '',
				isOpenSearch: controls.search.trim().length
					? controls.isOpenSearch
					: false,
			}),
		[controls.isOpenSearch, controls.search, setControls],
	)

	const onClickHandler = useCallback(() => {
		closeControls()
	}, [closeControls])

	useEffect(() => {
		document.addEventListener('click', onClickHandler)
		return () => {
			document.removeEventListener('click', onClickHandler)
		}
	}, [onClickHandler])
	const resetTypeFilter = () => {
		if (setTempFilters == null) {
			return
		}
		setTempFilters({
			type: { ...ControlsDefault.filters.type },
		})
	}
	const resetQualityFilter = () => {
		if (setTempFilters == null) {
			return
		}
		setTempFilters({
			quality: { ...ControlsDefault.filters.quality },
		})
	}

	return (
		<div className='_Inventory_BlockHeader'>
			<div className='icon' style={{ backgroundImage: `url(${icon})` }} />
			<div className='title'>{title}</div>
			<div className='line' />
			{disabled && <div className='disabled'>Недоступно</div>}
			{money != null && (
				<>
					<div className='money'>{numberWithSeparator(money, '.')}</div>
				</>
			)}
			{inputMoney != null && (
				<>
					<div className='inputMoney'>
						<input
							type='text'
							placeholder='Введите сумму'
							value={inputMoney.value}
							onChange={(event) => {
								onChangeInput({
									value: event.target.value,
									setFunc: inputMoney.setValue,
								})
							}}
						/>
						<div className='icon' />
					</div>
				</>
			)}
			{hasControls && (
				<div className='controls'>
					<div className={`sort ${controls.isOpenSearch && '-hidden'}`}>
						<div
							className={`current ${controls.isOpenSortsList && '-opened'}`}
							onClick={(event) => {
								event.stopPropagation()
								setControls({
									isOpenFiltersList: false,
									isOpenSortsList: !controls.isOpenSortsList,
								})
							}}
						>
							<div className='title'>{SortsName[controls.sort]}</div>
							<div className='icon' />
						</div>
						<div
							className={`list ${controls.isOpenSortsList && '-opened'}`}
							style={{
								height: controls.isOpenSortsList
									? calcVh(30 * SortsList.length + 1)
									: 0,
							}}
						>
							{SortsList.map((sortId: Sorts) => {
								const isActive = sortId === controls.sort
								return (
									<div
										key={sortId}
										className={`item ${isActive && '-active'}`}
										onClick={() => {
											if (isActive) {
												return
											}
											setControls({
												isOpenSortsList: false,
												sort: sortId,
											})
										}}
									>
										{SortsName[sortId]}
									</div>
								)
							})}
						</div>
					</div>
					{tempFilters && (
						<div className={`filter ${controls.isOpenSearch && '-hidden'}`}>
							<div
								className={`button -filter ${controls.isOpenFiltersList && '-opened'}`}
								onClick={(event) => {
									event.stopPropagation()
									setControls({
										isOpenSortsList: false,
										isOpenFiltersList: !controls.isOpenFiltersList,
									})
								}}
							/>
							<div
								className={`list ${controls.isOpenFiltersList && '-opened'}`}
								style={{
									height: controls.isOpenFiltersList
										? calcVh(
											10 * 2 + // Отступы сверху и снизу
											38 + // Кнопка "Применить"
											16 * 3 + // Отступы между блоками
											1 + // Разделитель блоков
											22 * 2 + // Заголовки блоков
											12 * 2 + // Отступы между заголовком и блоком
											(TypesList.length + QualitiesList.length) * (22 + 8) - // Элементы списков
											8 * 2, // - Отсутствующие отступы у последних элементов
										)
										: 0,
								}}
								onClick={(event) => event.stopPropagation()}
							>
								<div className='title'>
									<div className='name'>Категория</div>
									<div className='reset' onClick={resetTypeFilter}>
										<div className='text'>Очистить</div>
										<div className='icon' />
									</div>
								</div>
								{TypesList.map((typeId) => {
									const isActive = tempFilters.type[typeId]
									return (
										<div
											key={typeId}
											className='item'
											onClick={() => {
												if (setTempFilters == null) {
													return
												}
												setTempFilters({
													type: {
														...tempFilters.type,
														[typeId]: !tempFilters.type[typeId],
													},
												})
											}}
										>
											<div className={`check ${isActive && '-active'}`} />
											<div className='title'>{TypeName[typeId]}</div>
										</div>
									)
								})}
								<div className='separator' />
								<div className='title'>
									<div className='name'>Качество</div>
									<div className='reset' onClick={resetQualityFilter}>
										<div className='text'>Очистить</div>
										<div className='icon' />
									</div>
								</div>
								{QualitiesList.map((qualityId) => {
									const isActive = tempFilters.quality[qualityId]
									return (
										<div
											key={qualityId}
											className='item'
											onClick={() => {
												if (setTempFilters == null) {
													return
												}
												setTempFilters({
													quality: {
														...tempFilters.quality,
														[qualityId]: !tempFilters.quality[qualityId],
													},
												})
											}}
										>
											<div className={`check ${isActive && '-active'}`} />
											<div className='title'>{QualityName[qualityId]}</div>
										</div>
									)
								})}
								<div
									className='accept'
									onClick={() =>
										setControls({
											filters: tempFilters,
											isOpenFiltersList: false,
										})
									}
								>
									Применить
								</div>
							</div>
						</div>
					)}
					{hasSearch && (
						<div className={`search ${controls.isOpenSearch && '-opened'}`}>
							<div className='button -search'>
								<div
									className='btn'
									onClick={(event) => {
										event.stopPropagation()
										inputRef.current?.focus()
										setControls({
											isOpenSortsList: false,
											isOpenFiltersList: false,
											isOpenSearch: true,
										})
									}}
								/>
								<div className='icon' />
								<input
									type='text'
									placeholder='Название'
									ref={inputRef}
									value={controls.search}
									onChange={(e) => setControls({ search: e.target.value })}
								/>
							</div>
						</div>
					)}
				</div>
			)}
			{weight != null && (
				<div className='weight'>
					{weight.current.toFixed(1)} / {weight.max.toFixed(1)} кг
				</div>
			)}
			{!!accept && (
				<div className={`accept ${accept?.state && '-active'}`}>
					{accept?.state ? accept?.textAccepted : accept?.textDefault}
				</div>
			)}
			{!!button && (
				<div
					className={`button ${button.isDisabled && '-disabled'}`}
					style={{ backgroundImage: `url(${button.bgImage})` }}
					onClick={() => {
						if (button.isDisabled) {
							return
						}
						callClient(button?.event, button?.payload)
					}}
				>
					<div
						className='icon'
						style={{ backgroundImage: `url(${button.icon})` }}
					/>
					<div className='text' style={{ color: button.textColor }}>
						{button?.text}
					</div>
				</div>
			)}
		</div>
	)
}

export default BlockHeader
