import React from 'react'
import './styles.sass'

type TicketRulesProps = {
    isShow: boolean
    close: () => void
    info: {
        title: string
        text: string[]
    }
}

export const TicketRules: React.FC<TicketRulesProps> = ({ isShow, close, info }) => {
    return <div className={`_ReportRules ${isShow && '-show'}`} onClick={close}>
        <div className="window">
            <div className="title" dangerouslySetInnerHTML={{__html: info.title}} />

            <div className="text">
                {
                    info.text && info.text.map((pointText, idx) => <div key={idx} className={'text'}>{idx + 1}. {pointText}</div>)
                }
            </div>

            <div className="block-name">
                <div className="name">Правила подачи тикета</div>
                <div className="cross" onClick={close} />
            </div>
        </div>
    </div>
}