export enum UIKitTooltipAlign {
  Left = 'Left',
  Center = 'Center',
  Right = 'Right',
}

export const UIKitTooltipAlignClass: Record<UIKitTooltipAlign, string> = {
  [UIKitTooltipAlign.Left]: 'align-left',
  [UIKitTooltipAlign.Center]: 'align-center',
  [UIKitTooltipAlign.Right]: 'align-right',
}
