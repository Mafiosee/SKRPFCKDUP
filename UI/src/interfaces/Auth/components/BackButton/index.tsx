import './styles.sass'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { PageId } from '../../../../shared/Auth/pageId'
import { authActions } from '../../reducer'
import { callClient } from '../../../../utils/api'
import { AuthEvents } from '../../../../shared/Auth/events'

enum ButtonType {
	Red,
	Transparent,
}

const ButtonInfo: Record<
	ButtonType,
	{ backgroundImage: string; text: string }
> = {
	[ButtonType.Red]: {
		backgroundImage: require('../../assets/images/backButton-red.svg'),
		text: 'Покинуть игру',
	},
	[ButtonType.Transparent]: {
		backgroundImage: require('../../assets/images/backButton-transparent.svg'),
		text: 'На главную',
	},
}

const BackButton = () => {
	const dispatch = useAppDispatch()
	const { page } = useAppSelector(state => state.auth)

	let buttonType: ButtonType = ButtonType.Transparent
	if (page === PageId.SignIn || page === PageId.KickBan) {
		buttonType = ButtonType.Red
	}

	const buttonInfo = ButtonInfo[buttonType]

	return (
		<div
			className={`_BackButton ${page !== PageId.Disclaimer && '-show'}`}
			style={{
				backgroundImage: `url(${buttonInfo.backgroundImage})`,
			}}
			onClick={() => {
				switch (page) {
					case PageId.SignIn:
					case PageId.KickBan:
						callClient(AuthEvents.Exit)
						break

					case PageId.Queue:
						callClient(AuthEvents.ExitQueue)
						dispatch(authActions.setPage(PageId.SignIn))
						break

					default:
						dispatch(authActions.setPage(PageId.SignIn))
						break
				}
			}}
		>
			{buttonInfo.text}
		</div>
	)
}

export default BackButton
