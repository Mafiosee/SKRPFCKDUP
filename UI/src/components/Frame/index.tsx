import './styles.sass'
import React from 'react';
import {callClient} from "../../utils/api";

type Props = {
    imageUrl: string
    color: string
    title: string
    closeEvent?: string
    closeFunc?: () => void
}

const Frame: React.FC<Props> = ({imageUrl, color, title, closeEvent, closeFunc}) => {
    return (
        <div className='_C_Frame'>
            {title && <div className='title'>{title}</div>}
            {(closeEvent || closeFunc) && (
                <div className='close' onClick={() => {
                    if (!closeFunc && closeEvent !== undefined) {
                        return callClient(closeEvent)
                    }
                    if (closeFunc) {
                        closeFunc()
                    }
                }}/>
            )}
            <div className="row">
                <div className="corner -tl"/>
                <div className="body"/>
                <div className="corner -tr"/>
            </div>
            <div className="body"/>
            <div className="row">
                <div className="corner -bl"/>
                <div className="body"/>
                <div className="corner -br"/>
            </div>
            <div className="center">
                <svg width="100%" height="100%" viewBox="0 0 773 484" fill="none" xmlns="http://www.w3.org/2000/svg"
                     preserveAspectRatio='none'>
                    <mask id="mask0_554_19691" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M0 16C8.83655 16 16 8.83656 16 0H757C757 8.83656 764.163 16 773 16V468C764.163 468 757 475.163 757 484H16C16 475.163 8.83655 468 0 468V16Z"
                              fill="#111111"/>
                    </mask>
                    <g mask="url(#mask0_554_19691)">
                        <image x='0' y='0' width='100%' height='100%' href={imageUrl} preserveAspectRatio='none'/>
                    </g>

                    <mask id="path-1-inside-1_552_19604" fill="white">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M0 16C8.83656 16 16 8.83656 16 0H761C761 6.62742 766.373 12 773 12V468C764.163 468 757 475.163 757 484H16C16 475.163 8.83656 468 0 468V16Z"/>
                    </mask>
                    <path
                        d="M16 0V-1H15V0H16ZM0 16V15H-1V16H0ZM761 0H762V-1H761V0ZM773 12H774V11H773V12ZM773 468V469H774V468H773ZM757 484V485H758V484H757ZM16 484H15V485H16V484ZM0 468H-1V469H0V468ZM15 0C15 8.28427 8.28427 15 0 15V17C9.38884 17 17 9.38884 17 0H15ZM16 1H761V-1H16V1ZM760 0C760 7.1797 765.82 13 773 13V11C766.925 11 762 6.07513 762 0H760ZM772 12V468H774V12H772ZM773 467C763.611 467 756 474.611 756 484H758C758 475.716 764.716 469 773 469V467ZM757 483H16V485H757V483ZM17 484C17 474.611 9.38884 467 0 467V469C8.28427 469 15 475.716 15 484H17ZM1 468V16H-1V468H1Z"
                        fill="#2D2D2D" mask="url(#path-1-inside-1_552_19604)"/>
                </svg>
                <div className="back"/>
                <div className="color" style={{backgroundColor: color}}/>
            </div>
        </div>
    )
}

export default Frame