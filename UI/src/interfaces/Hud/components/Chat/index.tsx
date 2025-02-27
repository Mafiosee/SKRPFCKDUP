import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { importAllImagesFromFolder } from '../../../../utils/images'
import { HudEvents, SendMessageData } from '../../../../shared/Hud/events'
import { callClient } from '../../../../utils/api'
import { MessageType, senderColors } from '../../../../shared/Hud/types'
import { KeyCodes } from '../../../../utils/keyCodes'
import { hudActions } from '../../reducer'
import { ChatRaceIconUrls, ChatStatusIconUrls } from '../../assets/ChatIconUrls'
import { TimeoutRef } from '../../../../types/timeoutRef'

export const Chat: React.FC = () => {
  const dispatch = useAppDispatch()
  const { chat } = useAppSelector((state) => state.hud)
  const { messages, showMessages, show, showInput, commandButtons } = chat
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isOpacity, setIsOpacity] = useState(true)
  const opacityRefTimeout = useRef<TimeoutRef>(null)

  // Input block
  const [inputValue, setInputValue] = useState('')
  const [activeCommand, setActiveCommand] = useState<null | string>(null)
  const [currentInput, setCurrentInput] = useState<SendMessageData>({
    message: '',
  })

  const [messagesHistory, setMessagesHistory] = useState<SendMessageData[]>([])
  const [historyMessageId, setHistoryMessageId] = useState<number>(-1)

  /** Clear command by showInput */
  useEffect(() => {
    setActiveCommand(null)
  }, [showInput])

  // useEffect(() => {}, [inputValue]);

  /** Change input value */
  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault()
    setHistoryMessageId(-1)

    let messageValue = event.target.value

    commandButtons.map((cmd) => {
      const cmdStr = `/${cmd} `
      if (messageValue.includes(cmdStr)) {
        setActiveCommand(cmd)
        const cmdIndex = messageValue.indexOf(cmdStr)
        if (cmdIndex !== -1) {
          messageValue =
            messageValue.slice(0, cmdIndex) +
            messageValue.slice(cmdIndex + cmdStr.length)
        }
      }
    })

    setInputValue(messageValue)
    setCurrentInput((prev) => {
      return {
        ...prev,
        message: messageValue,
      }
    })
  }

  /** Focus input */
  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus()
    }
  }, [showInput])

  /** Scroll Messages to Bottom */
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
    if (opacityRefTimeout.current != null) {
      clearTimeout(opacityRefTimeout.current)
    }
    setIsOpacity(false)
    opacityRefTimeout.current = setTimeout(() => setIsOpacity(true), 20000)
  }, [messages, showInput])

  /** Check string */
  const containsWhitespace = (str: string) => {
    return /\S/.test(str)
  }

  /** Next Message */
  const nextHistoryMessage = () => {
    if (
      historyMessageId >= messagesHistory.length - 1 ||
      messagesHistory.length === 0
    ) {
      return
    }

    const newId = historyMessageId + 1
    setHistoryMessageId(newId)

    const nextMessage = messagesHistory[newId]
    setInputValue(nextMessage.message)
    setActiveCommand(nextMessage.command ?? null)
  }

  /** Prev Message */
  const prevHistoryMessage = () => {
    if (historyMessageId <= -1 || messagesHistory.length === 0) {
      return
    }

    const newId = historyMessageId - 1
    setHistoryMessageId(newId)

    const prevMessage = newId >= 0 ? messagesHistory[newId] : currentInput
    setInputValue(prevMessage.message)
    setActiveCommand(prevMessage.command ?? null)
  }

  /** Close Chat Input */
  const hideInput = () => {
    callClient(HudEvents.HideInput)
  }

  /** Send Message */
  const sendMessage = useCallback(() => {
    const checkStr = containsWhitespace(inputValue)
    if (!showInput && !checkStr) {
      callClient(HudEvents.HideInput)
      return
    }
    const resultStr = inputValue.trimStart().replace(/ +/g, ' ')
    if (resultStr.length <= 0) {
      callClient(HudEvents.HideInput)
      return
    }
    const payload: SendMessageData = {
      message: resultStr,
    }
    if (activeCommand !== null) {
      payload.command = activeCommand
    }

    setMessagesHistory((prev) => [payload, ...prev])
    setInputValue('')
    setCurrentInput({
      message: '',
    })
    callClient(HudEvents.SendMessage, payload)
    setTimeout(() => dispatch(hudActions.setShowInput(false)), 150)
  }, [inputValue, showInput, activeCommand, setInputValue, dispatch])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (!show) {
        return
      }
      switch (event.keyCode) {
        case KeyCodes.Enter: {
          if (!showInput) {
            return
          }
          sendMessage()
          break
        }
        case KeyCodes.Esc: {
          if (showInput) {
            hideInput()
          }
          break
        }

        case KeyCodes.Backspace: {
          if (inputValue.length <= 0 && activeCommand !== null) {
            setActiveCommand(null)
          }
          break
        }

        case KeyCodes.ArrowUp: {
          if (!showInput) {
            return
          }
          nextHistoryMessage()
          break
        }

        case KeyCodes.ArrowDown: {
          if (!showInput) {
            return
          }
          prevHistoryMessage()
          break
        }
      }
    },
    [show, sendMessage, showInput],
  )

  useEffect(() => {
    document.removeEventListener('keyup', handleKeyUp)
    if (show) {
      document.addEventListener('keyup', handleKeyUp)
    }
    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp, show])

  const onClickCommandButton = (name: string) => {
    setActiveCommand(name)
    inputRef.current?.focus()
    setCurrentInput((prev) => {
      return {
        ...prev,
        command: name,
      }
    })
  }

  const onClickActiveButton = () => {
    inputRef.current?.focus()
    setActiveCommand(null)
  }

  const onClickSendMessage = () => {
    inputRef.current?.focus()
    sendMessage()
  }

  const regex = /~{(\d+)}~/g
  const replacedText = (message: MessageType) =>
    message.text.replace(regex, (match, number) => {
      if (message.subtextParametr && message.subtextParametr[number]) {
        return `<span style='color: ${message.subtextParametr[number].color}'>${message.subtextParametr[number].text}</span>`
      } else {
        return match
      }
    })

  return (
    show && (
      <div className={`_Chat`}>
        <div className="content">
          {showInput && <div className="shadow" />}
          {showInput && <div className="shadow" />}
          {showInput && <div className="shadow" />}

          {showMessages && (
            <>
              <div
                className={`messages ${showInput && '-scroll'}`}
                style={{ opacity: isOpacity && !showInput ? 0.5 : 1 }}
                ref={messagesRef}
              >
                {messages.map((message, idx) => (
                  <div key={idx} className={`message`}>
                    <div
                      className="icon"
                      style={{
                        backgroundImage: !message?.senderInfo
                          ? ChatStatusIconUrls[message.senderStatus].background
                          : undefined,
                      }}
                    >
                      <div
                        className="content"
                        style={{
                          backgroundImage: message?.senderInfo
                            ? `url(${ChatRaceIconUrls[message.senderInfo.race][message.senderInfo.gender]})`
                            : `url(${ChatStatusIconUrls[message.senderStatus].content})`,
                        }}
                      />
                    </div>
                    <div
                      className="sender"
                      style={{
                        color: `${senderColors[message.senderStatus]}`,
                      }}
                    >
                      {message.senderName}:
                    </div>
                    <div
                      className="text"
                      dangerouslySetInnerHTML={{
                        __html: replacedText(message),
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {showInput && (
            <div className="input-message-container">
              <div className={`text-input`}>
                {activeCommand !== null && (
                  <div className={'command'}>
                    <div className="content" onClick={onClickActiveButton}>
                      {activeCommand}
                    </div>
                  </div>
                )}
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputValueChange}
                  placeholder={'Введите сообщение...'}
                  ref={inputRef}
                />
                {/*<textarea*/}
                {/*  className={`${isMultiline ? "multiline" : ""} ${activeCommand !== null && "-short"}`}*/}
                {/*  value={inputValue}*/}
                {/*  onChange={handleInputValueChange}*/}
                {/*  rows={1}*/}
                {/*  placeholder={"Введите сообщение..."}*/}
                {/*  ref={inputRef}*/}
                {/*></textarea>*/}
              </div>
              <div className="btn" onClick={onClickSendMessage} />
            </div>
          )}
          {showInput && (
            <div className={'command-buttons'}>
              <div className={`command-button`}>
                <div className="setting">
                  <div
                    className="icon"
                    onClick={() => inputRef.current?.focus()}
                  />
                </div>
              </div>
              {commandButtons.map((cmdBtn, idx) => (
                <div
                  key={idx}
                  className={'command-button'}
                  onClick={() => onClickCommandButton(cmdBtn)}
                >
                  <div className="content">/{cmdBtn}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  )
}
