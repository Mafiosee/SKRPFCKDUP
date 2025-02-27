export enum UIKitInputSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export const UIKitInputSizeClass: Record<UIKitInputSize, string> = {
  [UIKitInputSize.Small]: 'size-small',
  [UIKitInputSize.Medium]: 'size-medium',
  [UIKitInputSize.Large]: 'size-large',
}
