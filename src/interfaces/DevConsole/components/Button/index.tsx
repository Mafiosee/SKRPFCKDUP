import './styles.sass'
import React from 'react'
import { ButtonIcons } from './types'

type ButtonProps = {
	icon: ButtonIcons
	isActive?: boolean
	onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ icon, isActive = false, onClick = () => {} }) => {
	return <div className={`_Button icon-${icon} ${isActive && 'active'}`} onClick={onClick} />
}

export default Button
