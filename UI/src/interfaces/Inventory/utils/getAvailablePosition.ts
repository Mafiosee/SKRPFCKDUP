import { Cords, ItemDto } from '../../../shared/inventory/itemType'
import { Size } from '../../../shared/inventory/inventoryType'

export const getAvailablePosition = (
  item: ItemDto,
  gridSize: Size,
  gridItems: ItemDto[],
): { position: Cords; isTurned: boolean } | undefined => {
  const variants: { size: Size; isTurned: boolean }[] = [
    { size: { ...item.size }, isTurned: false },
    {
      size: { width: item.size.height, height: item.size.width },
      isTurned: true,
    },
  ]

  const grid: boolean[][] = []
  for (let row = 0; row < gridSize.height; row++) {
    grid.push([])
    for (let col = 0; col < gridSize.width; col++) {
      grid[row].push(false)
    }
  }

  gridItems.forEach((item) => {
    const itemSize: Size = {
      width: item.isTurned ? item.size.height : item.size.width,
      height: item.isTurned ? item.size.width : item.size.height,
    }
    for (let y = item.position.y; y < item.position.y + itemSize.height; y++) {
      for (let x = item.position.x; x < item.position.x + itemSize.width; x++) {
        grid[y][x] = true
      }
    }
  })

  for (let row = 0; row < gridSize.height; row++) {
    for (let col = 0; col < gridSize.width; col++) {
      const isEmpty = !grid[row][col]
      if (!isEmpty) {
        continue
      }

      for (const variant of variants) {
        let positionAvailable = true
        for (let y = row; y < row + variant.size.height; y++) {
          if (y >= grid.length || !positionAvailable) {
            positionAvailable = false
            break
          }
          for (let x = col; x < col + variant.size.width; x++) {
            if (!positionAvailable) {
              break
            }
            if (x >= grid[y].length || grid[y][x]) {
              positionAvailable = false
            }
          }
        }

        if (!positionAvailable) {
          continue
        }

        return { position: { x: col, y: row }, isTurned: variant.isTurned }
      }
    }
  }
}
