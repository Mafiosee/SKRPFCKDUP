import './styles.sass'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { Tab } from '../../enums/Tabs'
import { numberWithSeparator } from '../../../../utils/numberWithSeparator'
import { ApiFunctions } from '../../api'
import { DonateStoreEvents } from '../../../../shared/DonateStore/events'
import { Service } from '../../../../shared/DonateStore/PageServices'

const PageServices: React.FC = () => {
  const {
    tab,
    servicesPage: { services },
  } = useAppSelector((state) => state.donateStore)
  const [activeServiceId, setActiveServiceId] = useState(null)
  const [input, setInput] = useState('')
  const isOpen = useMemo(() => tab === Tab.Services, [tab])
  const [activeService, setActiveService] = useState<Service | null>(null)

  useEffect(() => {
    if (activeServiceId === null) return
    setInput('')
    const service = services.find((el) => el.id === activeServiceId)
    setActiveService(service ?? null)
  }, [activeServiceId, services])

  const getServices = () =>
    services.map(({ id, name, price }) => {
      const isActive = id === activeServiceId
      const setActive = () => setActiveServiceId(id)

      return (
        <div
          key={id}
          className={`service ${isActive && '-active'}`}
          onClick={setActive}
        >
          <div className="name">{name}</div>
          <div className="price">{numberWithSeparator(price, '.')}</div>
        </div>
      )
    })

  return (
    <div
      className="_PageServices"
      style={{
        transform: `translateX(-${tab * 100}%)`,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div className="services">{getServices()}</div>
      <div
        className={`service ${activeService != null && activeServiceId != null && '-show'}`}
      >
        <div className="title">{activeService?.name}</div>
        <div className="content">
          <div className="title">{activeService?.title}:</div>
          <div className="description">{activeService?.description}</div>
          {activeService?.input ? (
            <div className="input">
              <div className="helper">{activeService.input.helper}:</div>
              <input
                type="text"
                placeholder={activeService.input.placeholder}
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </div>
          ) : null}
        </div>
        <div className="buttons">
          <div
            className={`button -buy ${activeService?.input && !input.length && '-disabled'}`}
            onClick={() => {
              if (activeService?.input && !input.length) return
              ApiFunctions[DonateStoreEvents.ServiceBuy]({
                serviceId: activeService?.id,
                input: activeService?.input ? input : undefined,
              })
              setActiveServiceId(null)
            }}
          >
            <div className="text">{activeService?.button}</div>
            <div className="price">
              {numberWithSeparator(activeService?.price ?? 0, '.')}
            </div>
          </div>
          <div className="button" onClick={() => setActiveServiceId(null)}>
            Отмена
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageServices
