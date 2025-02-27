import React, { useMemo, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../hooks/redux'
import UIKitScreenBackground from '../../ui-kit/ScreenBackground'
import UIKitWindowModal from '../../ui-kit/WindowModal'
import { useEscClose } from '../../hooks/useEscClose'
import { ArrestEvents, ArrestPayloads } from '../../shared/Arrest/events'
import { callClient } from '../../utils/api'
import { UIKitButtonType } from '../../ui-kit/Button/data/Type'
import { Icon } from '../../ui-kit/Icons'
import UIKitInput from '../../ui-kit/Input'
import { handleChangeNumberInput } from '../../utils/handleChangeNumberInput'
import { enumerate } from '../../utils/enumerate'
import UIKitModalInfo from '../../ui-kit/ModalInfo'
import UIKitModalSwitch from '../../ui-kit/ModalSwitch'
import { AvatarUrlByRaceAndGender } from './config/AvatarUrlByRaceAndGender'
import UIKitModalParameters from '../../ui-kit/ModalParameters'
import { RaceName } from '../../shared/Race/RaceName'
import { GenderNames } from '../SelectCharacter/components/Character'
import { calcVh } from '../../utils/calcVh'

const Arrest: React.FC = () => {
  const { isOpen, name, staticId, race, gender, maxDurationMinutes } =
    useAppSelector((state) => state.arrest)
  useEscClose({ isOpenInterface: isOpen, closeEvent: ArrestEvents.Close })
  const [durationMinutes, setDurationMinutes] = useState<'' | number>('')
  const [canOutOnBail, setCanOutOnBail] = useState(false)
  const [reason, setReason] = useState('')

  const disabledApplyButton = useMemo(() => {
    return (
      !+durationMinutes ||
      durationMinutes > maxDurationMinutes ||
      !reason.length
    )
  }, [durationMinutes, maxDurationMinutes, reason])

  return isOpen ? (
    <div className="Arrest">
      <UIKitScreenBackground />
      <UIKitWindowModal
        width={calcVh(435)}
        title="Произвести арест"
        handleClose={() => callClient(ArrestEvents.Close)}
        color="#344343"
        footerButtons={[
          {
            text: 'Арестовать',
            onClick: () => {
              const payload: ArrestPayloads[ArrestEvents.Apply] = {
                durationMinutes: +durationMinutes,
                canOutOnBail,
                reason,
              }
              callClient(ArrestEvents.Apply, payload)
            },
            disabled: disabledApplyButton,
            iconBefore: Icon.Arrest,
          },
          {
            type: UIKitButtonType.Secondary,
            text: 'Отмена',
            onClick: () => callClient(ArrestEvents.Close),
          },
        ]}
      >
        <div className="modal-content">
          <div className="block character">
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${AvatarUrlByRaceAndGender[race][gender]})`,
              }}
            />
            <div className="info">
              <div className="name">{name}</div>
              <UIKitModalParameters
                parameters={[
                  {
                    title: 'Static ID',
                    value: `#${staticId}`,
                  },
                  {
                    title: 'Раса',
                    value: RaceName[race],
                  },
                  {
                    title: 'Пол',
                    value: GenderNames[gender],
                  },
                ]}
              />
            </div>
          </div>
          <div className="block">
            <UIKitInput
              title="Срок заключения"
              placeholder="Например: 15"
              value={durationMinutes.toString()}
              onChange={(value) =>
                handleChangeNumberInput({
                  value,
                  setValue: setDurationMinutes,
                  max: maxDurationMinutes,
                })
              }
              helper={{
                text: enumerate(durationMinutes === '' ? 15 : durationMinutes, [
                  'Минута',
                  'Минуты',
                  'Минут',
                ]),
              }}
            />
            <UIKitModalInfo
              className="helper"
              text={`Максимальный срок: ${maxDurationMinutes} ${enumerate(
                maxDurationMinutes,
                ['Минута', 'Минуты', 'Минут'],
              )}.`}
            />
          </div>
          <div className="block">
            <UIKitModalSwitch
              title="Возможность выйти под залог"
              checked={canOutOnBail}
              setChecked={setCanOutOnBail}
            />
          </div>
          <div className="block">
            <UIKitInput
              title="Причина заключения"
              placeholder="Например: Указ 200"
              value={reason}
              onChange={setReason}
            />
          </div>
        </div>
      </UIKitWindowModal>
    </div>
  ) : null
}

export default Arrest
