import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import { AdminCommandInfo, AdminLvlInfo } from '../../../../shared/AdminPanel/type'
import { CopyToClipboard } from '../../../../utils/copyToClipboard'

type CommandsPropsType = {
	commands: AdminLvlInfo[]
}

export const Commands: React.FC<CommandsPropsType> = ({ commands }) => {
	const [activeCommands, setActiveCommands] = useState<number[]>([])
	const [backgroundChangingCommands, setBackgroundChangingCommands] = useState<number[]>([])

	useEffect(() => {
		if (backgroundChangingCommands.length > 0) {
			const timer = setTimeout(() => {
				setBackgroundChangingCommands([])
			}, 850)

			return () => clearTimeout(timer)
		}
	}, [backgroundChangingCommands])

	const onClickCommand = (id: number) => {
		const indexInArray = activeCommands.indexOf(id)

		if (indexInArray === -1) {
			setActiveCommands([...activeCommands, id])
		} else {
			setBackgroundChangingCommands([id])
			setActiveCommands(activeCommands.filter(command => command !== id))
		}
	}

	const getCommands = (commandsInfo: AdminCommandInfo[]) =>
		commandsInfo.map((command, idx) => (
			<div key={idx} className={'command-block'}>
				<div className='tag' onClick={() => CopyToClipboard(`/${command.command}`)}>
					/{command.command}
				</div>
				<div className='description'>- {command.description}</div>
			</div>
		))

	return (
		<div className={`_Commands`}>
			{commands &&
				commands.map((cmds, id) => (
					<div
						className={`command ${activeCommands.includes(id) ? '-active' : '-passive'} `}
						key={id}
					>
						<div className={`bg`}>
							<svg
								width='100%'
								height='100%'
								viewBox='0 0 881 300'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								preserveAspectRatio={'none'}
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M873 0H8C8 4.41828 4.41828 8 0 8V292C4.41828 292 8 295.582 8 300H873C873 295.582 876.582 292 881 292V8C876.582 8 873 4.41828 873 0Z'
									fill='url(#paint0_linear_1671_17990)'
								/>
								<g opacity='0.1'>
									<mask id='path-2-inside-1_1671_17990' fill='white'>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M869 4H12C12 8.41828 8.41828 12 4 12V288C8.41828 288 12 291.582 12 296H869C869 291.582 872.582 288 877 288V12C872.582 12 869 8.41828 869 4Z'
										/>
									</mask>
									<path
										d='M12 4V3H11V4H12ZM869 4H870V3H869V4ZM4 12V11H3V12H4ZM4 288H3V289H4V288ZM12 296H11V297H12V296ZM869 296V297H870V296H869ZM877 288V289H878V288H877ZM877 12H878V11H877V12ZM12 5H869V3H12V5ZM4 13C8.97056 13 13 8.97056 13 4H11C11 7.86599 7.86599 11 4 11V13ZM5 288V12H3V288H5ZM13 296C13 291.029 8.97056 287 4 287V289C7.86599 289 11 292.134 11 296H13ZM869 295H12V297H869V295ZM870 296C870 292.134 873.134 289 877 289V287C872.029 287 868 291.029 868 296H870ZM876 12V288H878V12H876ZM868 4C868 8.97056 872.029 13 877 13V11C873.134 11 870 7.86599 870 4H868Z'
										fill='white'
										mask='url(#path-2-inside-1_1671_17990)'
									/>
								</g>
								<defs>
									<linearGradient
										id='paint0_linear_1671_17990'
										x1='0'
										y1='0'
										x2='881'
										y2='64'
										gradientUnits='userSpaceOnUse'
									>
										<stop stopColor='#1F1F1F' />
										<stop offset='1' stopColor='#111111' />
									</linearGradient>
								</defs>
							</svg>
						</div>
						<div className='content'>
							<div className='main-info' onClick={() => onClickCommand(id)}>
								<div className='bg' />
								<div className='content'>
									<div className='name'>Админ {cmds.lvl} уровня</div>
									<div className={`icon `} />
								</div>
							</div>
							<div className={`other-info ${activeCommands.includes(id) && '-show'}`}>
								<div className={`line`} />
								<div className='commands'>{getCommands(cmds.commands)}</div>
							</div>
						</div>
					</div>
				))}
		</div>
	)
}
