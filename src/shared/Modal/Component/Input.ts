import { ComponentBase } from './base'
import { ComponentType } from './type'

export enum InputMode {
	All,
	OnlyString,
	OnlyNumbers,
}

export type ComponentInput = ComponentBase & {
	type: ComponentType.Input;
	mode: InputMode,
	lengthLimit?: number,
	title: string;
	placeholder: string;
	isPassword?: boolean;
};
