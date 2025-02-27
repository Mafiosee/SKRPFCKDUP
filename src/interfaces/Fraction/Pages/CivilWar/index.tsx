import './styles.sass'
import React, {useEffect, useRef, useState} from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {PageType} from "../../../../shared/Fraction/PageType";
import {ZonesPath} from "../../assets/zones";
import {CivilWarMemberColor, CivilWarMemberNames} from "../../../../shared/Fraction/CivilWar/Members";
import {ZoneId} from "../../../../shared/Fraction/CivilWar";
import {calcVh} from "../../../../utils/calcVh";
import {FractionEvents, FractionStartCapt} from "../../../../shared/Fraction/events";
import {callClient} from "../../../../utils/api";
import {CivilWarMemberIcons} from "../../assets/civilWarMembers";

type Capt = {
  zoneId: ZoneId | null
  position: { x: number, y: number }
  canCapture: boolean
  owner: string
  captureDatetime: string
}

const SpawnIconPositions: Record<ZoneId, { x: string, y: string }> = {
  [ZoneId.Haafingar_0]: { x: calcVh(136), y: calcVh(47) },
  [ZoneId.Reach_0]: { x: '50%', y: '50%' },
  [ZoneId.Reach_1]: { x: '50%', y: '50%' },
  [ZoneId.Reach_2]: { x: '50%', y: '50%' },
  [ZoneId.Reach_3]: { x: '50%', y: '50%' },
  [ZoneId.Reach_4]: { x: '50%', y: '50%' },
  [ZoneId.Reach_5]: { x: '50%', y: '50%' },
  [ZoneId.Hjaaalmarch_0]: { x: '50%', y: '50%' },
  [ZoneId.Hjaaalmarch_1]: { x: '50%', y: '50%' },
  [ZoneId.Hjaaalmarch_2]: { x: '50%', y: '50%' },
  [ZoneId.Hjaaalmarch_3]: { x: '50%', y: '50%' },
  [ZoneId.Hjaaalmarch_4]: { x: '50%', y: '50%' },
  [ZoneId.Hjaaalmarch_5]: { x: '50%', y: '50%' },
  [ZoneId.Pale_0]: { x: '50%', y: '50%' },
  [ZoneId.Pale_1]: { x: '50%', y: '50%' },
  [ZoneId.Pale_2]: { x: '50%', y: '50%' },
  [ZoneId.Pale_3]: { x: '50%', y: '50%' },
  [ZoneId.Pale_4]: { x: '50%', y: '50%' },
  [ZoneId.Pale_5]: { x: '50%', y: '50%' },
  [ZoneId.Winterhold_0]: { x: '50%', y: '50%' },
  [ZoneId.Winterhold_1]: { x: '50%', y: '50%' },
  [ZoneId.Winterhold_2]: { x: '50%', y: '50%' },
  [ZoneId.Winterhold_3]: { x: '50%', y: '50%' },
  [ZoneId.Winterhold_4]: { x: '50%', y: '50%' },
  [ZoneId.Winterhold_5]: { x: '50%', y: '50%' },
  [ZoneId.Whiterun_0]: { x: '50%', y: '50%' },
  [ZoneId.Whiterun_1]: { x: '50%', y: '50%' },
  [ZoneId.Whiterun_2]: { x: '50%', y: '50%' },
  [ZoneId.Whiterun_3]: { x: '50%', y: '50%' },
  [ZoneId.Whiterun_4]: { x: '50%', y: '50%' },
  [ZoneId.Whiterun_5]: { x: '50%', y: '50%' },
  [ZoneId.Falkreath_0]: { x: '50%', y: '50%' },
  [ZoneId.Falkreath_1]: { x: '50%', y: '50%' },
  [ZoneId.Falkreath_2]: { x: '50%', y: '50%' },
  [ZoneId.Falkreath_3]: { x: '50%', y: '50%' },
  [ZoneId.Falkreath_4]: { x: '50%', y: '50%' },
  [ZoneId.Falkreath_5]: { x: '50%', y: '50%' },
  [ZoneId.Eastmarch_0]: { x: calcVh(594), y: calcVh(258) },
  [ZoneId.Rift_0]: { x: '50%', y: '50%' },
  [ZoneId.Rift_1]: { x: '50%', y: '50%' },
  [ZoneId.Rift_2]: { x: '50%', y: '50%' },
  [ZoneId.Rift_3]: { x: '50%', y: '50%' },
  [ZoneId.Rift_4]: { x: '50%', y: '50%' },
  [ZoneId.Rift_5]: { x: '50%', y: '50%' },
}

const PageCivilWar = () => {

  const {pages} = useAppSelector(state => state.fraction)
  const info = pages.find(el => el.type === PageType.CivilWar)
  if (!info || info.type !== PageType.CivilWar) return null
  const {zones} = info
  const pageRef = useRef<HTMLDivElement>(null)
  const [capt, setCapt] = useState<Capt>({
    zoneId: null,
    position: {x: 0, y: 0},
    canCapture: false,
    owner: '',
    captureDatetime: '',
  })

  const getZones = () => zones.map(({id, owner, canCapture, isSpawn, captureDatetime}) => (
    <g>
      <path
        key={id}
        d={ZonesPath[id]}
        fill={CivilWarMemberColor[owner].background}
        stroke={CivilWarMemberColor[owner].border}
        onClick={(event) => {
          if (!pageRef.current || isSpawn) return
          event.stopPropagation()
          const pageRect = pageRef.current.getBoundingClientRect()
          const position = {
            x: event.pageX - pageRect.x,
            y: event.pageY - pageRect.y
          }
          setCapt({
            zoneId: id,
            position,
            canCapture,
            owner: CivilWarMemberNames[owner],
            captureDatetime,
          })
        }}
      >
      </path>
      {isSpawn && (
        <image
          width={calcVh(32)}
          height={calcVh(32)}
          x={SpawnIconPositions[id].x}
          y={SpawnIconPositions[id].y}
          href={CivilWarMemberIcons[owner]}
        />
      )}
    </g>
  ))

  return (
    <div className='_PageCivilWar' ref={pageRef} onClick={() => setCapt(prev => ({...prev, zoneId: null}))}>
      <div className="map">
        <div className="content">
          <svg width="100%" height="100%" viewBox="0 0 734 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            {getZones()}
          </svg>
        </div>
      </div>
      <div className={`capt ${capt.zoneId !== null && '-show'}`} style={{
        top: calcVh(capt.position.y),
        left: calcVh(capt.position.x),
      }}>
        <div className="title">{capt.owner}</div>
        <div className="datetime">
          <div className="title">Захвачено:</div>
          <div className="value">{capt.captureDatetime}</div>
        </div>
        <div className={`button ${!capt.canCapture && '-disabled'}`} onClick={() => {
          if (!capt.canCapture) return
          const payload: FractionStartCapt = {zoneId: capt.zoneId}
          callClient(FractionEvents.StartCapt, payload)
        }}>
          <div className="background -disabled"/>
          <div className="background -active"/>
          <div className="text">Начать захват</div>
        </div>
      </div>
    </div>
  );
};

export default PageCivilWar;