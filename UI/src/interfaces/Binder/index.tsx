import React, { useCallback, useEffect, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { SettingsTabId } from '../../shared/settings/SettingsTabId'
import { SettingParameterType } from '../../shared/settings/SettingParameterType'
import { SettingParameter } from '../../shared/settings/SettingSectionId'
import { getDxCodeByKeyCode } from '../../utils/SkyrimKeyCodes'
import { KeyCodes } from '../../utils/keyCodes'
import { callClient } from '../../utils/api'
import { BinderHash } from '../../shared/binder'
import { SettingsId } from '../../shared/settings/SettingsId'

const Binder: React.FC = () => {
  const dispatch = useAppDispatch()
  const {
    escMenu,
    inventory,
    animations,
    radialMenu,
    characterMenu,
    fraction,
    adminPanel,
  } = useAppSelector((state) => state)
  const [activeModifier, setActiveModifier] = useState<KeyCodes | null>(null)

  useEffect(() => {
    const bindsRaw = [
      ...escMenu.settings[SettingsTabId.Sound].map((section) =>
        section.parameters.filter(
          (parameter) => parameter.type === SettingParameterType.Bind,
        ),
      ),
      ...escMenu.settings[SettingsTabId.Keyboard].map((section) =>
        section.parameters.filter(
          (parameter) => parameter.type === SettingParameterType.Bind,
        ),
      ),
      ...escMenu.settings[SettingsTabId.Graphics].map((section) =>
        section.parameters.filter(
          (parameter) => parameter.type === SettingParameterType.Bind,
        ),
      ),
      ...escMenu.settings[SettingsTabId.Account].map((section) =>
        section.parameters.filter(
          (parameter) => parameter.type === SettingParameterType.Bind,
        ),
      ),
      ...escMenu.settings[SettingsTabId.GameProcess].map((section) =>
        section.parameters.filter(
          (parameter) => parameter.type === SettingParameterType.Bind,
        ),
      ),
    ]
    const binds: SettingParameter[] = []
    bindsRaw.forEach((bindsRowArray) => binds.push(...bindsRowArray))

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        document.activeElement != null &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      ) {
        return
      }
      const keyCodes = [+getDxCodeByKeyCode(event.keyCode)]
      if (activeModifier != null) {
        keyCodes.unshift(+getDxCodeByKeyCode(activeModifier))
      }
      const bind = binds.find(
        (bind) => bind.data.current.codes.join(' ') === keyCodes.join(' '),
      )
      const openedStates: Record<string, boolean> = {
        [BinderHash.Inventory]: inventory.isOpen,
        [BinderHash.EscMenu]: escMenu.isOpen,
        [BinderHash.AnimationMenu]: animations.isOpen,
        [BinderHash.AnimationRadial]: radialMenu.isOpen,
        [BinderHash.Radial]: radialMenu.isOpen,
        [BinderHash.CharacterMenu]: characterMenu.isOpen,
        [BinderHash.FactionMenu]: fraction.isOpen,
        [BinderHash.AdminPanel]: adminPanel.isOpen,
        // Dev
        [BinderHash.Cursor]: true,
      }
      if (
        bind &&
        bind.data?.closeInterfaceEvent &&
        openedStates?.[bind.data?.id]
      ) {
        try {
          callClient(bind.data?.closeInterfaceEvent)
        } catch (e) {
          console.log(e)
        }
      }
    }

    document.removeEventListener('keydown', handleKeyDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    activeModifier,
    adminPanel.isOpen,
    animations.isOpen,
    characterMenu.isOpen,
    escMenu.isOpen,
    escMenu.settings,
    fraction.isOpen,
    inventory.isOpen,
    radialMenu.isOpen,
  ])

  useEffect(() => {
    const handleKeyCode = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case KeyCodes.LeftShift:
        case KeyCodes.LeftControl:
        case KeyCodes.LeftAlt: {
          setActiveModifier(event.keyCode)
          break
        }
      }
    }
    document.addEventListener('keydown', handleKeyCode)
    return () => {
      document.removeEventListener('keydown', handleKeyCode)
    }
  }, [])

  const keyUpHandler = useCallback((event: KeyboardEvent) => {
    const { keyCode } = event
    switch (keyCode) {
      case KeyCodes.LeftShift:
      case KeyCodes.LeftControl:
      case KeyCodes.LeftAlt: {
        setActiveModifier(null)
        break
      }
    }
  }, [])

  useEffect(() => {
    window.removeEventListener('keyup', keyUpHandler)
    window.addEventListener('keyup', keyUpHandler)
    return () => {
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [keyUpHandler])

  return <div className="Binder"></div>
}

export default Binder
