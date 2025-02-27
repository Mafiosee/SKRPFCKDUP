export enum DevConsoleEvents {
	SetIsOpacity = 'devConsole::setIsOpacity',
	EnterCommand = 'devConsole::enterCommand',
}

type SetIsOpacityData = boolean // Включен ли прозрачный режим

type EnterCommandData = string // Текст комманды
