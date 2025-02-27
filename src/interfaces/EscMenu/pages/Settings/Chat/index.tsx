import "./styles.sass";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../hooks/redux";
import { callClient } from "../../../../../utils/api";
import {
  EscMenuEvents,
  RemoveMacrosPayload,
  SaveMacrosPayload,
} from "../../../../../shared/settings/events";
import { ChatMacros } from "../../../../../shared/settings/ChatMacros";

const Chat: React.FC = () => {
  const { chatMacros } = useAppSelector((state) => state.escMenu);
  const [activeMacrosId, setActiveMarcosId] = useState(null);
  const [activeMacros, setActiveMacros] = useState<ChatMacros | null>(null);
  const [isOpenCommands, setIsOpenCommands] = useState(false);

  useEffect(() => {
    if (!chatMacros.list.length) {
      setActiveMarcosId(null);
    } else if (
      activeMacrosId == null ||
      !chatMacros.list.some((macros) => macros.id === activeMacrosId)
    ) {
      setActiveMarcosId(chatMacros.list[0].id);
    }
  }, [activeMacrosId, chatMacros.list]);

  useEffect(() => {
    const macros = chatMacros.list.find(({ id }) => id === activeMacrosId);
    setActiveMacros(macros ?? null);
  }, [chatMacros, activeMacrosId]);

  const renderMacrosList = () =>
    chatMacros.list.map(({ id, name }) => {
      const isActive = activeMacrosId === id;
      const setActive = () => setActiveMarcosId(id);

      return (
        <div
          key={id}
          className={`macros ${isActive && "-active"}`}
          onClick={setActive}
        >
          {name}
        </div>
      );
    });

  const renderMacrosActions = () =>
    activeMacros == null
      ? null
      : [...activeMacros.actions].map(({ commandId, value }, idx) => {
          const command = chatMacros.commands.find(
            ({ id }) => id === commandId,
          );
          if (!command) {
            return null;
          }
          return (
            <div key={idx} className="action">
              <div className="row">
                <div className="title">
                  {idx + 1}. {command.name} {command.command}
                </div>
                <div className="buttons">
                  <div
                    className="button -up"
                    onClick={() =>
                      setActiveMacros((prev) => {
                        if (prev == null) {
                          return null;
                        }
                        if (idx === 0) {
                          return prev;
                        }
                        const actions = [
                          ...prev.actions.slice(0, idx - 1),
                          prev.actions[idx],
                          prev.actions[idx - 1],
                          ...prev.actions.slice(idx + 1, prev.actions.length),
                        ];
                        return { ...prev, actions };
                      })
                    }
                  />
                  <div
                    className="button -down"
                    onClick={() =>
                      setActiveMacros((prev) => {
                        if (prev == null) {
                          return null;
                        }
                        if (idx === prev.actions.length - 1) {
                          return prev;
                        }
                        const actions = [
                          ...prev.actions.slice(0, idx),
                          prev.actions[idx + 1],
                          prev.actions[idx],
                          ...prev.actions.slice(idx + 2, prev.actions.length),
                        ];
                        return { ...prev, actions };
                      })
                    }
                  />
                  <div
                    className="button -remove"
                    onClick={() =>
                      setActiveMacros((prev) => {
                        if (prev == null) {
                          return null;
                        }
                        const actions = prev.actions.filter(
                          (el, actionIdx) => actionIdx !== idx,
                        );
                        return { ...prev, actions };
                      })
                    }
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Введите текст"
                value={value}
                onChange={(event) =>
                  setActiveMacros((prev) => {
                    if (prev == null) {
                      return null;
                    }
                    const actions = prev.actions.map((action, actionIdx) => {
                      if (idx !== actionIdx) {
                        return action;
                      }
                      return { ...action, value: event.target.value };
                    });
                    return { ...prev, actions };
                  })
                }
              />
            </div>
          );
        });

  const renderCommands = () =>
    chatMacros.commands.map(({ id, name, command }) => (
      <div
        key={id}
        className="command"
        onClick={() => {
          setActiveMacros((prev) => {
            if (prev == null) {
              return null;
            }
            return {
              ...prev,
              actions: [...prev.actions, { commandId: id, value: "" }],
            };
          });
          setIsOpenCommands(false);
        }}
      >
        <div className="name">{name}</div>
        <div className="command">{command}</div>
      </div>
    ));

  return (
    <div className="_Chat">
      {chatMacros.list.length > 0 && (
        <>
          <div className="macrosList">
            <div
              className="add"
              onClick={() => callClient(EscMenuEvents.AddNewMacros)}
            >
              Новый макрос
            </div>
            <div className="list">{renderMacrosList()}</div>
          </div>
          {activeMacros != null && (
            <div className="body">
              <div className="title">Создание макроса</div>
              <div className="name">
                <div className="title">Название макроса</div>
                <div className="row">
                  <input
                    type="text"
                    placeholder="Введите название"
                    value={activeMacros.name}
                    onChange={(event) =>
                      setActiveMacros((prev) =>
                        prev == null
                          ? prev
                          : {
                              ...prev,
                              name: event.target.value,
                            },
                      )
                    }
                  />
                </div>
              </div>
              <div
                className="addAction"
                onClick={() => setIsOpenCommands(true)}
              >
                Добавить действие
              </div>
              <div className="actions">{renderMacrosActions()}</div>
            </div>
          )}
          <div className="actions">
            <div className="action">Импорт</div>
            <div className="action">Экспорт</div>
            <div
              className="action -remove"
              onClick={() => {
                const payload: RemoveMacrosPayload = {
                  macrosId: activeMacros?.id,
                };
                callClient(EscMenuEvents.RemoveMacros, payload);
              }}
            >
              Удалить
            </div>
            <div
              className="action -save"
              onClick={() => {
                if (activeMacros == null) {
                  return;
                }
                const payload: SaveMacrosPayload = { macros: activeMacros };
                callClient(EscMenuEvents.SaveMacros, payload);
              }}
            >
              Сохранить
            </div>
          </div>
        </>
      )}
      {!chatMacros.list.length && (
        <div className="empty">
          <div className="icon" />
          <div className="text">
            Макросы отсутствуют, хотите <span>создать первый?</span>
          </div>
          <div
            className="button"
            onClick={() => callClient(EscMenuEvents.AddNewMacros)}
          >
            Новый макрос
          </div>
        </div>
      )}
      {isOpenCommands && (
        <div className="commands">
          <div className="shadow" />
          <div className="window">
            <div className="title">Доступные действия</div>
            <div className="close" onClick={() => setIsOpenCommands(false)} />
            <div className="list">{renderCommands()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
