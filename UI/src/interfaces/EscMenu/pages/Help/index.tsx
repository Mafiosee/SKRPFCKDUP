import './styles.sass'
import React, { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { HelpContent } from '../../../../shared/HelpMenu/Help/config'
import { HelpPagesIds, HelpPagesNames } from '../../../../shared/HelpMenu/Help/types'
import { HelpBackground } from '../../components/HelpBackground'


type Props = {
	isShow: boolean;
};


const Help: React.FC<Props> = ({ isShow }) => {
	const nodeRef = useRef(null)
	const [activePageId, setActivePageId] = useState<HelpPagesIds>(HelpPagesIds.Jobs)
	const [activeSectionIdx, setActiveSectionIdx] = useState(0)
	const [searchValue, setSearchValue] = useState('')
	const [isSearchFocus, setIsSearchFocus] = useState(false)

	const onClickPage = (id: HelpPagesIds) => {
		setActiveSectionIdx(0)
		setActivePageId(id)
	}

	const onClickSection = (idx: number) => {
		setActiveSectionIdx(idx)
	}

	const getPages = () => {
		return (
			<>
				{
					Object.values(HelpPagesIds).map((pageId) => {
						if (typeof pageId === 'string') {
							return null
						}
						return (
							<div
								key={pageId}
								className='page'
								onClick={() => onClickPage(pageId)}
							>
								<div className='name'>{HelpPagesNames[pageId]}</div>
								<div className={`shadow ${activePageId === pageId && '-show'}`} />
								<div className={`active-line ${activePageId === pageId && '-show'}`} />
							</div>
						)
					})
				}
			</>
		)
	}

	/** Help Pages Info */
	const getHelpSections = () => {
		const isHelpPage = activePageId !== HelpPagesIds.GameRules
		if (activePageId == null || !isHelpPage) {
			return
		}
		return HelpContent[activePageId].map((section, idx) => (
			<div
				key={idx}
				className={`section ${activeSectionIdx === idx && '-active'}`}
				onClick={() => onClickSection(idx)}
			>
				<div className='name'>{section.name}</div>
			</div>
		))
	}

	const getContent = () => {
		if (activePageId == null || activePageId === HelpPagesIds.GameRules) {
			return
		}

		const helpPage = HelpContent[activePageId]
		if (!helpPage || helpPage.length <= activeSectionIdx) {
			return
		}

		const content = helpPage[activeSectionIdx]

		return (
			<div className={'content'}>
				<div className='bg'>
					{content?.image != null && (
						<HelpBackground
							image={content.image}
						/>
					)}
				</div>
				<div className='content'>
					<div className='title'>
						{content.name}
					</div>
					<div className='text'>
						{content.description}
					</div>
				</div>
			</div>
		)
	}
	//
	/** Rule Pages Info */
	const getRuleSections = () => {
		if (activePageId == null) {
			return
		}
		const isRulePage = activePageId === HelpPagesIds.GameRules
		const rulePage = HelpContent[HelpPagesIds.GameRules]
		if (!isRulePage) {
			return
		}

		return (
			<>
				<div
					className={`search-container ${isSearchFocus && '-active'}`}
					onClick={() => setIsSearchFocus(true)}
					onBlur={() => setIsSearchFocus(false)}
				>
					<div className='search-content'>
						{!isSearchFocus && <div className='icon' />}
						<input
							type='text'
							placeholder={'Поиск'}
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
					</div>
				</div>
				{rulePage.map((section, idx) => (
					<div
						key={idx}
						className={`section ${activeSectionIdx === idx && '-active'}`}
						onClick={() => onClickSection(idx)}
					>
						<div className='name'>{section.name}</div>
					</div>
				))}
			</>
		)
	}

	const getStringBySubstring = (str: string, substr: string = '') => {
		if (!str || !substr) {
			return str
		}

		const index = str.toLowerCase().indexOf(substr.toLowerCase())
		if (index === -1) {
			return str
		}

		const startTag = '<span>'
		const endTag = '</span>'

		const before = str.substring(0, index)
		const highlighted = str.substring(index, index + substr.length)
		const after = str.substring(index + substr.length)

		return before + startTag + highlighted + endTag + after
	}

	const getRuleContent = () => {
		if (activePageId == null) {
			return
		}
		const isRulePage = activePageId === HelpPagesIds.GameRules
		const rulePage = HelpContent[HelpPagesIds.GameRules]
		if (!isRulePage) {
			return
		}

		return (
			<div className={'content'}>
				<div className='rule-content'>
					{searchValue.length > 0 ? (
						<div className={'search'}>
							<div className='name'>Поиск</div>
							<div className='search-result'>
								<div className='icon' />
								<div className='name'>{'Найдено по запросу:'}</div>
								<div className='result'>{searchValue}</div>
							</div>
						</div>
					) : (
						<div className='title'>
							{rulePage[activeSectionIdx].name}
						</div>
					)}
					<div className='line' />
					<div className='rules'>
						{// @ts-expect-error qwe
							typeof rulePage[activeSectionIdx].description === 'string' ? null : rulePage[activeSectionIdx].description
								.filter(rule => rule.toLowerCase().trim().includes(searchValue.toLowerCase().trim()))
								.map((rule, idx) =>
									<div key={idx} className='rule'>{rule}</div>)
							// .filter((rule) =>
							// 	rule.toLowerCase().includes(searchValue.toLowerCase()),
							// )
							// .map((rule, idx) => (
							// 	<div
							// 		key={idx}
							// 		className={'rule'}
							// 		dangerouslySetInnerHTML={{
							// 			__html: getStringBySubstring(rule, searchValue),
							// 		}}
							// 	/>
							// ))
							// }
						}
					</div>
				</div>
			</div>
		)
	}

	return (
		<CSSTransition
			in={isShow}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='_PageHelp'
			nodeRef={nodeRef}
		>
			<div className='_PageHelp' ref={nodeRef}>
				<div className='title'>Помощь</div>
				<div className='help-content'>
					<div className='pages'>
						{getPages()}
						<div className='line' />
					</div>
					<div className='content'>
						<div className='help-sections'>
							{getHelpSections()}
							{getRuleSections()}
						</div>
						<div className='section-content'>
							{getContent()}
							{getRuleContent()}
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}

export default Help