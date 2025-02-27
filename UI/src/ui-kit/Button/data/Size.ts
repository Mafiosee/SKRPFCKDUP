export enum UIKitButtonSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export const UIKitButtonSizeClass: Record<UIKitButtonSize, string> = {
  [UIKitButtonSize.Small]: 'size-small',
  [UIKitButtonSize.Medium]: 'size-medium',
  [UIKitButtonSize.Large]: 'size-large',
}
