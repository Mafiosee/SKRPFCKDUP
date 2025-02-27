export enum UIKitButtonType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Warning = 'Warning',
}

export const UIKitButtonTypeClass: Record<UIKitButtonType, string> = {
  [UIKitButtonType.Primary]: 'type-primary',
  [UIKitButtonType.Secondary]: 'type-secondary',
  [UIKitButtonType.Warning]: 'type-warning',
}
