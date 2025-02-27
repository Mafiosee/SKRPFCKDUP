import './styles.sass'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { CSSTransition } from 'react-transition-group'
import { authActions } from './reducer'
import { PageId } from '../../shared/Auth/pageId'
import Logo from './components/Logo'
import BackButton from './components/BackButton'
import PageDisclaimer from './pages/Disclaimer'
import PageSignIn from './pages/SignIn'
import PageSignUp from './pages/SignUp'
import PageRecoveryMail from './pages/RecoveryMail'
import PageRecoveryCode from './pages/RecoveryCode'
import PageRecoveryPassword from './pages/RecoveryPassword'
import PageQueue from './pages/Queue'
import { callClient } from '../../utils/api'
import { AuthCheckRememberedPayload, AuthEvents, AuthSetIp } from '../../shared/Auth/events'
import { TimeoutRef } from '../../types/timeoutRef'

const Auth = () => {
	const dispatch = useAppDispatch()
	const { isOpen, page } = useAppSelector((state) => state.auth)
	const nodeRef = useRef(null)
	const [tick, setTick] = useState(false)
	const tickTimeout = useRef<TimeoutRef>(null)

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		dispatch(authActions.show(0))
	// 		setTimeout(() => {
	// 			dispatch(authActions.setPage(PageId.SignIn))
	// 		}, 100)
	// 	}, 150)
	// }, [])

	useEffect(() => {
		if (!isOpen) {
			return
		}
		fetch('https://api.ipify.org/')
			.then((response) => response.text())
			.then((ip) => {
				const setIpPayload: AuthSetIp = { ip }
				callClient(AuthEvents.SetIp, setIpPayload)
				const isRemember = localStorage.getItem('auth:isRemember') === 'true'
				const token = localStorage.getItem('auth:token')
				if (isRemember == null || token == null || !isRemember) {
					return
				}
				const checkPayload: AuthCheckRememberedPayload = { isRemember, token }
				callClient(AuthEvents.CheckRemembered, checkPayload)
			})
	}, [isOpen])

	useEffect(() => {
		if (tickTimeout.current != null) {
			clearTimeout(tickTimeout.current)
		}
		if (isOpen) {
			tickTimeout.current = setTimeout(() => setTick((prev) => !prev), 1000)
		}
	}, [tick, isOpen])

	useEffect(() => {
		dispatch(authActions.decrementTime())
	}, [dispatch, tick])

	return (
		<CSSTransition
			in={isOpen}
			timeout={0}
			mountOnEnter
			unmountOnExit
			classNames='Auth'
			nodeRef={nodeRef}
		>
			<div className='Auth' ref={nodeRef}>
				<div className='background'>
					<div className={`image ${page === PageId.Disclaimer && '-blur'}`} />
					<div className='frame' />
				</div>

				<PageDisclaimer />
				<PageSignIn />
				<PageSignUp />
				<PageRecoveryMail />
				<PageRecoveryCode />
				<PageRecoveryPassword />
				<PageQueue />

				<Logo />
				<BackButton />
			</div>
		</CSSTransition>
	)
}

export default Auth
