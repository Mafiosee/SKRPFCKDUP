import './styles.sass'
import React, { ReactElement, useEffect, useRef } from 'react'
import { PageType } from '../../../../shared/Fraction/PageType'
import { useAppSelector } from '../../../../hooks/redux'
import { Page, PagesOrder } from '../../../../shared/Fraction/page'

type Props = {
	page: PageType | null
	setPage: (page: PageType) => void
}

const Navbar: React.FC<Props> = ({ page, setPage }) => {
	const { pages } = useAppSelector(state => state.fraction)
	const activeRef = useRef<HTMLDivElement>(null)

	const getPages = () => {
		const result: ReactElement[] = []

		for (let i = 0; i < PagesOrder.length; i++) {
			const pageType = PagesOrder[i]
			const foundPage = pages.find(el => el.type === pageType)
			if (foundPage != null) {
				const { type, name } = foundPage
				const isActive = type === page
				const setActive = () => setPage(type)

				result.push(
					<div
						key={type}
						ref={isActive ? activeRef : null}
						className={`page ${isActive && '-active'}`}
						onClick={setActive}
					>
						<div className='content'>{name}</div>
						<div className='name'>{name}</div>
					</div>,
				)
			}
		}

		return result
	}

	useEffect(() => {
		if (pages === null || activeRef.current === null) {
			return
		}
		activeRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
	}, [page, pages])

	const changePage = (diff: number) => {
		// @ts-expect-error qwe
		const pagesList = PagesOrder.filter(pageType => pages.some(el => el.type === pageType) !== -1)
		const currentIndex = pagesList.findIndex(pageType => pageType === page)
		if (!~currentIndex) {
			return
		}
		const lastIndex = pagesList.length - 1
		const newIndex = currentIndex + diff
		if (newIndex < 0 || newIndex > lastIndex) {
			return
		}
		setPage(pagesList[newIndex])
	}

	return (
		<div className='_Navbar'>
			<div className='arrow -left' onClick={() => changePage(-1)} />
			<div className='list'>{getPages()}</div>
			<div className='arrow -right' onClick={() => changePage(1)} />
		</div>
	)
}

export default Navbar
