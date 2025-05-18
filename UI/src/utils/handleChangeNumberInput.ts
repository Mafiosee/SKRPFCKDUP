type Props = {
  value: string
  setValue: (value: number | '') => void
  max?: number
}

export const handleChangeNumberInput = ({ value, setValue, max }: Props) => {
  if (!value.length) {
    return setValue('')
  }
  let intValue = parseInt(value.replace(/\D/g, ''))
  if (isNaN(intValue)) {
    return
  }
  if (max != null && intValue > max) {
    intValue = max
  }
  setValue(intValue)
}
