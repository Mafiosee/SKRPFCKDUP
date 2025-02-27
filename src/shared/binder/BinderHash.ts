import { SettingsId } from '../settings/SettingsId'

export enum BinderHash {
	//Default Skyrim Movements Binders
	Default_W = SettingsId.Binder_Default_W,
	Default_A = SettingsId.Binder_Default_A,
	Default_S = SettingsId.Binder_Default_S,
	Default_D = SettingsId.Binder_Default_D,
	Default_Jump = SettingsId.Binder_Default_Jump,
	Default_Sprint = SettingsId.Binder_Default_Sprint,
	Default_Ctrl = SettingsId.Binder_Default_Ctrl,
	Default_Step = SettingsId.Binder_Default_Step,
	Default_Combat_Mode = SettingsId.Binder_Default_Combat_Mode,
	Default_Attack_Right = SettingsId.Binder_Default_Attack_Right,
	Default_Target = SettingsId.Binder_Default_Target,
	Default_Attack_Left = SettingsId.Binder_Default_Attack_Left,

	//General Binders
	Inventory = SettingsId.Binder_Inventory,
	Skins = SettingsId.Binder_Skins,
	EscMenu = SettingsId.Binder_Default_EscMenu,
	AnimationMenu = SettingsId.Binder_Animation_Menu,
	AnimationRadial = SettingsId.Binder_Animation_Radial,
	StopAnimation = SettingsId.Binder_Stop_Animation,
	Nicknames = SettingsId.Binder_Nicknames,
	Cursor = SettingsId.Binder_Cursor,
	Hud = SettingsId.Binder_Hud,
	Chat = SettingsId.Binder_Chat,
	Voice = SettingsId.Binder_Voice,
	Colshape = SettingsId.Binder_Colshape,
	Accept = SettingsId.Binder_Accept,
	Cancel = SettingsId.Binder_Cancel,
	Radial = SettingsId.Binder_Radial,
	CharacterMenu = SettingsId.Binder_CharacterMenu,

	//Faction Settings
	FactionMenu = SettingsId.Binder_FactionMenu,

	//Administration Settings
	AdminPanel = SettingsId.Binder_AdminPanel,
}
