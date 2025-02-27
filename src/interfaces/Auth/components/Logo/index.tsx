import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { PageId } from '../../../../shared/Auth/pageId'

const Logo = () => {
	const { page } = useAppSelector(state => state.auth)

	return <div className={`_Logo ${page !== PageId.Disclaimer && '-show'}`} />
}

export default Logo
