export enum UIKitTabsSize {
  Medium = 'Medium',
  Large = 'Large',
}

export const UIKitTabsSizeClass: Record<UIKitTabsSize, string> = {
  [UIKitTabsSize.Medium]: 'size-medium',
  [UIKitTabsSize.Large]: 'size-large',
}
