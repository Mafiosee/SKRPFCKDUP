export enum UIKitSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export const UIKitSizeClass: Record<UIKitSize, string> = {
  [UIKitSize.Small]: 'size-small',
  [UIKitSize.Medium]: 'size-medium',
  [UIKitSize.Large]: 'size-large',
}
