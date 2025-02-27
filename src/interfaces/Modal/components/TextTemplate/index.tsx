import './styles.sass'
import React, { ReactElement, useMemo } from 'react'
import { calcVh } from '../../../../utils/calcVh'
import { ComponentTextTemplate } from '../../../../shared/Modal/Component/TextTemplate'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'

type Props = {
	component: ComponentTextTemplate
}

const TextTemplate: React.FC<Props> = ({ component }) => {

	const formattedText = useMemo(() => {
		const result: ReactElement[] = []

		const paramsInfo: Record<string, { openTagIndex: number, closeTagIndex: number }> = {}
		const paramsOrder: string[] = []
		Object.keys(component.params).forEach(paramName => {
			paramsInfo[paramName] = {
				openTagIndex: component.template.indexOf(`<${paramName}>`),
				closeTagIndex: component.template.indexOf(`</${paramName}>`),
			}
			if (!paramsOrder.length) {
				paramsOrder.push(paramName)
			} else if (paramsInfo[paramsOrder[paramsOrder.length - 1]].openTagIndex < paramsInfo[paramName].openTagIndex) {
				paramsOrder.push(paramName)
			} else {
				paramsOrder.unshift(paramName)
			}
		})

		let symbolIndex = 0
		let currentParam: string | null = null

		while (symbolIndex < component.template.length - paramsOrder.join('').length - paramsOrder.length * 5) {
			if (currentParam === null) {
				if (paramsOrder.length) {
					currentParam = paramsOrder.shift() ?? null
				}
				result.push(
					<span
						key={symbolIndex}>{component.template.slice(symbolIndex, currentParam == null ? component.template.length : paramsInfo[currentParam].openTagIndex)}</span>)
				if (currentParam) {
					symbolIndex = paramsInfo[currentParam].closeTagIndex + currentParam.length + 3
				} else {
					break
				}
			} else {
				let text = component.template.slice(paramsInfo[currentParam].openTagIndex + currentParam.length + 2, paramsInfo[currentParam].closeTagIndex)
				if (component.params[currentParam]?.numberSeparator != null) {
					const intText = parseInt(text)
					if (!isNaN(intText)) {
						text = numberWithSeparator(intText, component.params[currentParam].numberSeparator ?? '')
					}
				}
				result.push(
					<span
						key={currentParam}
						className={`${component.params[currentParam]?.isMoney && '-money'}`}
						style={{ color: component.params[currentParam]?.color }}>{text}</span>)
				symbolIndex = paramsInfo[currentParam].closeTagIndex + currentParam.length + 3
				currentParam = null
			}
		}

		console.log(result)

		return result
	}, [component.params, component.template])

	return (
		<div className={`_TextTemplate ${component?.isUpperCase && '-uppercase'}`}
				 style={{ marginBottom: calcVh(component.marginBottom) }}>
			{formattedText}
		</div>
	)
}

export default TextTemplate